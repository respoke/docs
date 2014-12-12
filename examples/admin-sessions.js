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

/*
Authenticated as an Admin with token: 22153294-EB54-48FD-9007-6791126155BB
*/
