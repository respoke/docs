---
title: "Presence - Respoke iOS SDK"
shortTitle: "Presence"
date: 2015-04-20
template: article.jade
showInMenu: "true"
menuOrder: 40
meta:
    keywords: "respoke, endpoint, presence"
    description: "Learn how to listen for endpoint presence using Respoke"
---

###iOS SDK
# Presence

## Overview

In realtime applications it is often useful to detect when clients connect and disconnect. For example, we may want to mark a user as away when their client becomes inactive or mark the user as do not disturb when the user is busy.

Respoke provides a simple interface for setting a user's presence. First, [join a group](/client/ios/guide/group-discovery.html) and then we're ready to start writing some code.

## Listen for Presence

Listen for presence on each endpoint in the group.
    
    #import "Respoke.h"
    #import "RespokeCall.h"
    #import "RespokeClient.h"
    #import "RespokeConnection.h"
    #import "RespokeDirectConnection.h"
    #import "RespokeEndpoint.h"
    #import "RespokeGroup.h"
    
    @interface AppViewController : NSObject <RespokeClientDelegate, RespokeEndpointDelegate, RespokeGroupDelegate, RespokeDirectConnectionDelegate, RespokeCallDelegate>
        @property RespokeClient *client;
    @end
    
    @implementation AppViewController
        @synthesize client;
        
        // "connect" event fired after successful connection to Respoke
        - (void) onConnect: (RespokeClient*) client
        {
            NSLog(@"Connected to Respoke!");
        
            NSString *groupId = @"united-federation-of-planets";
        
            [client joinGroups:@[groupId] 
                    successHandler:^(NSArray *groups) {
            
                RespokeGroup *group = groups[0];
            
                group.delegate = self;

                [group getMembersWithSuccessHandler:^(NSArray *connections) {
                    NSLog(@"Group joined, fetching member list");

                    for (RespokeConnection *connection in connections)
                    {
                        RespokeEndpoint *endpoint = [connection getEndpoint];
                        
                        [endpoint registerPresenceWithSuccessHandler:^() {
                            // Do something
                        } errorHandler:^(NSString *errorMessage) {
                            errorHandler(errorMessage);
                        }];
                    }
                } errorHandler:^(NSString *errorMessage) {
                    errorHandler(errorMessage);
                }];
            } errorHandler:^(NSString *errorMessage) {
                errorHandler(errorMessage);
            }];
        }
    @end
    
Additionally, you will want to listen for presence changes by implementing the onPresence method on the RespokeEndpoiintDelegate.

    - (void)onPresence:(NSObject*)presence sender:(RespokeEndpoint*)endpoint
    {
        NSLog(@"endpoingId: %i", [endpoint getEndpointID]);
        NSLog(@"presence: %i", presence);
    }

## Managing Presence

Group members will want to update their presence. When that happens the `presence` event listener will fire.

A user can get his current presence.

    NSString *presence = [client getPresence];
    
The same user can set his presence using the client `setPresence` method.

    [client setPresence:@"available" successHandler:^() {
      
    } errorHandler:^(NSString *errorMessage) {

    }];
    
Presence options include: available, away and dnd. Calling `setPresence` on your client will trigger the presence listener for your endpoint for everyone else in the group.

