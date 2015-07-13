---
title: "Getting Started - Developing with JavaScript and Respoke"
shortTitle: "Getting Started"
date: 2014-10-15
template: article.jade
showInMenu: "true"
menuOrder: 0
meta:
    keywords: "respoke, JavaScript, webrtc"
    description: "Guide on how to get started developing with JavaScript and Respoke."
---

###JavaScript Library
# Getting Started
Getting up and running with Respoke is free, and only takes a few minutes. First you'll need to create a Respoke account, then include the Respoke Javascript library in your source code, and finally run a small bit of Javascript code to connect to Respoke.

## Create an account

The first thing you'll need to do before you can start using Respoke is to [signup for a free Respoke account](https://portal.respoke.io/#/signup). Once your account is setup, head to the Dev Portal and create a new app.


Within the Respoke Dashboard you can create, manage and delete Respoke Apps. Clicking on a specific App lets you view your App ID, App Secret, whether you have Dev Mode enabled and App Roles (if any).

## Install Respoke

Next, you'll need to include the Respoke JavaScript client library in your website. Simply add a script tag to the <head> section of your HTML file. We recommend including the library directly from our CDN: 
  
    <script src="https://cdn.respoke.io/respoke.min.js"></script>

Alternatively, if you prefer to install Respoke as a local application dependency, you can use Bower:

    bower install respoke
    
## Connect to Respoke

Finally, to validate everything is working, you'll want to connect to Respoke:

    // App ID from the Respoke Dashboard for your App
    var appId = "c10a2075-3f3d-466f-82f9-d2285e64c5d4";
    
    // The unique username identifying the user
    var endpointId = "spock@enterprise.com";
    
    // Create an instance of the Respoke client using your App ID
    var client = respoke.createClient({
        appId: appId,
        developmentMode: true
    });
    
    // "connect" event fired after successful connection to Respoke
    client.listen("connect", function(e) {
        console.log("Connected to Respoke!", e);
    });
    
    // Execute some signin event, then connect to Respoke with
    client.connect({
        endpointId: endpointId
    });

That's it! Now we're ready to start using all Respoke has to offer.
    
