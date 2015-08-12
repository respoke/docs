---
title: "Group Joining - Respoke iOS SDK"
shortTitle: "Group Joining"
date: 2015-04-20
template: article.jade
showInMenu: "true"
menuOrder: 30
meta:
    keywords: "respoke, group, joining"
    description: "Learn how to do group joining using Respoke"
---

### iOS SDK
# Group Joining

## Overview

The group forms the foundation for conversations beyond 1:1 peers. To create a group you must be connected to Respoke either in [development mode](/client/ios/getting-started.html) or authenticated.

Once connectivity is established, we're ready to start writing some code.


## Joining Groups

First [connect to Respoke](/client/ios/getting-started.html) and listen for the `connect` event. Then you can join a group.
    
    #import "Respoke.h"
    #import "RespokeClient.h"
    #import "RespokeConnection.h"
    #import "RespokeEndpoint.h"
    #import "RespokeGroup.h"
    
    @interface AppViewController : NSObject <RespokeClientDelegate, RespokeEndpointDelegate, RespokeGroupDelegate>
        @property RespokeClient *client;
        @property RespokeGroup *group;
    @end
    
    @implementation AppViewController
        @synthesize client, group;
        
        // "connect" event fired after successful connection to Respoke
        - (void)onConnect: (RespokeClient*) client
        {
            NSLog(@"Connected to Respoke!");
        
            NSString *groupId = @"united-federation-of-planets";
        
            [client joinGroups:@[groupId] 
                    successHandler:^(NSArray *groups) {
            
                group = groups[0];
            
                group.delegate = self;

                [group getMembersWithSuccessHandler:^(NSArray *connections) {
                    NSLog(@"Group joined, fetching member list");

                    for (RespokeConnection *connection in connections)
                    {
                        RespokeEndpoint *endpoint = [connection getEndpoint];
                    }
                } errorHandler:^(NSString *errorMessage) {
                    errorHandler(errorMessage);
                }];
            } errorHandler:^(NSString *errorMessage) {
                errorHandler(errorMessage);
            }];
        
        }
    @end
    
Once successful, Respoke will return the `group` you joined. 

Additionally, you can leave a group as well.

    [group leaveWithSuccessHandler:^() {
        // Do something
    } errorHandler:^(NSString *errorMessage) {
        errorHandler(errorMessage);
    }];

You can listen for when people `join` this group. 

    - (void)onJoin:(RespokeConnection*)connection sender:(RespokeGroup*) group
    {
        RespokeEndpoint *endpoint = [connection getEndpoint];
    }

Additionally, you can listen for when people leave this group.

    - (void)onLeave:(RespokeConnection*)connection sender:(RespokeGroup*) group
    {
        RespokeEndpoint *endpoint = [connection getEndpoint];
    }