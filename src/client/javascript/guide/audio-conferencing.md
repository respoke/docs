---
title: "Audio Conferencing - Respoke JavaScript Library"
shortTitle: "Audio Conferening"
date: 2015-04-20
template: article.jade
showInMenu: "true"
menuOrder: 80
meta:
    keywords: "respoke, audio conference, webrtc"
    description: "Learn how to start an audio conference with Respoke"
---

###JavaScript Library
# Audio Conferencing

## Overview

Use audio conferencing to join multiple participants in a single conference room. Combine audio conferencing with groups to get a list of conference participants and keep track of participants joining and leaving.

Note: Audio conferencing is currently in public beta and will need to be enabled in your account before you can use it. If you would like to use this feature, please send an email to support@respoke.io and request that audio conferencing be enabled for your account.

## Starting Audio Conferencing

Audio conferencing is easy using Respoke. First, [join a group](/client/javascript/guide/group-joining.html) and then we're ready to start writing some code.

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


Finally, join a conference call.

    var group = _this.group;

    var conference = group.joinConference({
        onConnect: function(e) {
            _this.call = e.call;
        }
    });
   
## Managing Conference Participants

Manage conference participants using Respoke [groups](/client/javascript/guide/group-joining.html).

    var conference = group.joinConference({
        onConnect: function(e) {
            _this.call = e.call;
           
            // Manage conference participants
            client.join({
                id: "united-federation-of-planets-conference",
            
                onSuccess: function(conferenceGroup) {
                    _this.conferenceGroup = conferenceGroup;
                    
                    conferenceGroup.listen("join", function(e) {
                        var endpoint = e.connection.getEndpoint();
                    });
                
                    conferenceGroup.listen("leave", function(e) {
                        var endpoint = e.connection.getEndpoint();
                    });
                
                    conferenceGroup.getMembers({
                        onSuccess: function(connections) {
                            connections.forEach(function(connection){
                                var endpoint = connection.getEndpoint();
                            });
                        }
                    });
                }
            });
        }
    });

Then, when ready, leave the conference.

    call.hangup();
    conferenceGroup.leave();
    
Finally, clear the list of conference participants from the UI.

    document.getElementById("conference-list").innerHTML = null;


## Conference Audio Controls

You can mute or unmute an audio call.

    call.toggleAudio();
    
Additionally, you can hangup a call.

    call.hangup(); 
    
Hanging up a call will trigger a hangup event.

    call.listen("hangup", function(e) {
        call = null;
    });