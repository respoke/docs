---
title: "Messaging (Group) - Respoke JavaScript Library"
shortTitle: "Messaging (Group)"
date: 2015-04-20
template: article.jade
showInMenu: "true"
menuOrder: 50
meta:
    keywords: "respoke, group, messaging"
    description: "Learn how to send group messages using Respoke"
---

### JavaScript Library
# Messaging (Group)

## Overview

Sending messages to a group of people is easy and secure with Respoke. We use WSS (WebSockets over TLS), so all messages
are encrypted in flight.

First, [join a group](/client/javascript/guide/group-joining.html) and then we're ready to start writing some code.

## Send Group Message

Next, save the group instance you joined.

    var _this = this;

    client.listen("connect", function() {
        client.join({
            id: "united-federation-of-planets",

            onSuccess: function(group) {
                _this.group = group;
            }
        });
    });

Then, send a message to the group.

    var group = _this.group;

    // The message can be simple text
    group.sendMessage({ message: "Live Long and Prosper" });

    // Or the message can be a complex object literal
    group.sendMessage({
        message: {
            name: "Spock",
            rank: "Captain, retired",
            serialNumber: "S179-276SP",
            birthYear: "2230",
            placeOfBirth: "Shi'Kahr, Vulcan",
            education: "Starfleet Academy, 2249-53"
        }
    });

Finally, listen for incoming messages.

    client.listen("message", function(e) {
         var message = e.message.message;
    });
