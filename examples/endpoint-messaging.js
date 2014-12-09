var respoke = new Respoke({
    appId: appId,
    'App-Secret': appSecret
});

respoke.auth.connect({
    endpointId: endpointId
});

respoke.on('connect', function () {
    respoke.messages.send({
        endpointId: 'destination-endpoint-id',
        message: 'Hello world!'
    });
});
