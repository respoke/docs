---
title: "Video Calling - Respoke Android SDK"
shortTitle: "Video Calling"
date: 2015-04-20
template: article.jade
showInMenu: "true"
menuOrder: 90
meta:
    keywords: "respoke, video calling, webrtc"
    description: "Learn how to start a video call directly peer-to-peer"
---

###Android SDK
# Video Calling

## Overview

Video calling is easy using Respoke. First connect to Respoke either in [development mode](/client/javascript/getting-started.html) or [authenticated](/client/javascript/guide/authentication.html). Then we're ready to start writing some code.

## Starting Video Calls

Next, create DOM elements to hang the WebRTC call.

   ```
   <video id="localvideo"></video>
   <video id="remoteVideo"></video>
   ```

Then, get the endpoint you want to start a video call with.

    var endpoint = client.getEndpoint({
        id: "kirk@enterprise.com"
    });

Finally, start the video call with the endpoint.

    var call = endpoint.startVideoCall({
        videoLocalElement: document.getElementById("localVideo"),
        videoRemoteElement: document.getElementById("remoteVideo")
    });

## Answering Incoming Video Calls

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
    
The video call is now setup for both the local client and the remote peer.


## Video Controls

You can hide or show video during a video call.

    call.toggleVideo();
    
Additionally, you can mute or unmute a video call's audio.

    call.toggleAudio();
    
Finally, you can hangup a call.

    call.hangup(); 
    
Hanging up a call will trigger a hangup event.

    call.listen("hangup", function(e) {
        call = null;
    });