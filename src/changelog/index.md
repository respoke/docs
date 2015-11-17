---
title: "Changelog"
shortTitle: "Changelog"
date: 2015-04-06
template: article.jade
showInMenu: "false"
linkUrl: "/changelog/"
menuOrder: 0
---

# Changelog

## 2015-11-16

Custom data may now be passed using the "metadata" parameter when starting any 
type of call or direct connection with Respoke.js. The data can be accessed by 
the recipient of the call as `call.metadata`.

*example of passing metadata when starting a call*

```
var endpoint = client.getEndpoint('saymyname');
endpoint.startAudioCall({
  metadata: {
    displayName: 'Susan',
    orderNumber: 'WF23RM88'
  },
  onConnect: function () { ... },
  onHangup: function () { ... }
});
```

*example of inspecting the metadata when receiving a call*

```
client.listen('call', function (evt) {
  if (evt.call.metadata && evt.call.metadata.displayName) {
    console.log("Incoming call from '" + evt.call.metadata.displayName + "'.");
  } else {
    console.log("Incoming call from endpoint '" + evt.endpoint.id + "'.");
  }
  evt.call.answer();
});
```

Support has also been added to chan_respoke for retrieving the metadata of an 
incoming call. A new dialplan function is available as a part of chan_respoke 
called `RESPOKE_METADATA()` that will retrieve the metadata from the call. It 
also accepts a single parameter, `key`, which allows you to extract a single 
key of the metadata if it is a JSON object.

*example extensions.conf that logs the `displayName` metadata property on an 
incoming call*

```
[general]

[from-respoke]
exten => saymyname,1,NoOp() 
same => n,VERBOSE(2, METADATA_NAME=${RESPOKE_METADATA(displayName)}) 
same => n,Hangup()
```

If you want to see support for metadata added to our other client libraries, or 
have outgoing call metadata support added to chan_respoke, please let us know by 
filing an issue on the respective repository on Github, posting on our community 
forums, or shooting us an email. 

## 2015-04-02

All calls from a phone number to a Respoke endpoint now have callerId available. 
The callerId values can be accessed via `call.callerId.number` for the phone 
number, and `call.callerId.name` for the descriptive name. If either value is
unavailable, it will be `null`.

Outgoing callerId has also been improved. When a role has only a single callerId 
configured, all outgoing phone calls using that role will display that callerId 
by default. You can withhold your callerId by explicitly providing an empty 
callerId param when calling `client.startPhoneCall()`.

For more information about callerId and phone calls using Respoke, visit the
"[Making Phone Calls](/tutorials/calling-to-and-from-a-phone.html)" article at 
the Respoke docs site.

## 2014-02-12

Stability improvements for URL parsing in node-respoke-admin library.

## 2014-02-04

Screensharing API added to the Respoke.js library. See the
[announcement post](http://blog.respoke.io/post/110068512708/introducing-respoke-screen-sharing)
for more details.

## 2014-12-18

A new documentation site has been published. The docs are open source and
[available on Github](https://github.com/respoke/docs).
We welcome documentation improvements from the community.

## 2014-11-22

The Respoke browser JavaScript library for has been release as
[open source software](https://github.com/respoke/respoke) and
[published to NPM](https://npmjs.org/package/respoke).

## 2014-11-13

The first version of a 
**[Node.js administration client](https://github.com/respoke/node-respoke-admin)**
has been released. It is open source under the MIT license.

## 2014-09-02

**Analytics** Or, as we affectionately call it here at Respoke Central,
Babylitics. After your app gets some traffic, you'll see maps and charts on your
[dashboard][], this includes US Usage, World Usage, a breakdown of User Agents,
and a codecs breakdown. We are just getting started, so expect to see more
analytics soon!

![Respoke app analytics - developer console screenshot](/images/screenshot-browser-analytics.png)

[dashboard]: https://portal.respoke.io/
