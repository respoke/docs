respoke.auth.admin({
    username: 'foo',
    password: 'bar'
}, function (err, body) {
    if (err) { console.error(err); return; }
    
    console.log('Authenticated as an Admin with token:', respoke.tokens['Admin-Token']);
});
