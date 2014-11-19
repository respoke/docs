var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');

Metalsmith(__dirname)
.use(markdown({
    smartypants: true,
    gfm: true,
    tables: true
}))
.build(function (err) {
    if (err) {
        console.error(err.message);
        console.error(err.stack);
    } else {
        console.log('Success');
    }
});
