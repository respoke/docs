var respoke = new Respoke();

respoke.auth.admin({
    username: username,
    password: password
}).then(function () {
    return respoke.apps.get();
}).then(function (app) {
    console.log('App retrieved: ', app);
}).catch(function (error) {
    console.log(error);
});
