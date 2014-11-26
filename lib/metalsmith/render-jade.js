'use strict';

var _ = require('lodash');
var jade = require('jade');
var path = require('path');
var respokeStyle = require('respoke-style');

module.exports = function renderJade(paths, dist) {
    var templateCache = {};
    var renderSharedTemplate = function renderSharedTemplate(name) {
        var templatePath = path.join(respokeStyle.paths.templates, name + '.jade');

        return jade.renderFile(
            templatePath,
            {
                pretty: !dist,
                filename: templatePath
            }
        );
    };

    return function (files, metalsmith, done) {
        _.forEach(files, function (file) {
            if (!file.data || !file.data.template) {
                return;
            }
            var content = '';
            var templateFile = path.join(paths.templates, file.data.template);

            var locals = _.merge({
                renderSharedTemplate: renderSharedTemplate,
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
