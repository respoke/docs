---
title: "Audio Calling - Respoke JavaScript Library"
shortTitle: "Audio Calling"
date: 2015-04-20
template: article.jade
showInMenu: "true"
menuOrder: 80
meta:
    keywords: "respoke, audio calling, webrtc, communication"
    description: "Learn how to start an audio call directly peer-to-peer"
---

### JavaScript Library

# Audio Calling
The audio calling features of Respoke allow you to create high-quality, peer to peer audio calls with just a few lines
of code.

#### Assumptions
You have read the [Getting Started Guide](/client/javascript/getting-started.html), created an instance of the Respoke
<a href="https://docs.respoke.io/js-library/respoke.Client.html" target="_blank">Client</a>, and
<a href="https://docs.respoke.io/js-library/respoke.Client.html#connect" target+"_blank">connected</a> your app to
Respoke.

<div class="notice">
    <h3>Heads up!</h3>
    <p>Before the end of 2015, the Chrome browser (versions 47+) will require that all use of the `getUserMedia()`
    browser API originate from a
    "<a href="http://www.w3.org/TR/powerful-features/#is-origin-trustworthy">potentially trustworthy</a>" origin. This
    means that deployed Respoke apps that use audio, video, or screen sharing features will need to be hosted on a
    domain that is secure.
</div>

## Starting a Call
You initiate an audio call using the
<a href="https://docs.respoke.io/js-library/respoke.Client.html#startAudioCall" target="_blank">startAudioCall</a>
method of the Respoke <a href="https://docs.respoke.io/js-library/respoke.Client.html" target="_blank">Client</a> object.

    client.startAudioCall({
        endpointId: recipientId,
        onConnect: function (evt) {
            // Your Audio
            // evt.element contains a <video> element with audio stream
        },
        onLocalMedia: function (evt) {
            // The Recipients Audio
            // evt.element contains a <video> element with audio stream
        }
    });


## Answering Incoming Calls
First, add a listener for the incoming `call` event, then, answer the call using the
<a href="https://docs.respoke.io/js-library/respoke.Call.html#answer" target="_blank">answer</a> method of the Respoke
Call object.

    client.listen('call', function(evt) {
        var activeCall = evt.call;

        // We only want to answer if we didn't initiate the call
        if(activeCall.caller !== true) {

            // Answer the call
            activeCall.answer();
        }
    });

That's it! You've just setup your first Respoke call!

## Controlling the Call

### Mute or unmute audio during a call:

    call.toggleAudio();

### End a call:

    call.hangup();

Calling the hangup method will cause a `hangup` event to be fired. You can listen for this event and perform any UI
updates or cleanup as necessary.

    call.listen("hangup", function(e) {
        call = null;
    });
