---
title: "Asterisk Calling - Respoke JavaScript Library"
shortTitle: "Asterisk Calling"
date: 2015-04-20
template: article.jade
showInMenu: "true"
menuOrder: 120
meta:
    keywords: "respoke, pstn, asterisk, phone calling, webrtc"
    description: "Learn how to call endpoints on asterisk servers using Respke"
---

### JavaScript Library
# Asterisk Calling

## Overview

Asterisk Calling is easy using Respoke. First, you must [authenticate](/client/javascript/guide/authentication.html)
before connecting to Respoke. Then we're ready to start writing some code.

<div class="notice">
    <h3>Heads up!</h3>
    <p>Before the end of 2015, the Chrome browser (versions 47+) will require that all use of the `getUserMedia()`
    browser API originate from a
    "<a href="http://www.w3.org/TR/powerful-features/#is-origin-trustworthy">potentially trustworthy</a>" origin. This
    means that deployed Respoke apps that use audio, video, or screen sharing features will need to be hosted on a
    domain that is secure.
</div>

## Starting Asterisk Calls

Next, get the local endpoint configured on asterisk and start an audio call.

    var call = client.startAudioCall({
        endpointId: "sales"
    });

That's it. The asterisk call is now setup.


## Phone Call Controls

You, you can hangup a call.

    call.hangup();

Hanging up a call will trigger a hangup event.

    call.listen("hangup", function(e) {
        call = null;
    });
