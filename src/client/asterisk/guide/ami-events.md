---
title: "Asterisk Manager Interface (AMI) Events - Asterisk Channel Driver"
shortTitle: "AMI Events"
date: 2015-04-20
template: article.jade
showInMenu: "true"
menuOrder: 30
meta:
    keywords: "respoke, group, discovery"
    description: "Learn how to use Respoke AMI Events"
---

###Asterisk Channel Driver
# Asterisk Manager Interface (AMI) Events

## Overview

You can access Respoke session event in the Asterisk Manager Interface. First, validate you have asterisk and [chan_respoke compiled and running](/client/asterisk/getting-started.html).

## Asterisk Manager Interface (AMI)

The event is called `respoke_session`.

    Event: respoke_session
    Privilege: system,all
    channel: RESPOKE/anonymous-00000006
    id: 98B0F7D7-6AEC-4037-8250-8C5DFA7A2C11
    local: your_respoke_endpoint
    local_type: web
    local_connection:
    remote: ORDER12345
    remote_type: web
    remote_connection: 01749CDF-4BB0-41DB-8D52-30D25954D41A
    remote_appid:

Here, the AMI "respoke_session" Event includes the respoke session information, in particular the `remote` field. This `remote` field is the endpointId of the remote caller. This value can be a username, orderId or anything that could uniquely identify the caller.