'use strict';

var _ = require('lodash');
var fs = require('fs');
var jade = require('jade');

var typeTitles = {
    js: 'Node.js',
    sh: 'Curl',
    rb: 'Ruby',
    cs: 'C#',
    php: 'PHP',
    py: 'Python'
};

var InsertExamples = function InsertExamples(paths, dist) {
    function getExampleFiles() {
        var exampleFileNames = fs.readdirSync(paths.examples);
        var exampleFiles = {};

        exampleFileNames.forEach(function eachExampleFile(exampleFileName, index) {
            var name = exampleFileName.slice(0, exampleFileName.lastIndexOf('.'));
            var extension = exampleFileName.slice(exampleFileName.lastIndexOf('.') + 1);
            var title = typeTitles[extension];

            if (!exampleFiles[name]) {
                exampleFiles[name] = [];
            }

            var code = fs.readFileSync(
                [paths.examples, exampleFileName].join('/')
            ).toString();

            exampleFiles[name].push({
                code: code,
                extension: extension,
                title: title
            });
        });

        return _.mapValues(exampleFiles, function complileExampleTemplates(examples, name) {
            var templateFile = [paths.templates, 'code-example.jade'].join('/');
            var template = jade.compileFile(templateFile, {
                pretty: !dist,
                filename: templateFile
            });

            examples.sort(function sortExamples(a, b) {
                var aName = typeTitles[a.extension];
                var bName = typeTitles[b.extension];

                if (aName > bName) {
                    return 1;
                }
                if (aName < bName) {
                    return -1;
                }

                return 0;
            });

            return template({
                name: name,
                examples: examples,
                typeTitles: typeTitles
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
