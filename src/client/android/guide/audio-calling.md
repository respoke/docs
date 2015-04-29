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

    import com.digium.respokesdk.Respoke;
    import com.digium.respokesdk.RespokeClient;
    import com.digium.respokesdk.RespokeConnection;
    import com.digium.respokesdk.RespokeCall;
    import com.digium.respokesdk.RespokeEndpoint;
    import com.digium.respokesdk.RespokeGroup;
    import com.digium.respokesdk.RespokeDirectConnection;


    public class Main implements RespokeClient.Listener, RespokeCall.Listener, RespokeEndpoint.Listener, RespokeGroup.Listener {
        public RespokeClient client;
        public RespokeEndpoint remoteEndpoint;
        
        public Main() {            
            remoteEndpoint = client.getEndpoint("kirk@enterprise", false);
        }
    }

Finally, start the audio call with the endpoint.

    public class Main implements RespokeClient.Listener, RespokeCall.Listener, RespokeEndpoint.Listener, RespokeGroup.Listener {
        public RespokeClient client;
        public RespokeEndpoint remoteEndpoint;
        public RespokeCall call;
        public Boolean audioOnly;

        public Main() {
            remoteEndpoint = client.getEndpoint("kirk@enterprise", false);
            
            audioOnly = true;
            
            call = remoteEndpoint.startCall(this, this, null, audioOnly);
        }
    }

## Answering Incoming Audio Calls

First, listen for incoming calls by implementing the onCall method of the RespokeCall.Listener interface.

    public class Main implements RespokeClient.Listener, RespokeCall.Listener, RespokeEndpoint.Listener, RespokeGroup.Listener {
        public void onCall(RespokeClient client, RespokeCall call) {
            // Show some UI to answer or hangup the call
            // For illustration, let's just answer the call
            call.answer(this, this);
        }
    }

Finally, listen for when both the local endpoint and remote endpoint are successfully connected by implementing the onConnected method of the RespokeCall.Listener interface.

    public class Main implements RespokeClient.Listener, RespokeCall.Listener, RespokeEndpoint.Listener, RespokeGroup.Listener {
        public void onConnected(RespokeCall call) {
            // Call is successful, maybe show call controls 
            // (e.g. hangup, mute audio, etc.)
        }
    }
    
The audio call is now setup for both the local client and the remote peer.

## Audio Controls

You can mute or unmute a audio call's audio.

    public class Main implements RespokeClient.Listener, RespokeCall.Listener, RespokeEndpoint.Listener, RespokeGroup.Listener {
        public RespokeCall call;
        
        public Main() {
            call.muteAudio(true);
        }
    }
    
Finally, you can hangup a call.

    public class Main implements RespokeClient.Listener, RespokeCall.Listener, RespokeEndpoint.Listener, RespokeGroup.Listener {
        public RespokeCall call;
        
        public Main() {
            call.hangup(true);
            call = null;
        }
    }
    
Hanging up a call will trigger a hangup event.

    public class Main implements RespokeClient.Listener, RespokeCall.Listener, RespokeEndpoint.Listener, RespokeGroup.Listener {
        public RespokeCall call;
        
        public void onHangup(RespokeCall call) {
            call = null;
        }
    }