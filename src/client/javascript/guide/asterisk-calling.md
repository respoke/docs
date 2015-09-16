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
