---
title: "Audio Calling - Respoke iOS SDK"
shortTitle: "Audio Calling"
date: 2015-04-20
template: article.jade
showInMenu: "true"
menuOrder: 80
meta:
    keywords: "respoke, audio calling, webrtc"
    description: "Learn how to start a audio call directly peer-to-peer"
---

###iOS SDK
# Audio Calling

## Overview

Audio calling is easy using Respoke. First connect to Respoke either in [development mode](/client/ios/getting-started.html) or authenticated. Then we're ready to start writing some code.

## Starting Audio Calls

Next, get the endpoint you want to start a audio call with.
    
    #import "Respoke.h"
    #import "RespokeCall.h"
    #import "RespokeClient.h"
    #import "RespokeConnection.h"
    #import "RespokeDirectConnection.h"
    #import "RespokeEndpoint.h"
    #import "RespokeGroup.h"
    
    @interface AppViewController : NSObject <RespokeClientDelegate, RespokeEndpointDelegate, RespokeGroupDelegate, RespokeDirectConnectionDelegate, RespokeCallDelegate>
        @property RespokeClient *client;
        @property RespokeCall *call;
    @end
    
    @implementation AppViewController
        @synthesize client, call;
        
        - (void) startAudioCall
        {   
            NSstring *endpointId = @"kirk@enterprise";
            RespokeEndpoint *endpoint = [client getEndpointWithID:endpointId skipCreate:NO];
        }
    @end

Finally, start the audio call with the endpoint.

    @implementation AppViewController
        @synthesize client, call;
        
        - (void) startAudioCall
        {   
            NSstring *endpointId = @"kirk@enterprise";
            RespokeEndpoint *endpoint = [client getEndpointWithID:endpointId skipCreate:NO];
            
            call = [endpoint startAudioCallWithDelegate:self];
        }
    @end

## Answering Incoming Audio Calls

First, listen for incoming calls by implementing the onCall method of the RespokeCallDelegate.

    - (void)onCall:(RespokeCall*)call sender:(RespokeClient*)client
    {
        // Show some UI to answer or hangup the call
        // For illustration, let us just answer the call
        [call answer];
    }

Finally, listen for when both the local endpoint and remote endpoint are successfully connected by implementing the onConnected method of the RespokeCallDelegate.

    - (void)onConnected:(RespokeCall*)call
    {
        // Call is successful, maybe show call controls 
        // (e.g. hangup, mute audio, mute video, etc.)
    }
    
The audio call is now setup for both the local client and the remote peer.

## Audio Controls

You can mute or unmute a audio call's audio.

    - (void)muteAudio
    {   
        [call muteAudio:YES];
    }
    
Finally, you can hangup a call.

    - (void)hangup
    {   
        [call hangup:YES];
    }
    
Hanging up a call will trigger a hangup event.

    - (void)onHangup:(RespokeCall*)call
    {
      
    }