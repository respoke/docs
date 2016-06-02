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

### JavaScript Library

# Getting Started

Getting up and running with Respoke is fast, and can be accomplished in a few easy steps.

## Create a Respoke App

Head to the [Dev Portal and create a new Respoke app](/portal/apps.html). Once you've
created your app, set it to use `development mode` by setting the Dev Mode toggle to enabled in the permissions tab of
your app settings.

![Dev Mode Enabled](../../../images/dev-mode-enabled.jpg)

With `development mode` enabled, Respoke will take care of setting permissions and issuing tokens for the users
connecting to your app. This makes it much easier to get started, and is great for development purposes; however, the
trade-off is that your app will be inherently insecure as you will need to store your app ID and app secret on the
client side. Once you're app is ready for production, you will want to
[setup brokered authenication](/client/javascript/guide/authentication.html) to help secure your app.

## Install Respoke

Next, you'll need to include the Respoke JavaScript library in the source code of your project. To do this, add the
following script tag to the `<head>` section of your HTML file:

    <script src="https://cdn.respoke.io/respoke.min.js"></script>

Alternately, if you prefer to install Respoke as a local application dependency, you can use Bower:

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

That's it! You're now ready to start using the Respoke framework. Why not get started by adding
[video](/client/javascript/guide/video-calling.html) or [messaging](/client/javascript/guide/messaging-individuals.html)
to your app?
