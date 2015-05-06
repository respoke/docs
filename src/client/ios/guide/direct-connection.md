---
title: "Direct Connection - Respoke iOS SDK"
shortTitle: "Direct Connection"
date: 2015-04-20
template: article.jade
showInMenu: "true"
menuOrder: 70
meta:
    keywords: "respoke, direct connection, WebRTC, RTCDataChannel"
    description: "Learn how to send data directly peer-to-peer"
---

###iOS SDK
# Direct Connection

## Overview

Sending peer-to-peer messages to individual users is easy using Respoke. Send any amount of data without incurring any costs beyond the initial peer-to-peer negotiation.

First connect to Respoke either in [development mode](/client/ios/getting-started.html) or authenticated. Then we're ready to start writing some code.

## Establish a Direct Connection

Next, get the endpoint you want to send a message to.

    #import "Respoke.h"
    #import "RespokeCall.h"
    #import "RespokeClient.h"
    #import "RespokeDirectConnection.h"
    #import "RespokeEndpoint.h"
    
    @interface AppViewController : NSObject <RespokeClientDelegate, RespokeEndpointDelegate, RespokeDirectConnectionDelegate, RespokeCallDelegate>
        @property RespokeClient *client;
        @property RespokeDirectConnection *directConnection;
        @property RespokeCall *call;
    @end
    
    @implementation AppViewController
        @synthesize client, directConnection, call;
        
        - (void)startDirectConnection
        {   
            NSstring *endpointId = @"kirk@enterprise";
            RespokeEndpoint *endpoint = [client getEndpointWithID:endpointId skipCreate:NO];
        }
    @end

Then, start a direct connection with that endpoint.

    @implementation AppViewController
        @synthesize client, directConnection, call;
        
        - (void)startDirectConnection
        {   
            NSstring *endpointId = @"kirk@enterprise";
            RespokeEndpoint *endpoint = [client getEndpointWithID:endpointId skipCreate:NO];
            
            directConnection = [endpoint startDirectConnection];
            directConnection.delegate = self;
            call = [directConnection getCall];
        }
    @end
   
Finally, start listening for direct connection events on RespokeDirectConnectionDelegate.
    
    @implementation AppViewController
        @synthesize client, directConnection, call;
        
        - (void)startDirectConnection
        {   
            NSstring *endpointId = @"kirk@enterprise";
            RespokeEndpoint *endpoint = [client getEndpointWithID:endpointId skipCreate:NO];
            
            directConnection = [endpoint startDirectConnection];
            directConnection.delegate = self;
            call = [directConnection getCall];
        }
        
        // RespokeDirectConnectionDelegate Listeners
        - (void)onStart:(RespokeDirectConnection*)directConnection
        {
          
        }

        - (void)onOpen:(RespokeDirectConnection*)directConnection
        {
          
        }

        - (void)onClose:(RespokeDirectConnection*)directConnection
        {
          
        }

        - (void)onMessage:(id)message sender:(RespokeDirectConnection*)directConnection
        {

        }
    @end

Once the remote peer accepts the direct connection, you're both ready to start sending messages and recieving messages.

## Sending a Direct Connection Message

First, send a direct connection message.

    @implementation AppViewController
        @synthesize client, directConnection, call;
        
        - (void)startDirectConnection
        {   
            NSstring *endpointId = @"kirk@enterprise";
            RespokeEndpoint *endpoint = [client getEndpointWithID:endpointId skipCreate:NO];
            
            directConnection = [endpoint startDirectConnection];
            directConnection.delegate = self;
            call = [directConnection getCall];
        }
        
        - (void)sendMessage
        {   
            NSString *message = @"Live Long and Prosper";
       
            [directConnection sendMessage:message successHandler:^(void) {
                NSLog(@"Message sent");
            } errorHandler:^(NSString *error) {
                NSLog(@"Error sending: %@", error);
            }];
        }
    @end
    
Finally, listen for incoming direct connection messages.

    @implementation AppViewController
        @synthesize client, directConnection, call;
        
        - (void)startDirectConnection
        {   
            NSstring *endpointId = @"kirk@enterprise";
            RespokeEndpoint *endpoint = [client getEndpointWithID:endpointId skipCreate:NO];
            
            directConnection = [endpoint startDirectConnection];
            directConnection.delegate = self;
            call = [directConnection getCall];
        }
        
        - (void)sendMessage
        {   
            NSString *message = @"Live Long and Prosper";
       
            [directConnection sendMessage:message successHandler:^(void) {
                NSLog(@"Message sent");
            } errorHandler:^(NSString *error) {
                NSLog(@"Error sending: %@", error);
            }];
        }

        - (void)onMessage:(id)message sender:(RespokeDirectConnection*)directConnection
        {
            if ([message isKindOfClass:[NSString class]])
            {
                NSString *message = (NSString*)message;
            }
        }
    @end
