---
title: "Video Calling - Respoke iOS SDK"
shortTitle: "Video Calling"
date: 2015-04-20
template: article.jade
showInMenu: "true"
menuOrder: 90
meta:
    keywords: "respoke, video calling, webrtc"
    description: "Learn how to start a video call directly peer-to-peer"
---

###iOS SDK
# Video Calling

## Overview

Video calling is easy using Respoke. First connect to Respoke either in [development mode](/client/ios/getting-started.html) or authenticated. Then we're ready to start writing some code.

## Starting Video Calls

Next, get the endpoint you want to start a video call with.

    #import "Respoke.h"
    #import "RespokeCall.h"
    #import "RespokeClient.h"
    #import "RespokeEndpoint.h"
    
    @interface AppViewController : NSObject <RespokeClientDelegate, RespokeEndpointDelegate, RespokeCallDelegate>
        @property RespokeClient *client;
        @property RespokeCall *call;
        @property (weak) IBOutlet UIView *remoteView;
        @property (weak) IBOutlet UIView *localView;
    @end
    
    @implementation AppViewController
        @synthesize client, call, remoteView, localView;
        
        - (void)startVideoCall
        {   
            NSstring *endpointId = @"kirk@enterprise";
            RespokeEndpoint *endpoint = [client getEndpointWithID:endpointId skipCreate:NO];
        }
    @end

Finally, start the video call with the endpoint.

    @implementation AppViewController
        @synthesize client, call;
        
        - (void)startVideoCall
        {   
            NSstring *endpointId = @"kirk@enterprise";
            RespokeEndpoint *endpoint = [client getEndpointWithID:endpointId skipCreate:NO];
            
            call = [endpoint startVideoCallWithDelegate:self remoteVideoView:remoteView localVideoView:localView];
        }
    @end

If the call was already started, simply reset the local view and remote view.
    
    call.delegate = self;
    call.remoteView = remoteView;
    call.localView = localView;

## Answering Incoming Video Calls

First, listen for incoming calls by implementing the onCall method of the RespokeCallDelegate.

    - (void)onCall:(RespokeCall*)call sender:(RespokeClient*)client
    {
        // Show some UI to answer or hangup the call
        // For illustration, let's just answer the call
        [call answer];
    }

Finally, listen for when both the local endpoint and remote endpoint are successfully connected by implementing the onConnected method of the RespokeCallDelegate.

    - (void)onConnected:(RespokeCall*)call
    {
        // Call is successful, maybe show call controls 
        // (e.g. hangup, mute audio, mute video, etc.)
    }
    
The video call is now setup for both the local client and the remote peer.

## Video Controls

You can hide or show video during a video call.

    - (void)muteVideo
    {   
        [call muteVideo:YES];
    }
    
Additionally, you can mute or unmute a video call's audio.

    - (void)muteAudio
    {   
        [call muteAudio:YES];
    }
    
Next, you can toggle the video source from the front-facing camera to the back-facing camera.

    - (void)switchVideoSource
    {   
        [call switchVideoSource:YES];
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