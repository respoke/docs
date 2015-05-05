---
title: "Authentication Guide - Respoke Android SDK"
shortTitle: "Authentication"
date: 2015-04-20
template: article.jade
showInMenu: "true"
menuOrder: 20
meta:
    keywords: "respoke, auth, authenticating, authentication, security, token"
    description: "Learn how to secure your users' access to Respoke audio, video, text and data channels."
---

###Android SDK
# Authentication

## Overview

Your users need an access token to connect to Respoke. The access token provides both authentication of who they are and authorization of what they are allowed to do. 

Development mode makes getting started easy, but is inherently insecure. In production, you need a server to verify users and request a token on their behalf and connect to Respoke using this token. This gives you fine-grained control over users and permissions.

When you request a token, you need to provide:

- `endpointId`: Usually your user's username
- `appId`: The App ID for your App
- `appSecret`: The App Secret for your App
- `roleId`: A set of permissions you create in the Respoke Dashboard for your App
- `ttl`: The number of seconds the token is valid

The first step in this process is disabling Development Mode for your App.

## Creating App Roles

Next, you need to create a Role to specify what Respoke operations the `endpointId` can do.

1. Go to your App in the [Respoke Dashboard](https://portal.respoke.io/#/apps/).

2. Selet your App.

3. Validate development mode is disabled.

4. Create new role, give the role a name and choose it's permissions.

5. Take note of your appId, appSecret and new roleId.

Respoke and your App are now set up for authentication. It's time to write some code.

## Authenticating With Respoke

First, request a `token` from your server.

    import com.digium.respokesdk.Respoke;
    import com.digium.respokesdk.RespokeCall;
    import com.digium.respokesdk.RespokeClient;
    import com.digium.respokesdk.RespokeDirectConnection;
    import com.digium.respokesdk.RespokeEndpoint;
    import com.digium.respokesdk.RespokeGroup;

    public class Main implements RespokeClient.Listener, RespokeGroup.Listener, RespokeEndpoint.Listener {
        public RespokeClient client;

        public Main() {
            // Create an instance of the Respoke client
            client = Respoke.sharedInstance().createClient(this);
            client.setListener(this);        

            // Make AJAX request to server
            JSONObject json = new JSONObject();
            json.put("endpointId", "spock@enterprise.com");
            
            HttpPost request = new HttpPost("http://yoururl");
            StringEntity params = new StringEntity(json.toString());
            request.addHeader("content-type", "application/json");
            request.setEntity(params);
            HttpResponse response = httpClient.execute(request);
            
            String token = response.token;

            // Execute some signin event, then connect to Respoke with
            client.connect(token, null, this.getApplicationContext(), new RespokeClient.ConnectCompletionListener() {
                @Override
                public void onError(String errorMessage) {
                    Log.d("MainActivity", errorMessage);
                }
            });   
        }

        // RespokeClientListener methods
        // "connect" event fired after successful connection to Respoke
        public void onConnect(RespokeClient client) {
            Log.d("MainActivity", "Connected to Respoke!");
        }
    }
    

Then your server will request this `token` from Respoke. 

{example: endpoint-authentication}

Use this `token` to connect your client to Respoke.

Additionally, you'll need to listen to the `disconnect` event. Then request a new `token` from your server and use this new `token` to re-connect your client to Respoke.

    public void onDisconnect(RespokeClient client) {
        // Reconnect to Respoke
    }

