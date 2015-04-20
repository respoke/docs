---
title: "Group Discovery - Respoke JavaScript Library"
shortTitle: "Group Discovery"
date: 2015-04-20
template: article.jade
showInMenu: "true"
menuOrder: 30
meta:
    keywords: "respoke, group, discovery"
    description: "Learn how to do group discovery using Respoke"
---

###JavaScript Library
# Group Discovery

## Overview

The group forms the foundation for conversations beyond 1:1 peers. To create a group you must be connected to Respoke either in [development mode](/client/javascript/getting-started.html) or [authenticated](/client/javascript/guide/authentication.html).

Once connectivity is established, we're ready to start writing some code.


## Discovering Groups

First connect to Respoke and listen for the `connect` event. Then you can join a group.

    client.listen("connect", function() {
        client.join({
            id: "united-federation-of-planets",
            
            onSuccess: function(group) {
                group.listen("join", function(e) {
                    var endpointId = e.connection.getEndpoint().id;
                });
                
                group.listen("leave", function(e) {
                    var endpointId = e.connection.getEndpoint().id;
                });
                
                group.getMembers({
                    onSuccess: function(connections) {
                        connections.forEach(function(connection){
                            var endpointId = connection.getEndpoint().id;
                        });
                    }
                });
            }
        });
    });  
    
Once successful, Respoke will return the `group` you joined. You can listen for when people `join` or `leave` this group. Additionally, you can get a list of group members.