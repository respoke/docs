admin.auth.endpoint({
    endpointId: "billy",
    roleId: "XXXX-XXX-XXXXX-XXXX"
}, function (err, authData) {
    if (err) { console.error(err); return; }
        
    console.log(authData.tokenId);
    var billy = new Respoke({ appId: 'XXXX-XXXXX-XXXX-XXX' });
    
    billy.auth.sessionToken({ tokenId: authData.tokenId }, function (err, sessionData) {
        if (err) { console.error(err); return; }
            
        // Now we have a session token from `sessionData.token`.
        // However, for our purposes, there is no need to do anything with it because
        // the library caches it automatically at `billy.tokens['App-Token']`, and
        // uses it when it needs it.
        billy.auth.connect();
        
        // Respoke is an EventEmitter
        billy.on('connect', function () {
            console.log('connected to respoke!');
            billy.messages.send({
                endpointId: 'superWombat',
                message: 'Hi wombat'
            });
        });
        
    });
});
