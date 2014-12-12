var respoke = new Respoke({
    'App-Secret': appSecret
});

respoke.roles.create({
    appId: appId,
    name: newRoleName
}).then(function (role) {
    console.log('New role created with id: ', role.id);
}).catch(function (error) {
    console.log(error);
});

// New role created with id:  CDF6AC3D-9109-4240-853A-CAA68F05FEDE
