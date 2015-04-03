---
title: "Changelog"
date: 2014-11-13
template: article.jade
showInMenu: "true"
menuOrder: 5
meta:
    keywords: "respoke, changelog"
    description: "Recent changes to Respoke."
---

# Changelog

## 2015-04-02

All calls from a phone number to a Respoke endpoint now have callerId available. The callerId values can be accessed
via `call.callerId.number` for the phone number, and `call.callerId.name` for the descriptive name. If either value is
unavailable, it will be `null`.

Outgoing callerId has also been improved. When a role has only a single callerId configured, all outgoing phone calls
using that role will display that callerId by default. You can withhold your callerId by explicitly providing an empty
callerId param when calling `client.startPhoneCall()`.

For more information about callerId and phone calls using Respoke, visit the
"[Making Phone Calls](/tutorials/calling-to-and-from-a-phone.html)" article at the Respoke docs site.

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

The first version of a **[Node.js administration client](https://github.com/respoke/node-respoke-admin)**
has been released. It is open source under the MIT license.

## 2014-09-02

**Analytics** Or, as we affectionately call it here at Respoke Central,
Babylitics. After your app gets some traffic, you'll see maps and charts on your
[dashboard][], this includes US Usage, World Usage, a breakdown of User Agents,
and a codecs breakdown. We are just getting started, so expect to see more
analytics soon!

![Respoke app analytics - developer console screenshot](/images/screenshot-browser-analytics.png)

[dashboard]: https://portal.respoke.io/
