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
    return billy.auth.sessionToken({
        tokenId: authData.tokenId
    });
}).then(function (sessionData) {
    console.log('Retrieved session token: ', sessionData.token);
}).catch(function (error) {
    console.log(error);
});
