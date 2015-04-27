---
title: "Messaging (Group) - Respoke Android SDK"
shortTitle: "Messaging (Group)"
date: 2015-04-20
template: article.jade
showInMenu: "true"
menuOrder: 50
meta:
    keywords: "respoke, group, messaging"
    description: "Learn how to send group messages using Respoke"
---

###Android SDK
# Messaging (Group)

## Overview

Sending messages to a group of people is easy using Respoke. First, [join a group](/client/javascript/guide/group-discovery.html) and then we're ready to start writing some code.

## Send Group Message

Next, save the group instance you joined.

    var _this = this;
    
    client.listen("connect", function() {
        client.join({
            id: "united-federation-of-planets",
            
            onSuccess: function(group) {
                _this.group = group;
                . . .
            }
        });
    });

Then, send a message to the group.

    group.sendMessage(message, new Respoke.TaskCompletionListener() {
        @Override
        public void onSuccess() {
            Log.d(TAG, "message sent"); 
        }

        @Override
        public void onError(String errorMessage) {
            Log.d(TAG, "Error sending message!");
        }
    });
    
Finally, listen for incoming messages.

    client.listen("message", function(e) {
         var message = e.message.message;
    });