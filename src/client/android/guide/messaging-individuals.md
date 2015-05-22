---
title: "Messaging (1:1) - Respoke Android SDK"
shortTitle: "Messaging (1:1)"
date: 2015-04-20
template: article.jade
showInMenu: "true"
menuOrder: 60
meta:
    keywords: "respoke, endpoint, messaging"
    description: "Learn how to send indiviudal endpoint messages using Respoke"
---

###Android SDK
# Messaging (1:1)

## Overview

Sending 1:1 messages to individual users is easy and secure with Respoke. We use WSS (WebSockets over TLS), so all messages are encrypted in flight.

First connect to Respoke either in [development mode](/client/android/getting-started.html) or authenticated. Then we're ready to start writing some code.

## Send Indiviual Message

Next, get the endpoint you want to send a message to.

    package com.digium.respoke;

    import com.digium.respokesdk.Respoke;
    import com.digium.respokesdk.RespokeClient;
    import com.digium.respokesdk.RespokeConnection;
    import com.digium.respokesdk.RespokeEndpoint;

    public class Main implements RespokeClient.Listener, RespokeEndpoint.Listener {
        public RespokeClient client;
        public RespokeGroup group;

        public void sendMessage() {
            RespokeEndpoint endpoint = client.getEndpoint("kirk@enterprise", false);
        }
    }

Then, send a message to the individual.

    public class Main implements RespokeClient.Listener, RespokeGroup.Listener, RespokeEndpoint.Listener {
        public RespokeClient client;

        public void sendMessage() {
            RespokeEndpoint endpoint = client.getEndpoint("kirk@enterprise", false);
            
            endpoint.sendMessage("Live Long and Prosper", new Respoke.TaskCompletionListener() {
                @Override
                public void onSuccess() {
                    Log.d("Main", "message sent");
                }

                @Override
                public void onError(String errorMessage) {
                    Log.d("Main", "Error sending message!");
                }
            }); 
        }
    }

Finally, listen for incoming messages by implementing the onMessage method of the RespokeGroup.Listener interface.

    public void onMessage(String message, Date timestamp, RespokeEndpoint endpoint) {
        String endpointId = endpoint.getEndpointID();
    }