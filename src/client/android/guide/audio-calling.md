---
title: "Audio Calling - Respoke Android SDK"
shortTitle: "Audio Calling"
date: 2015-04-20
template: article.jade
showInMenu: "true"
menuOrder: 80
meta:
    keywords: "respoke, audio calling, webrtc"
    description: "Learn how to start an audio call directly peer-to-peer"
---

###Android SDK
# Audio Calling

## Overview

Audio calling is easy using Respoke. First connect to Respoke either in [development mode](/client/javascript/getting-started.html) or [authenticated](/client/javascript/guide/authentication.html). Then we're ready to start writing some code.

## Starting Audio Calls

Next, create DOM elements to hang the WebRTC call.

   ```
   <video id="localvideo"></video>
   <video id="remoteVideo"></video>
   ```

Then, get the endpoint you want to start an audio call with.

    var endpoint = client.getEndpoint({
        id: "kirk@enterprise.com"
    });

Finally, start the audio call with the endpoint.

    var call = endpoint.startAudioCall({
        videoLocalElement: document.getElementById("localVideo"),
        videoRemoteElement: document.getElementById("remoteVideo")
    });

## Answering Incoming Audio Calls

First, listen for incoming calls.

    client.listen("call", function(e) {
        var call = e.call;
    });
    
Finally, answer the incoming call.

    client.listen("call", function(e) {
        var call = e.call;
       
        if(call.caller !== true) {
            call.answer({
                videoLocalElement: document.getElementById("localVideo"),
                videoRemoteElement: document.getElementById("remoteVideo")
            });
        }
    });
    
The audio call is now setup for both the local client and the remote peer.


## Audio Controls

You can mute or unmute an audio call.

    call.toggleAudio();
    
Additionally, you can hangup a call.

    call.hangup(); 
    
Hanging up a call will trigger a hangup event.

    call.listen("hangup", function(e) {
        call = null;
    });