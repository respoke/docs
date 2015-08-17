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

### Asterisk Channel Driver
# Asterisk Manager Interface (AMI) Events

## Overview

You can access Respoke session event in the Asterisk Manager Interface. First, validate you have asterisk and [chan_respoke compiled and running](/client/asterisk/getting-started.html).

## Asterisk Manager Interface (AMI)

The event is called `RespokeSession`.

    Event: RespokeSession
    Privilege: system,all
    Channel: RESPOKE/anonymous-00000006
    Id: 98B0F7D7-6AEC-4037-8250-8C5DFA7A2C11
    Local: your_respoke_endpoint
    LocalType: web
    LocalConnection:
    Remote: ORDER12345
    RemoteType: web
    RemoteConnection: 01749CDF-4BB0-41DB-8D52-30D25954D41A
    RemoteAppId:

Here, the AMI "RespokeSession" Event includes the respoke session information, in particular the `remote` field. This `remote` field is the endpointId of the remote caller. This value can be a username, orderId or anything that could uniquely identify the caller.