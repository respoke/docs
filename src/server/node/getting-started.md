---
title: "Getting Started - Developing with Node.js and Respoke"
shortTitle: "Getting Started"
date: 2014-10-15
template: article.jade
showInMenu: "true"
menuOrder: 10
meta:
    keywords: "respoke, Node.js, webrtc"
    description: "Guide on how to get started developing with Node.js and Respoke."
---

###Node.js Library
# Getting Started

## Overview

The Respoke Node.js library provides a convenient way for Node developers to interface with Respoke for non-browser-to-browser communication tasks. Good examples of non-browser-to-browser communication tasks include authentication and listening for webhooks.

## Install Respoke Node.js

Install Respoke as a local application dependency using npm:

    npm install respoke-admin
    
## Create Respoke

Finally, create an instance of Respoke:

    // Require Respoke
    var Respoke = require('respoke-admin');
    
    // Create an instance of the Respoke
    var respoke = new Respoke({
        appId: "c10a2075-3f3d-466f-82f9-d2285e64c5d4",
        "App-Secret": "eb327e57-e766-49de-b801-ef612a70509e"
    });

That's it! Now we're ready to start using all this Respoke server library has to offer.
    
