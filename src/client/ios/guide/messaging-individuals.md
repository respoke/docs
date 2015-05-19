---
title: "Messaging (1:1) - Respoke iOS SDK"
shortTitle: "Messaging (1:1)"
date: 2015-04-20
template: article.jade
showInMenu: "true"
menuOrder: 60
meta:
    keywords: "respoke, endpoint, messaging"
    description: "Learn how to send indiviudal endpoint messages using Respoke"
---

###iOS SDK
# Messaging (1:1)

## Overview

Sending 1:1 messages to individual users is easy and secure with Respoke. First connect to Respoke either in [development mode](/client/ios/getting-started.html) or authenticated. Then we're ready to start writing some code.

## Send Indiviual Message

Next, get the endpoint you want to send a message to.

    #import "Respoke.h"
    #import "RespokeClient.h"
    #import "RespokeEndpoint.h"
    
    @interface AppViewController : NSObject <RespokeClientDelegate, RespokeEndpointDelegate>
        @property RespokeClient *client;
    @end
    
    @implementation AppViewController
        @synthesize client;
        
        - (void)sendMessage
        {   
            NSstring *endpointId = @"kirk@enterprise";
            RespokeEndpoint *endpoint = [client getEndpointWithID:endpointId skipCreate:NO];
        }
    @end

Then, send a message to the individual.

    @implementation AppViewController
        @synthesize client;
       
        - (void)sendMessage
        {   
            NSstring *endpointId = @"kirk@enterprise";
            RespokeEndpoint *endpoint = [client getEndpointWithID:endpointId skipCreate:NO];
           
            NSString *message = @"Live Long and Prosper";
       
            [endpoint sendMessage:message successHandler:^(void) {
                NSLog(@"Message sent");
            } errorHandler:^(NSString *error) {
                NSLog(@"Error sending: %@", error);
            }];
        }
    @end

Finally, listen for incoming messages by implementing the onMessage method of the RespokeGroup.Listener interface.

    - (void)onMessage:(NSString*)message sender:(RespokeEndpoint*)endpoint timestamp:(NSDate *)timestamp
    {
        NSString *endpointId = [endpoint getEndpointID];
    }