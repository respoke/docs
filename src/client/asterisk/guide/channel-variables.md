---
title: "Asterisk Channel Variables Guide - Asterisk Channel Driver"
shortTitle: "Channel Variables"
date: 2015-04-20
template: article.jade
showInMenu: "true"
menuOrder: 20
meta:
    keywords: "respoke, asterisk, chan_respoke"
    description: "Learn how to use respoke asterisk channel variables."
---

### Asterisk Channel Driver
# Asterisk Channel Variables 

## Overview

You can access Respoke session variables in your dialplan. First, validate you have asterisk and [chan_respoke compiled and running](/client/asterisk/getting-started.html).

## Asterisk Channel Variables

You can use the following Respoke session information inside the asterisk channel:

- CHANNEL(local)
- CHANNEL(local_type)
- CHANNEL(local_connection)
- CHANNEL(remote)
- CHANNEL(remote_type)
- CHANNEL(remote_connection)
- CHANNEL(remote_appid)

## The Dialplan

Here is a dialplan showing how to pass the "respoke_session_remote" inside an asterisk channel variable:

    exten => sales,1,Answer()
    same => n,NoOp(RESPOKE METADATA: ${CHANNEL(remote)})
    same => n,Ringing
    same => n,Wait(8)
    same => n,Playback(welcome)
    same => n,SayAlpha(${CHANNEL(remote)})
    same => n,Dial(SIP/300)
    same => n,Hangup()
    
Here, the `CHANNEL(remote)` information is played back to the caller using the Asterisk application SayAlpha. The `CHANNEL(remote)` is the endpointId of the remote caller. This value can be a username, orderId or anything that could uniquely identify the caller.