---
title: "Direct Connection - Respoke JavaScript Library"
shortTitle: "Direct Connection"
date: 2015-04-20
template: article.jade
showInMenu: "true"
menuOrder: 70
meta:
    keywords: "respoke, direct connection, WebRTC, RTCDataChannel"
    description: "Learn how to send data directly peer-to-peer"
---

###JavaScript Library
# Direct Connection

## Overview

Sending peer-to-peer messages to individual users is easy and secure using Respoke. We use DTLS, so all messages are encrypted in flight. Send any amount of data without incurring any costs beyond the initial peer-to-peer negotiation.

First connect to Respoke either in [development mode](/client/javascript/getting-started.html) or [authenticated](/client/javascript/guide/authentication.html). Then we're ready to start writing some code.

## Establish a Direct Connection

Next, get the endpoint you want to send a message to.

    var endpoint = client.getEndpoint({
        id: "kirk@enterprise.com"
    });

Then, start a direct connection with that endpoint.

    endpoint.startDirectConnection();
   
Finally, start listening for direct connection events.

    client.listen("direct-connection", function(e) {
        var directConnection = e.directConnection;
        
        directConnection.accept();
        
        directConnection.listen("open", function(e) {
            var remoteEndpointId = e.target.remoteEndpoint.id;
        });
        
        directConnection.listen("close", function(e) {
            var remoteEndpointId = e.target.remoteEndpoint.id;
        });
        
        directConnection.listen("message", function(e) {
            var message = e.message.message;
        });
    });
    
Once the remote peer accepts the direct connection, you're both ready to start sending messages and recieving messages.

## Sending a Direct Connection Message

First, save the direct connection instance for use later.

    var _this = this;

    client.listen("direct-connection", function(e) {
        _this.directConnection = e.directConnection;
    });
    
Then, send a direct connection message.

    var directConnection = _this.directConnection;
    
    // The message can be simple text
    directConnection.sendMessage({ message: "Live Long and Prosper" });
    
    // Or the message can be a complex object literal
    directConnection.sendMessage({ 
        message: {
            name: "Spock",
            rank: "Captain, retired",
            serialNumber: "S179-276SP",
            birthYear: "2230",
            placeOfBirth: "Shi'Kahr, Vulcan",
            education: "Starfleet Academy, 2249-53"
        } 
    });
