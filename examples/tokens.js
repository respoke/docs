respoke.auth.endpoint({
    endpointId: 'user-billy',
    roleId: 'XXXX-XXX-XXXXX-XXXX',
    
}, function (err, authData) {
    if (err) { console.error(err); return; }
        
    console.log(authData.tokenId);
});
