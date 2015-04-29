---
title: "Presence - Respoke Android SDK"
shortTitle: "Presence"
date: 2015-04-20
template: article.jade
showInMenu: "true"
menuOrder: 40
meta:
    keywords: "respoke, endpoint, presence"
    description: "Learn how to listen for endpoint presence using Respoke"
---

###Android SDK
# Presence

## Overview

In realtime applications it is often useful to detect when clients connect and disconnect. For example, we may want to mark a user as away when their client becomes inactive or mark the user as do not disturb when the user is busy.

Respoke provides a simple interface for setting a user's presence. First, [join a group](/client/android/guide/group-discovery.html) and then we're ready to start writing some code.

## Listen for Presence

Listen for presence on each endpoint in the group.

    import com.digium.respokesdk.Respoke;
    import com.digium.respokesdk.RespokeClient;
    import com.digium.respokesdk.RespokeConnection;
    import com.digium.respokesdk.RespokeEndpoint;
    import com.digium.respokesdk.RespokeGroup;

    import java.util.ArrayList;
    import java.util.Date;
    import java.util.HashMap;
    import java.util.Map;

    public class Main implements RespokeClient.Listener, RespokeGroup.Listener, RespokeEndpoint.Listener {
        public RespokeClient client;

        . . .

        // RespokeClientListener methods
        // "connect" event fired after successful connection to Respoke
        public void onConnect(RespokeClient client) {
            Log.d("MainActivity", "Connected to Respoke!");
            
            String groupId = "united-federation-of-planets";
            ArrayList<String> groups = new ArrayList<String>();
            groups.add(groupId);
            
            client.joinGroups(groups, new RespokeClient.JoinGroupCompletionListener() {
                @Override
                public void onSuccess(final ArrayList<RespokeGroup> groups) {
                    Log.d("MainActivity", "Group joined, fetching member list");
                    
                    RespokeGroup group = groups.get(0);
                    group.setListener(Main.this);
                    
                    group.getMembers(new RespokeGroup.GetGroupMembersCompletionListener() {
                        @Override
                        public void onSuccess(ArrayList<RespokeConnection> connections) {
                            for (RespokeConnection connection : connections) {
                                RespokeEndpoint endpoint = connection.getEndpoint();
                                
                                endpoint.registerPresence(new Respoke.TaskCompletionListener() {
                                    @Override
                                    public void onSuccess() {
                                    }
                                });
                            }
                        }
                    });
                }
            });
        }
    }
    
Additionally, you will want to presence changes from RespokeEndpoiint.Listener.

    public class Main implements RespokeClient.Listener, RespokeGroup.Listener, RespokeEndpoint.Listener {
        public RespokeClient client;

        . . .

        public void onPresence(Object presence, RespokeEndpoint endpoint) {
            Log.d("endpoingId: ", endpoint.getEndpointID());
            Log.d("presence: ", presence);
        }
    }

## Managing Presence

Group members will want to update their presence. When that happens the `presence` event listener will fire.

A user can get his current presence.

    String presence = client.getPresence();
    
The same user can set his presence using the client `setPresence` method.

    public class Main implements RespokeClient.Listener, RespokeGroup.Listener, RespokeEndpoint.Listener {
        public RespokeClient client;

        . . .

        client.setPresence("available", new Respoke.TaskCompletionListener() {
            @Override
            public void onSuccess() {
            }

            @Override
            public void onError(String errorMessage) {
            }
        });
    }
    
Presence options include: available, away and dnd. Calling `setPresence` on your client will trigger the presence listener for your endpoint for everyone else in the group.

