'use strict';

var _ = require('lodash');
var fs = require('fs');
var jade = require('jade');

var InsertExamples = function InsertExamples(paths, dist) {
    function getExampleFiles() {
        var exampleFileNames = fs.readdirSync(paths.examples);
        var exampleFiles = {};

        exampleFileNames.forEach(function eachExampleFile(exampleFileName, index) {
            var name = exampleFileName.slice(0, exampleFileName.lastIndexOf('.'));
            var extension = exampleFileName.slice(exampleFileName.lastIndexOf('.') + 1);

            if (!exampleFiles[name]) {
                exampleFiles[name] = {};
            }

            exampleFiles[name][extension] = fs.readFileSync(
                [paths.examples, exampleFileName].join('/')
            ).toString();
        });

        return _.mapValues(exampleFiles, function complileExampleTemplates(types, name) {
            var templateFile = [paths.templates, 'code-example.jade'].join('/');
            var template = jade.compileFile(templateFile, {
                pretty: !dist,
                filename: templateFile
            });

            return template({
                name: name,
                types: types
            });
        });
    }

    return function exampleInserter(files, metalsmith, done) {
        var examples = getExampleFiles(paths.examples);

        _.forEach(files, function (file, index) {
            var content = file.contents.toString();
            var exampleMatcher = new RegExp(/\{\s*example:\s*(?=\w)(.*?)\s*\}/gm);

            content = content.replace(exampleMatcher, function replaceExamples(match, name) {
                return examples[name];
            });

            file.contents = new Buffer(content);
        });
        done();
    };
};

module.exports = InsertExamples;
