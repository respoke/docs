var respoke = new Respoke({
    appId: appId,
    'App-Secret': appSecret
});

respoke.auth.connect({
    endpointId: endpointId
});

respoke.on('connect', function () {
    respoke.messages.send({
        endpointId: endpointId,
        to: 'destination-endpoint-id',
        message: 'Hello world!'
    }).then(function (response) {
        console.log(response);
        respoke.close();
    }).catch(function (error) {
        console.log(error);
    });
});

/*
{
    message: "success"
}
*/
