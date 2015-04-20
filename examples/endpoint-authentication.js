// npm install respoke-admin

var Respoke = require("respoke-admin");

var respoke = new Respoke({
    appId: "c10a2075-3f3d-466f-82f9-d2285e64c5d4",
    "App-Secret": "eb327e57-e766-49de-b801-ef612a70509e"
});

respoke.auth.endpoint({
    endpointId: "spock@enterprise.com",
    roleId: "371F82D1-E4CE-4BB0-B2BB-79EA3497FC4F"
}, function (err, response) {
    res.json({
        token: response.tokenId
    });
});
