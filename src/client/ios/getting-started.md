---
title: "Getting Started - Developing with iOS and Respoke"
shortTitle: "Getting Started"
date: 2014-10-15
template: article.jade
showInMenu: "true"
menuOrder: 0
meta:
    keywords: "respoke, iOS, webrtc"
    description: "Guide on how to get started developing with iOS and Respoke."
---

###iOS SDK
# Getting Started

## Create an account

First [signup for a free Respoke account](https://portal.respoke.io/#/signup). Within the Respoke Dashboard you can create, manage and delete Respoke Apps. Clicking on a specific App lets you view your App ID, App Secret, whether you have Dev Mode enabled and App Roles (if any).

## Setup Xcode IDE

### Create an iOS Workspace

Open Xcode and create a new workspace. Now create a new project, select a single view application, supply the project options, and add the project to the workspace.

![configure new project](../../images/ios-sdk/single-view-application.png)

### Add the Respoke iOS SDK

To use the Respoke iOS SDK, you have two options.

First, clone the source from GitHub and manually add the sdk to your project.
    
    git clone https://github.com/respoke/respoke-ios-sdk
    
Alternatively, install the respoke-ios-sdk pod via CocoaPods.
 
    pod install respoke-ios-sdk

## Connect to Respoke

Finally, to validate everything is working, you'll want to connect to Respoke:

    #import "Respoke.h"
    #import "RespokeCall.h"
    #import "RespokeClient.h"
    #import "RespokeConnection.h"
    #import "RespokeDirectConnection.h"
    #import "RespokeEndpoint.h"
    #import "RespokeGroup.h"
    
    RespokeClient *client;
    
    int main(int argc, const char * argv[])
    {
        @autoreleasepool {
        
            // Create an instance of the Respoke client
            client = [[Respoke sharedInstance] createClient];
            
            // App ID from the Respoke Dashboard for your App
            NSString *appId = @"c10a2075-3f3d-466f-82f9-d2285e64c5d4";
    
            // The unique username identifying the user
            NSString *endpointId = @"spock@enterprise.com";
    
            // Execute some signin event, then connect to Respoke with
            [client connectWithEndpointID:sendpointId appID:appId 
                                 reconnect:YES initialPresence:nil 
                                 errorHandler:^(NSString *errorMessage) {
                [self showError:errorMessage];
            }];
        }
    
        return 0;
    }
    
    // "connect" event fired after successful connection to Respoke
    - (void) onConnect: (RespokeClient*) client
    {
        NSLog(@"Connected to Respoke!");
    }

That's it! Now we're ready to start using all Respoke has to offer.


