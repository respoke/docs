---
title: "Audio Calling - Respoke Android SDK"
shortTitle: "Audio Calling"
date: 2015-04-20
template: article.jade
showInMenu: "true"
menuOrder: 80
meta:
    keywords: "respoke, audio calling, webrtc"
    description: "Learn how to start a audio call directly peer-to-peer"
---

###Android SDK
# Audio Calling

## Overview

Audio calling is easy using Respoke. First connect to Respoke either in [development mode](/client/android/getting-started.html) or authenticated. Then we're ready to start writing some code.

## Starting Audio Calls

Next, get the endpoint you want to start a audio call with.

    package com.digium.respoke;

    import com.digium.respokesdk.Respoke;
    import com.digium.respokesdk.RespokeClient;
    import com.digium.respokesdk.RespokeConnection;
    import com.digium.respokesdk.RespokeCall;
    import com.digium.respokesdk.RespokeEndpoint;
    import com.digium.respokesdk.RespokeGroup;
    import com.digium.respokesdk.RespokeDirectConnection;


    public class Main implements RespokeClient.Listener, RespokeCall.Listener, RespokeEndpoint.Listener, RespokeGroup.Listener {
        public RespokeClient client;
        public RespokeEndpoint endpoint;
        
        public startAudioCall() {            
            endpoint = client.getEndpoint("kirk@enterprise", false);
        }
    }

Finally, start the audio call with the endpoint.

    public class Main implements RespokeClient.Listener, RespokeCall.Listener, RespokeEndpoint.Listener, RespokeGroup.Listener {
        public RespokeClient client;
        public RespokeCall call;
        public Boolean audioOnly;

        public startAudioCall() {
            String endpointId = "kirk@enterprise";
            RespokeEndpoint endpoint = client.getEndpoint(endpointId, false);
            
            audioOnly = true;
            
            call = endpoint.startCall(this, this, null, audioOnly);
        }
    }

## Answering Incoming Audio Calls

First, listen for incoming calls by implementing the onCall method of the RespokeCall Listeners.

    public void onCall(RespokeClient client, RespokeCall call) {
        // Show some UI to answer or hangup the call
        // For illustration, let us just answer the call
        call.answer(this, this);
    }

Finally, listen for when both the local endpoint and remote endpoint are successfully connected by implementing the onConnected method of the RespokeCall.Listener interface.

    public void onConnected(RespokeCall call) {
        // Call is successful, maybe show call controls 
        // (e.g. hangup, mute audio, etc.)
    }
    
The audio call is now setup for both the local client and the remote peer.

## Audio Controls

You can mute or unmute a audio call's audio.

    public void muteAudio() {
        call.muteAudio(true);
    }
    
Finally, you can hangup a call.

    public void hangup() {
        call.hangup(true);
        call = null;
    }
    
Hanging up a call will trigger a hangup event.

    public void onHangup(RespokeCall call) {
        call = null;
    }