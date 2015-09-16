---
title: "Authentication Guide - Respoke Node.js Library"
shortTitle: "Authentication"
date: 2015-04-20
template: article.jade
showInMenu: "true"
menuOrder: 20
meta:
    keywords: "respoke, auth, authenticating, authentication, security, token"
    description: "Learn how to secure your users' access to Respoke audio, video, text and data channels."
---

### Node.js Library
# Authentication

## Overview

Your users need an access token to connect to Respoke. The access token provides both authentication of who they are and
authorization of what they are allowed to do.

## Authentication Token Request to Respoke

Request a connection `token` from Respoke.

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

Then return this `token` to your client.



