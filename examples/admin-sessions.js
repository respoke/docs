var respoke = new Respoke();

respoke.auth.admin({
    username: username,
    password: password
}).then(function (body) {
    console.log(
        'Authenticated as an Admin with token: ',
        respoke.tokens['Admin-Token']
    );
}).catch(function (error) {
    console.log(error);
});
