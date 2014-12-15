var respoke = new Respoke({
    appId: appId,
    'App-Secret': appSecret
});

respoke.auth.connect({
    endpointId: endpointId
});

respoke.on('connect', function () {
    respoke.groups.publish({
        groupId: groupId,
        message: 'Hello world group!'
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
