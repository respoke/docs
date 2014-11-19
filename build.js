require('colors');
console.log('\n\nBegin building Respoke docs site'.yellow.bold);
var fs = require('fs');
var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var jade = require('jade');
var jadePath = __dirname + '/templates/';
var templates = {};
var makeSidebar = function () {
    return function sideTheBar(files, metalsmith, done) {

        console.log(' Building sidebar...'.grey);
        for (var f in files) {
            var file = files[f];
            if (f[0] === '.' || !file.title) {
                continue;
            }
            console.log('  ', f.bold.yellow);
            var sections = f.split('/');
            file.section = '';
            if (sections.length > 1) {
                sections.pop();
                file.section = sections.join('/');
            }
            console.log('     child of'.grey, file.section ? file.section.magenta : '(root)'.grey);
        }
        console.log('   Ok\n'.grey);

        done();
    };
};
var renderJadeMarkdown = function () {
    return function jadeTheMd(files, metalsmith, done) {
        console.log(' Rendering jade...'.grey);
        for (var f in files) {
            var file = files[f];
            if (!file.template) {
                continue;
            }
            console.log('   rendering'.grey, f.yellow, 'with'.grey, file.template.magenta);
            if (!templates[file.template]) {
                var templateContents = fs.readFileSync(jadePath + file.template, {encoding: 'utf8'});
                templates[file.template] = jade.compile(
                    templateContents,
                    {
                        pretty: true,
                        filename: jadePath + file.template
                    }
                );
            }
            file.contents = templates[file.template]({
                title: file.title,
                html: file.contents.toString(),
                files: files
            });
        }
        console.log('   Ok'.grey);
        done();
    };
};

Metalsmith(__dirname)
.use(markdown({
    smartypants: true,
    gfm: true,
    tables: true
}))
.use(makeSidebar())
.use(renderJadeMarkdown())
.build(function (err) {
    console.log('\n');
    if (err) {
        console.error(err.message.red);
        console.error(err.stack);
    } else {
        console.log('Done.'.green.bold);
    }
    console.log('\n');
});
