---
title: "Phone Calling - Respoke JavaScript Library"
shortTitle: "Phone Calling"
date: 2015-04-20
template: article.jade
showInMenu: "true"
menuOrder: 110
meta:
    keywords: "respoke, pstn, phone calling, webrtc"
    description: "Learn how to call mobile phones and landlines using Respoke PSTN"
---

### JavaScript Library
# Phone Calling

## Overview

Phone Calling is easy using Respoke. First, you must [authenticate](/client/javascript/guide/authentication.html) before
connecting to Respoke. Then [configure your App Role to use phone calling features](/portal/phone-numbers.html). Then
we're ready to start writing some code.

<div class="notice">
    <h3>Heads up!</h3>
    <p>Before the end of 2015, the Chrome browser (versions 47+) will require that all use of the `getUserMedia()`
    browser API originate from a
    "<a href="http://www.w3.org/TR/powerful-features/#is-origin-trustworthy">potentially trustworthy</a>" origin. This
    means that deployed Respoke apps that use audio, video, or screen sharing features will need to be hosted on a
    domain that is secure.
</div>

## Starting Phone Calls

Next, get the mobile phone number or landline phone number to call and start an outgoing phone call.

    var call = client.startPhoneCall({
        number: "+12564286254",
        callerId: "+15555555555"
    });

Phone numbers follow the [E.164](http://en.wikipedia.org/wiki/E.164#DNS_mapping_of_E.164_numbers) - The international
public telecommunication numbering plan - format.

Outgoing callerId must be a phone number associated with your app. In this example, whoever you call from your app will
see (555) 555-5555 as the caller id. To have your callerId shown as unknown, either pass an empty string or null.

## Answering Incoming Phone Calls

First, grab your favorite incoming phone call bell.

    var ring = new Audio("incoming-call.wav");

Then, listen for incoming phone calls.

    client.listen("call", function(e) {
        var call = e.call;

        if(call.caller !== true) {
            if(call.toType === "did") {
                ring.play();

                var name = call.callerId.name;
                var number = call.callerId.number;
            }
        }
    });

Finally, answer the incoming phone call.

    call.answer();

Distinguish incoming mobile or landline phone calls from other types of calls by validating whether the `call.toType`
property is [`did`](http://en.wikipedia.org/wiki/Direct_inward_dial).


Additionally, get callerId on the incoming phone call by inspecting the call's `callerId` object. The number property
contains the phone number of the incoming caller. The name property contains the name of the phone number. The name
property is set by either the caller's carrier or the caller. If either value is unavailable, it will be `null`.


## Phone Call Controls

You can answer incoming phone calls.

    call.answer();

Finally, you can hangup a call.

    call.hangup();

Hanging up a call will trigger a hangup event.

    call.listen("hangup", function(e) {
        call = null;
    });
