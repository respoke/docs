var respoke = new Respoke({
    baseURL: baseURL,
    'App-Secret': appSecret
});

var billy = new Respoke({
    baseURL: baseURL,
    appId: appId
});

respoke.auth.endpoint({
    endpointId: endpointId,
    appId: appId,
    roleId: roleId
}).then(function (authData) {
    // The tokenId used to request our newly generated token. Note that this
    // token is only valid for 20 seconds and should be used immediately.
    
    // At this point, you could return this { tokenId: 'XXXX-XXXX-XXXX-XXXXXXX' }
    // to your Respoke.js user so they can establish a web socket connection to Respoke
    // using `respoke.createClient({ token: authData.tokenId });``
    //
    //      res.end(JSON.stringify(authData));
    //
    // However for this example, we will instead use the Node library to establish a
    // web socket to Respoke:
    
    return billy.auth.sessionToken({
        tokenId: authData.tokenId
    });
}).then(function (sessionData) {
    console.log('Retrieved session token: ', sessionData.token);
    billy.auth.connect({
        'App-Token': sessionData.token
    });
    billy.on('connect', function () {
        console.log('I am ready to do Respoke things as a normal endpoint.');
    });
}).catch(function (error) {
    console.log(error);
});

// Retrieved session token: FB311719-D2F0-48D4-9A51-69CCE09F1C01
