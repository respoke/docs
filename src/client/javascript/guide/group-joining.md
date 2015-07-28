---
title: "Group Joining - Respoke JavaScript Library"
shortTitle: "Group Joining"
date: 2015-04-20
template: article.jade
showInMenu: "true"
menuOrder: 30
meta:
    keywords: "respoke, group, joining"
    description: "Learn how to do group joining using Respoke"
---

###JavaScript Library

# Groups
The <a href="https://docs.respoke.io/js-library/respoke.Group.html" target="_blank">Group</a> object forms the foundation for conversations in Respoke. It gives you the ability to communicate with a large number of people while only requiring you to send a single message. Let's take a look at how to join a group.

#### Assumptions
You have read the [Getting Started Guide](/client/javascript/getting-started.html), created an instance of the Respoke <a href="https://docs.respoke.io/js-library/respoke.Client.html" target="_blank">Client</a>, and <a href="https://docs.respoke.io/js-library/respoke.Client.html#connect" target+"_blank">connected</a> your app to Respoke. 

## Joining Groups
Before joining a group, you must first be connected to Respoke. The best way to ensure this is to add a listener for the `connect` event, and execute the code to join your group after the event is received.    

Once you are connected, you will use the <a href="https://docs.respoke.io/js-library/respoke.Client.html#join" target+"_blank">join</a> method of the <a href="https://docs.respoke.io/js-library/respoke.Client.html" target+"_blank">Client</a> object to join the group as outlined below.
    
    // Join the group after connecting to Respoke
    client.listen("connect", function() {
        client.join({
            id: "the-group-id",
            
            onSuccess: function(group) {
                // You have successfully joined the group!
            }
        });
    });  

## Group methods and events
A complete listing of the availabe methods and events for the Group object can be found in the <a href="https://docs.respoke.io/js-library/respoke.Group.html">Groups</a> section of the API reference.

### When members join the group:

    group.listen("join", function(e) {
        var endpoint = e.connection.getEndpoint();
    });

### When members leave the group:

    group.listen("leave", function(e) {
        var endpoint = e.connection.getEndpoint();
    });

### Return all members of the group:

    group.getMembers({
        onSuccess: function(connections) {
            connections.forEach(function(connection){
                var endpoint = connection.getEndpoint();
            });
        }
    });

## Related Guides
[Group Messaging](/client/javascript/guide/messaging-group.md)