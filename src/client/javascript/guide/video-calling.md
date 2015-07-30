---
title: "Video Calling - Respoke JavaScript Library"
shortTitle: "Video Calling"
date: 2015-04-20
template: article.jade
showInMenu: "true"
menuOrder: 90
meta:
    keywords: "respoke, video calling, webrtc"
    description: "Learn how to start a video call directly peer-to-peer"
---

###JavaScript Library

# Video Calling
The `video calling` features of Respoke allow you to create high-quality, peer to peer video calls with just a few lines of code.

#### Assumptions
You have read the [Getting Started Guide](/client/javascript/getting-started.html), created an instance of the Respoke <a href="https://docs.respoke.io/js-library/respoke.Client.html" target="_blank">Client</a>, and <a href="https://docs.respoke.io/js-library/respoke.Client.html#connect" target+"_blank">connected</a> your app to Respoke. 


## Starting a Video Call
Before starting a video call you first need to add a few `<video>` elements to attach the call streams to.

    <video id="localVideo"></video>
    <video id="remoteVideo"></video>


Next, you'll need a reference to the <<a href="https://docs.respoke.io/js-library/respoke.Endpoint.html" target="_blank">Endpoint</a> that you want to call.

    var endpoint = client.getEndpoint({
        id: "joe@user.com"
    });

Finally, you start the video call using the <a href="https://docs.respoke.io/js-library/respoke.Client.html#startVideoCall" target="_blank">startVideoCall</a> method of the Respoke <a href="https://docs.respoke.io/js-library/respoke.Client.html" target="_blank">Client</a> object.

    var call = endpoint.startVideoCall({
        videoLocalElement: document.getElementById("localVideo"),
        videoRemoteElement: document.getElementById("remoteVideo")
    });


## Answering Incoming Video Calls
In order to respond to incoming video calls you'll need to add a listener for the `call` event, then, answer the call using the <a href="https://docs.respoke.io/js-library/respoke.Call.html#answer" target="_blank">answer</a> method of the Respoke Call object.

    client.listen("call", function(event) {
        var call = event.call;
        
        // Only answer the call if we didn't initiate it
        if(call.caller !== true) {
            call.answer({
                videoLocalElement: document.getElementById("localVideo"),
                videoRemoteElement: document.getElementById("remoteVideo")
            });
        }
    });

That's it! You've just setup your first Respoke video call!


## Controlling Video Calls

### Show or hide video during a call:

    call.toggleVideo();

### Mute or unmute video during a call:

    call.toggleAudio();

### End a call:

    call.hangup();

Calling the hangup method will cause a `hangup` event to be fired. You can listen for this event and perform any UI updates or cleanup as necessary.

    call.listen("hangup", function(e) {
        call = null;
    });
