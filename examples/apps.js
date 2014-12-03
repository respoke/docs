respoke.apps.get({
    appId: 'XXXX-XXX-XXXXXXX-XXX'
}, function (err, app) {
    if (err) { console.error(err); return; }
    
    console.log("App retrieved:", app);
});
