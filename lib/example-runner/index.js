'use strict';

var _ = require('lodash');
var async = require('async');
var del = require('del');
var path = require('path');
var exec = require('child_process').execFile;
var fs = require('fs');

function ExampleRunner(paths) {
    var tempOutputPath = path.join(paths.root, '.examples');
    var config = require(path.join(paths.root, 'examples-config.json'));
    var exampleTypes = [
        'sh',
        'js'
    ];

    function compileTemplates() {
        var exampleTemplatesPath = path.join(paths.root, 'example-templates');
        var compiledTemplates = {};

        exampleTypes.forEach(function compileTemplatesEachType(type) {
            var filePath = path.join(exampleTemplatesPath, 'template.' + type);
            var content = '';
            var fileExists = fs.existsSync(filePath);

            if (fileExists) {
                content = fs.readFileSync(filePath);
            }

            if (!_.isEmpty(content)) {
                compiledTemplates[type] = _.template(content);
            }
        });

        return compiledTemplates;
    }

    function buildExamples(next) {
        var exampleFiles = fs.readdirSync(paths.examples);
        var templates = compileTemplates();

        if (!fs.existsSync(tempOutputPath)) {
            fs.mkdirSync(tempOutputPath);
        }

        async.each(exampleFiles, function writeExampleFiles(filename, callback) {
            var extension = path.extname(filename).slice(1);
            var filePath = path.join(paths.examples, filename);

            fs.readFile(filePath, function readExampleContent(error, exampleCode) {
                if (error) {
                    callback(error);
                    return;
                }

                var content = templates[extension]({
                    config: config,
                    code: exampleCode
                });
                fs.writeFile(path.join(tempOutputPath, filename), content, callback);
            });
        }, function examplesBuilt(error) {
            next(error);
        });
    }

    function cleanupTemp(results, next) {
        del(tempOutputPath, function (error) {
            next(error, results);
        });
    }

    function runExamples(next) {
        var files = fs.readdirSync(tempOutputPath);
        var commands = {
            sh: 'sh',
            js: 'node'
        };
        var runners;

        runners = files.map(function eachFile(file) {
            var filePath = path.join(tempOutputPath, file);
            var extension = path.extname(file).slice(1);
            var command = commands[extension];
            var runner;

            runner = function runner(runnerCallback) {
                exec(command, [filePath], function commandComplete(error, stdout, stderr) {
                    runnerCallback(error, [stdout, stderr]);
                });
            };

            return runner;
        });

        async.parallel(runners, function runnersFinished(error, results) {
            next(error, results);
        });
    }

    return {
        run: function run(callback) {
            async.series([
                buildExamples,
                runExamples,
                cleanupTemp
            ], function runComplete(error, results) {
                callback(error, results);
            });
        }
    };
}

module.exports = ExampleRunner;
