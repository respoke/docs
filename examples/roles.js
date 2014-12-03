respoke.roles.create({
    appId: 'XXXX-XXX-XXXXX-XXXX',
    name: 'buns'
}, {}, function (err, role) {
    if (err) { console.error(err); return; }
    
    console.log("New role created with id:", role.id);
}
