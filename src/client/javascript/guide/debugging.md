---
title: "Debugging - Respoke JavaScript Library"
shortTitle: "Debugging"
date: 2015-04-20
template: article.jade
showInMenu: "true"
menuOrder: 130
meta:
    keywords: "respoke, pstn, asterisk, phone calling, webrtc"
    description: "Learn how to debug your app code using the Respoke client"
---

### JavaScript Library
# Debugging

## Overview

Turning on debug logs will give you a window into the complex negotiation process that Respoke
handles for you.

Enabling verbose logs from respoke.js may be helpful to determine if your client application is
not working properly. Nearly all of the respoke.js events and objects are printed to the console
so you can see, line by line, how thinks work.

## Setting Log Output Level

You can set the log level to any of the following log levels:

    respoke.log.setLevel("error");
    respoke.log.setLevel("warn");
    respoke.log.setLevel("info");
    respoke.log.setLevel("debug");
    respoke.log.setLevel("trace");

Additionally, you can enable everything.

    respoke.log.enableAll();
    
## Disabling All Log Output

You may disable logging all together.

    respoke.log.disableAll();