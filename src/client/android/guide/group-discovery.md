---
title: "Group Discovery - Respoke Android SDK"
shortTitle: "Group Discovery"
date: 2015-04-20
template: article.jade
showInMenu: "true"
menuOrder: 30
meta:
    keywords: "respoke, group, discovery"
    description: "Learn how to do group discovery using Respoke"
---

###Android SDK
# Group Discovery

## Overview

The group forms the foundation for conversations beyond 1:1 peers. To create a group you must be connected to Respoke either in [development mode](/client/android/getting-started.html) or authenticated.

Once connectivity is established, we're ready to start writing some code.


## Discovering Groups

First connect to Respoke and listen for the `connect` event. Then you can join a group.

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
                            }
                        }
                    });
                }
            });
        }
    }
    
Once successful, Respoke will return the `group` you joined. You can listen for when people `join` or `leave` this group. Additionally, you can get a list of group members.