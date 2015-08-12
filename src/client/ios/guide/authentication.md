---
title: "Authentication Guide - Respoke iOS SDK"
shortTitle: "Authentication"
date: 2015-04-20
template: article.jade
showInMenu: "true"
menuOrder: 20
meta:
    keywords: "respoke, auth, authenticating, authentication, security, token"
    description: "Learn how to secure your users' access to Respoke audio, video, text and data channels."
---

### iOS SDK
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
    
    #import "Respoke.h"
    #import "RespokeClient.h"
    
    @interface AppViewController : NSObject <RespokeClientDelegate>
        @property RespokeClient *client;
    @end
    
    @implementation AppViewController
        @synthesize client;
        
        - (instancetype)init
        {
            if (self = [super init])
            {
                // Create an instance of the Respoke client
                client = [[Respoke sharedInstance] createClient];
            }

            return self;
        }
        
        - (void)connect
        {
            NSURL *url = [NSURL URLWithString:@"your/server/api/tokens"];
    
            NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL: url];
            request.HTTPMethod = @"POST";
            request.HTTPBody = [@"endpointId=spock@enterprise.com" dataUsingEncoding: NSASCIIStringEncoding];
    
            [NSURLConnection sendAsynchronousRequest:request
                             queue:[NSOperationQueue mainQueue]
                             completionHandler:^(NSURLResponse *response, NSData *data, NSError *error) {
                             
                NSString *token = [response token];
        
                [client connectWithTokenID:token initialPresence:nil errorHandler:^(NSString *errorMessage) {
                    [self showError:errorMessage];
                }];
            }];
        }
        
        // "connect" event fired after successful connection to Respoke
        - (void)onConnect:(RespokeClient*) client
        {
            NSLog(@"Connected to Respoke!");
        }
    @end
    
Then your server will request this `token` from Respoke.

{example: endpoint-authentication}

Use this `token` to connect your client to Respoke.

Additionally, you'll need to listen to the `disconnect` event. Then request a new `token` from your server and use this new `token` to re-connect your client to Respoke.

    - (void)onDisconnect:(RespokeClient*)client
    {
        // Request new token
        [self connect];
    }

