var respoke = new Respoke({
    appId: '34A9DDB9-D4AO-52AA-0ADE-EABEA521F2BA',
    'App-Secret': '28B061B9-A0D4-4E52-A0ED-EB6EA125F82A'
});

respoke.auth.endpoint({
    endpointId: 'bobsmith', // E.g. Pass this username when the user signs into your app
    roleId: '96070A0D-32B1-4B8C-9353-FE3E6A5E6C1D'
}, function (err, response) {
    res.json({
        tokenId: response.tokenId // FB311719-D2F0-48D4-9A51-69CCE09F1C01
    });
});
