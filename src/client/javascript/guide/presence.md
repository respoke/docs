---
title: "Presence - Respoke JavaScript Library"
shortTitle: "Presence"
date: 2015-04-20
template: article.jade
showInMenu: "true"
menuOrder: 40
meta:
    keywords: "respoke, endpoint, presence"
    description: "Learn how to listen for endpoint presence using Respoke"
---

###JavaScript Library
# Presence

## Overview

In realtime applications it is often useful to detect when clients connect and disconnect. For example, we may want to mark a user as away when their client becomes inactive or mark the user as do not disturb when the user is busy.

Respoke provides a simple interface for setting a user's presence. First, [join a group](/client/javascript/guide/group-discovery.html) and then we're ready to start writing some code.

## Listen for Presence

Listen for presence on each endpoint in the group.

    client.listen("connect", function() {
        client.join({
            id: "united-federation-of-planets",
            
            onSuccess: function(group) {
                group.getMembers({
                    onSuccess: function(connections) {
                        connections.forEach(function(connection) {
                            var endpoint = connection.getEndpoint();
                            
                            endpoint.listen("presence", function(e) {
                                var presence = e.target.presence;
                                var endpointId = e.target.id;
                            });
                        });
                    }
                });
            }
        });
    });
    
Additionally, you will want to listen for your own presence changes.

    client.listen("presence", function(e) {
        var presence = e.target.presence;
    });

## Managing Presence

Group members will want to update their presence. When that happens the `presence` event listener will fire.

A user can get his current presence.

    var presence = client.presence;
    
The same user can set his presence using the client `setPresence` method.

    client.setPresence({
        presence: "available"
    });
    
Presence options include: available, away and dnd. Calling `setPresence` on your client will trigger the presence listener for your endpoint for everyone else in the group.

