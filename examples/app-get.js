var respoke = new Respoke({
    'App-Secret': appSecret
});

respoke.apps.get({
    appId: appId
}).then(function (app) {
    console.log('App retrieved: ', app.id);
}).catch(function (error) {
    console.log(error);
});

/*
App retrieved: 511b443f-3890-4a89-8740-de42f85765ef
*/
