---
title: "Screen Sharing - Respoke JavaScript Library"
shortTitle: "Screen Sharting"
date: 2015-04-20
template: article.jade
showInMenu: "true"
menuOrder: 100
meta:
    keywords: "respoke, screen sharing, webrtc"
    description: "Learn how to screen share directly peer-to-peer"
---

###JavaScript Library
# Screen Sharing

## Overview

Screen sharing is easy using Respoke. First connect to Respoke either in [development mode](/client/javascript/getting-started.html) or [authenticated](/client/javascript/guide/authentication.html). Then we're ready to start writing some code.

## Starting Screen Shares

Next, create DOM elements to hang the WebRTC call.

   ```
   <video id="localvideo"></video>
   <video id="remoteVideo"></video>
   ```

Then, get the endpoint you want to start a screen share session with.

    var endpoint = client.getEndpoint({
        id: "kirk@enterprise.com"
    });

Finally, start the screen share with the endpoint.

    var call = endpoint.startScreenShare({
        videoLocalElement: document.getElementById("localVideo"),
        videoRemoteElement: document.getElementById("remoteVideo")
    });

## Answering Incoming Screen Share Calls

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
    
The screen share is now setup for both the local client and the remote peer. Only one person can screen share at a time. 

For example, say the local user is sharing his screen and the remote user is looking at his screen. Since only one person can screen share, the remote user will not have any video input, so from the local user's POV, he's starting at a blank wall.

Consider starting a [video call](/client/javascript/guide/video-calling.html) for the remote user. That way, the local user will have someone to look at while sharing his screen.


## Video Controls

You can hide or show your screen during a screen sharing call.

    call.toggleVideo();
    
Additionally, you can mute or unmute a screen sharing call's audio.

    call.toggleAudio();
    
Finally, you can hangup a call.

    call.hangup(); 
    
Hanging up a call will trigger a hangup event.

    call.listen("hangup", function(e) {
        call = null;
    });