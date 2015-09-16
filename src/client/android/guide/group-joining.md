---
title: "Group Joining - Respoke Android SDK"
shortTitle: "Group Joining"
date: 2015-04-20
template: article.jade
showInMenu: "true"
menuOrder: 30
meta:
    keywords: "respoke, group, joining"
    description: "Learn how to do group joining using Respoke"
---

### Android SDK
# Group Joining

## Overview

The group forms the foundation for conversations beyond 1:1 peers. To create a group you must be connected to Respoke
either in [development mode](/client/android/getting-started.html) or authenticated.

Once connectivity is established, we're ready to start writing some code.


## Joining Groups

First [connect to Respoke](/client/android/getting-started.html) and listen for the `connect` event. Then you can join
a group.

    package com.digium.respoke;

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
        private RespokeClient client;
        private RespokeGroup group;

        // RespokeClientListener methods
        // "connect" event fired after successful connection to Respoke
        public void onConnect(RespokeClient client) {
            Log.d("Main", "Connected to Respoke!");

            String groupId = "united-federation-of-planets";
            ArrayList<String> groups = new ArrayList<String>();
            groups.add(groupId);

            client.joinGroups(groups, new RespokeClient.JoinGroupCompletionListener() {
                @Override
                public void onSuccess(final ArrayList<RespokeGroup> groups) {
                    Log.d("Main", "Group joined, fetching member list");

                    group = groups.get(0);
                    group.setListener(Main.this);

                    group.getMembers(new RespokeGroup.GetGroupMembersCompletionListener() {
                        @Override
                        public void onSuccess(ArrayList<RespokeConnection> connections) {
                            for (RespokeConnection connection : connections) {
                                RespokeEndpoint endpoint = connection.getEndpoint();
                            }
                        }
                    });
                }
            });
        }
    }

Once successful, Respoke will return the `group` you joined.

Additionally, you can leave a group as well.

    group.leave(new Respoke.TaskCompletionListener() {
        @Override
        public void onSuccess() {
            // Do something
        }

        @Override
        public void onError(String errorMessage) {
            completionListener.onError(errorMessage);
        }
    });

You can listen for when people `join` this group.

    public void onJoin(RespokeConnection connection, RespokeGroup group) {
        RespokeEndpoint endpoint = connection.getEndpoint();
    }

Additionally, you can listen for when people leave this group.

    public void onLeave(RespokeConnection connection, RespokeGroup group) {
        RespokeEndpoint endpoint = connection.getEndpoint();
    }
