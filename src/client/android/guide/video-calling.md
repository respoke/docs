---
title: "Video Calling - Respoke Android SDK"
shortTitle: "Video Calling"
date: 2015-04-20
template: article.jade
showInMenu: "true"
menuOrder: 90
meta:
    keywords: "respoke, video calling, webrtc"
    description: "Learn how to start a video call directly peer-to-peer"
---

###Android SDK
# Video Calling

## Overview

Video calling is easy using Respoke. First connect to Respoke either in [development mode](/client/android/getting-started.html) or authenticated. Then we're ready to start writing some code.

## Starting Video Calls

Next, create an OpenGL GLSurfaceView to hang the WebRTC call.

```
<RelativeLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <android.opengl.GLSurfaceView
        android:id="@+id/videoview"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_centerVertical="true"
        android:layout_centerHorizontal="true" />

</RelativeLayout>
```

Then, get the endpoint you want to start a video call with.

    import com.digium.respokesdk.Respoke;
    import com.digium.respokesdk.RespokeClient;
    import com.digium.respokesdk.RespokeConnection;
    import com.digium.respokesdk.RespokeCall;
    import com.digium.respokesdk.RespokeEndpoint;
    import com.digium.respokesdk.RespokeGroup;
    import com.digium.respokesdk.RespokeDirectConnection;
    
    import android.opengl.GLSurfaceView;
    import android.os.Bundle;
    import android.view.View;

    public class Main implements RespokeClient.Listener, RespokeCall.Listener, RespokeEndpoint.Listener, RespokeGroup.Listener {
        public RespokeClient client;
        public RespokeEndpoint remoteEndpoint;
        
        public Main() {            
            remoteEndpoint = client.getEndpoint("kirk@enterprise", false);
        }
    }

Finally, start the video call with the endpoint.

    public class Main implements RespokeClient.Listener, RespokeCall.Listener, RespokeEndpoint.Listener, RespokeGroup.Listener {
        public RespokeClient client;
        public RespokeEndpoint remoteEndpoint;
        public RespokeCall call;
        public GLSurfaceView videoView;
        public boolean audioOnly;

        public Main() {
            remoteEndpoint = client.getEndpoint("kirk@enterprise", false);
            
            videoView = (GLSurfaceView) findViewById(R.id.videoview);
            
            audioOnly = false;
            
            call = remoteEndpoint.startCall(this, this, videoView, audioOnly);
        }
    }

If the call was already started, simply reattach the GLSurfaceView.
    
    public class Main implements RespokeClient.Listener, RespokeCall.Listener, RespokeEndpoint.Listener, RespokeGroup.Listener {
        public RespokeCall call;
        
        public Main() {
            call.attachVideoRenderer(videoView);
        }
    }

## Answering Incoming Video Calls

First, listen for incoming calls by implementing the onCall method of the RespokeCall.Listener interface.

    public class Main implements RespokeClient.Listener, RespokeCall.Listener, RespokeEndpoint.Listener, RespokeGroup.Listener {
        public void onCall(RespokeClient client, RespokeCall call) {
            // Show some UI to answer or hangup the call
            // For illustration, let's just answer the call
            call.answer(this, this);
        }
    }

Finally, listen for when both the local endpoint and remote endpoint are successfully connected by implementing the onConnected method of the RespokeCall.Listener interface.

    public class Main implements RespokeClient.Listener, RespokeCall.Listener, RespokeEndpoint.Listener, RespokeGroup.Listener {
        public void onConnected(RespokeCall call) {
            // Call is successful, maybe show call controls 
            // (e.g. hangup, mute audio, mute video, etc.)
        }
    }
    
The video call is now setup for both the local client and the remote peer.

## Video Controls

You can hide or show video during a video call.

    public class Main implements RespokeClient.Listener, RespokeCall.Listener, RespokeEndpoint.Listener, RespokeGroup.Listener {
        public RespokeCall call;
        
        public Main() {
            call.muteVideo(true);
        }
    }
    
Additionally, you can mute or unmute a video call's audio.

    public class Main implements RespokeClient.Listener, RespokeCall.Listener, RespokeEndpoint.Listener, RespokeGroup.Listener {
        public RespokeCall call;
        
        public Main() {
            call.muteAudio(true);
        }
    }
    
You can also pause video.

    public class Main implements RespokeClient.Listener, RespokeCall.Listener, RespokeEndpoint.Listener, RespokeGroup.Listener {
        public RespokeCall call;
        
        public Main() {
            call.pause();
        }
    }
    
Then resume the video.

    public class Main implements RespokeClient.Listener, RespokeCall.Listener, RespokeEndpoint.Listener, RespokeGroup.Listener {
        public RespokeCall call;
        
        public Main() {
            call.resume();
        }
    }
    
Finally, you can hangup a call.

    public class Main implements RespokeClient.Listener, RespokeCall.Listener, RespokeEndpoint.Listener, RespokeGroup.Listener {
        public RespokeCall call;
        
        public Main() {
            call.hangup(true);
            call = null;
        }
    }
    
Hanging up a call will trigger a hangup event.

    public class Main implements RespokeClient.Listener, RespokeCall.Listener, RespokeEndpoint.Listener, RespokeGroup.Listener {
        public RespokeCall call;
        
        public void onHangup(RespokeCall call) {
            call = null;
        }
    }