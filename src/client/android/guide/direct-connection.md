---
title: "Direct Connection - Respoke Android SDK"
shortTitle: "Direct Connection"
date: 2015-04-20
template: article.jade
showInMenu: "true"
menuOrder: 70
meta:
    keywords: "respoke, direct connection, WebRTC, RTCDataChannel"
    description: "Learn how to send data directly peer-to-peer"
---

### Android SDK
# Direct Connection

## Overview

Sending peer-to-peer messages to individual users is easy and secure using Respoke. We use DTLS, so all messages are
encrypted in flight. Send any amount of data without incurring any costs beyond the initial peer-to-peer negotiation.

First connect to Respoke either in [development mode](/client/android/getting-started.html) or authenticated. Then we're
ready to start writing some code.

## Establish a Direct Connection

Next, get the endpoint you want to send a message to.

    package com.digium.respoke;

    import com.digium.respokesdk.Respoke;
    import com.digium.respokesdk.RespokeClient;
    import com.digium.respokesdk.RespokeEndpoint;
    import com.digium.respokesdk.RespokeCall;

    public class Main implements RespokeClient.Listener, RespokeEndpoint.Listener,  RespokeDirectConnection.Listener, RespokeCall.Listener {
        public RespokeClient client;

        public void startDirectConnection() {
            RespokeEndpoint endpoint = client.getEndpoint("kirk@enterprise", false);
        }
    }

Then, start a direct connection with that endpoint.

    public class Main implements RespokeClient.Listener, RespokeEndpoint.Listener,  RespokeDirectConnection.Listener, RespokeCall.Listener {
        public RespokeClient client;

        public void startDirectConnection() {
            RespokeEndpoint endpoint = client.getEndpoint("kirk@enterprise", false);

            endpoint.startDirectConnection();

            directConnection = endpoint.directConnection();
            directConnection.setListener(this);
            call = directConnection.getCall();
        }
    }

Finally, start listening for direct connection events on RespokeDirectConnection.Listener.

    public class Main implements RespokeClient.Listener, RespokeEndpoint.Listener,  RespokeDirectConnection.Listener, RespokeCall.Listener {
        public RespokeClient client;
        public RespokeDirectConnection directConnection;
        public RespokeCall call;

        public void startDirectConnection() {
            RespokeEndpoint endpoint = client.getEndpoint("kirk@enterprise", false);

            endpoint.startDirectConnection();

            directConnection = endpoint.directConnection();
            directConnection.setListener(this);
            call = directConnection.getCall();
        }

        // RespokeDirectConnection Listeners
        public void onStart(RespokeDirectConnection directConnection) {

        }

        public void onOpen(RespokeDirectConnection directConnection) {

        }

        public void onClose(RespokeDirectConnection directConnection) {

        }

        public void onMessage(String message, RespokeDirectConnection directConnection) {

        }
    }


Once the remote peer accepts the direct connection, you're both ready to start sending messages and recieving messages.

## Sending a Direct Connection Message

First, send a direct connection message.

    public class Main implements RespokeClient.Listener, RespokeEndpoint.Listener,  RespokeDirectConnection.Listener, RespokeCall.Listener {
        public RespokeClient client;
        public RespokeDirectConnection directConnection;
        public RespokeCall call;

        public void startDirectConnection() {
            RespokeEndpoint endpoint = client.getEndpoint("kirk@enterprise", false);

            endpoint.startDirectConnection();

            directConnection = endpoint.directConnection();
            directConnection.setListener(this);
            call = directConnection.getCall();
        }

        public sendMessage() {
            directConnection.sendMessage("Live Long and Prosper", new Respoke.TaskCompletionListener() {
                @Override
                public void onSuccess() {
                    Log.d("Main", "direct message sent");
                }

                @Override
                public void onError(String errorMessage) {
                    Log.d("Main", "Error sending direct message! " + errorMessage);
                }
            });
        }
    }

Finally, listen for incoming direct connection messages.

    public class Main implements RespokeClient.Listener, RespokeEndpoint.Listener,  RespokeDirectConnection.Listener, RespokeCall.Listener {
        public RespokeClient client;
        public RespokeDirectConnection directConnection;
        public RespokeCall call;

        public void startDirectConnection() {
            RespokeEndpoint endpoint = client.getEndpoint("kirk@enterprise", false);

            endpoint.startDirectConnection();

            directConnection = endpoint.directConnection();
            directConnection.setListener(this);
            call = directConnection.getCall();
        }

        public sendMessage() {
            directConnection.sendMessage("Live Long and Prosper", new Respoke.TaskCompletionListener() {
                @Override
                public void onSuccess() {
                    Log.d("Main", "direct message sent");
                }

                @Override
                public void onError(String errorMessage) {
                    Log.d("Main", "Error sending direct message! " + errorMessage);
                }
            });
        }

        public void onMessage(String message, RespokeDirectConnection directConnection) {

        }
    }
