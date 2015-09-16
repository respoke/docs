---
title: "Authentication Guide - Respoke Java Library"
shortTitle: "Authentication"
date: 2015-04-20
template: article.jade
showInMenu: "true"
menuOrder: 20
meta:
    keywords: "respoke, auth, authenticating, authentication, security, token"
    description: "Learn how to secure your users' access to Respoke audio, video, text and data channels."
---

### Java Library
# Authentication

## Overview

Your users need an access token to connect to Respoke. The access token provides both authentication of who they are
and authorization of what they are allowed to do.

## Authentication Token Request to Respoke

Request a connection `tokenId` from Respoke.

    import com.digium.respoke.*;

    Respoke client = new Respoke(new HashMap<String, String>() {{
        put("appId", "c10a2075-3f3d-466f-82f9-d2285e64c5d4");
        put("appSecret", "eb327e57-e766-49de-b801-ef612a70509e");
        put("roleId", "371F82D1-E4CE-4BB0-B2BB-79EA3497FC4F");
        put("endpointId", "spock@enterprise.com");
    }});

    String tokenId = client.getTokenId();

Then return this `tokenId` to your client.
