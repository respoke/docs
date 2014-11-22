'use strict';

var _ = require('lodash');
var jade = require('jade');

module.exports = function renderJade(jadePath, dist) {
    var templateCache = {};

    return function (files, metalsmith, done) {
        _.forEach(files, function (file) {
            if (!file.data || !file.data.template) {
                return;
            }
            var content = '';
            var templateFile = jadePath + file.data.template;

            var locals = _.merge({
                files: files,
                content: file.contents.toString()
            }, file.data);

            if (!templateCache[file.data.template]) {
                templateCache[file.data.template] = jade.compileFile(templateFile, {
                    pretty: !dist,
                    filename: templateFile
                });
            }

            try {
                content = templateCache[file.data.template](locals);
            } catch (e) {
                console.log(e);
            }

            file.contents = new Buffer(content);
        });
        done();
    };
};
