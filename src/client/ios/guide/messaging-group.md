---
title: "Messaging (Group) - Respoke Android SDK"
shortTitle: "Messaging (Group)"
date: 2015-04-20
template: article.jade
showInMenu: "true"
menuOrder: 50
meta:
    keywords: "respoke, group, messaging"
    description: "Learn how to send group messages using Respoke"
---

###iOS SDK
# Messaging (Group)

## Overview

Sending messages to a group of people is easy using Respoke. First, [join a group](/client/ios/guide/group-discovery.html) and then we're ready to start writing some code.

## Send Group Message

Next, send a message to the group.
    
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
        
        - (void)sendMessage
        {
            NSString *message = @"Live Long and Prosper";
        
            [group sendMessage:message successHandler:^(void) {
                NSLog(@"Message sent");
            } errorHandler:^(NSString *error) {
                NSLog(@"Error sending: %i", error);
            }];
        
        }
    @end
    
Finally, listen for incoming messages by implementing the onMessage method of the RespokeGroup.Listener interface.

    - (void)onMessage:(NSString*)message sender:(RespokeEndpoint*)endpoint timestamp:(NSDate *)timestamp
    {
        NSString *endpointId = [endpoint getEndpointID];
    }