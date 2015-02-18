---
title: "Respoke.js Audio Calling Quickstart"
shortTitle: "Audio calling guide"
date: 2014-04-24 10:10
template: article.jade
showInMenu: "true"
menuOrder: 1
---
# Audio calling in a web browser with Respoke


Welcome to Respoke. This quick guide should help you build a **messaging and audio calling app** in about 10 minutes. This tutorial uses development mode for ease of development, but all apps should be converted to using [brokered authentication](/tutorials/brokered-auth.html) before being published.

### Step 1: Create a Respoke Account

Go to the [Respoke.io website](https://www.respoke.io) and sign up. It's free.

When your account is confirmed, visit the [Dev Console](https://portal.respoke.io).

### Step 2: Create An Application

In the [Developer Console](https://portal.respoke.io) go to the "Apps" page and
click on "New App". After you have named and created the app, click on the app
tile to edit it.

Make sure the **Development Mode** option is enabled (dev mode is the default).

Find the **App ID** and copy it (not the App Secret).

*Example*

	3a56901d-78ca-4436-b696-4a7a66cdc1ac

### Step 3: HTML Scaffold

You can either use a real web server or something like [JSFiddle](http://jsfiddle.net). This is **strictly client-side** stuff (HTML, CSS and JavaScript) so you won't need any server-side tech.


We're using jQuery here, but you're welcome to use whatever library you prefer. Respoke has no dependencies.

	<html>
		<head>
			<!-- Respoke client library -->
			<script src="https://cdn.respoke.io/respoke.min.js"></script>

			<!-- jQuery, for this example -->
			<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
		</head>
		<body>
			<h3 id="status">Not Connected</h3>
			<div id="login">
				User Name:
				<input id="endpoint" type="text" />
				<input id="doLogin" type="button" value="Connect" />
			</div>
		</body>
	</html>

*Pro Tip: If you're using JSFiddle, only add the stuff inside the &lt;body&gt; tag to the HTML panel, add jQuery using the Frameworks & Extensions box, and drop the Respoke library URL from the second &lt;script&gt; tag to the External Resources list.*

Add some optional CSS:

	body {
		font-family: Arial, Helvetica;
		margin-left: 25px;
	}

### Step 4: Connecting To Respoke

The first thing your client will need to do is connect to Respoke. All that takes is a 'client' object and an access token.

	// here's the App ID value from the portal:
	var appid = "DD90A374-0C06-456F-9D4F-E8038E6523D2";

	// create a client object using the App ID value from Step 2
	var client = respoke.createClient({
		appId: appid,
		developmentMode: true
	});

	// listen for the 'connect' event
	client.listen('connect', function () {
		$("#status").html("Connected to Respoke!");
	});

	// now connect when the user clicks the 'Connect' button
	$("#doLogin").click(function () {
		var endpoint = $("#endpoint").val();
		client.connect({
			endpointId: endpoint // your username is the endpoint
		});
	});

Once you have that in place, run it. You should see the page load with a "Not Connected" status.

Enter a name - whatever you want - in the User Name box and click the 'Connect' button. The status box should update to read "Connected To Respoke!".

### Step 5: Sending Messages

Ok, so you're connected. Time to kick the tires by sending a message.

Add a bit more to your HTML scaffold:

	<body>
		<h3 id="status">Not Connected</h3>
		<div id="login">
			User Name:
			<input id="endpoint" type="text" />
			<input id="doLogin" type="button" value="Connect" />
		</div>
		<div id="messaging">
		    <ul id="messages"></ul><br />
		    Send To:
		    <input id="remoteId" type="text" /><br />
		    <textarea id="textToSend" rows="2"></textarea><br />
		    <input id='sendMessage' type='button' value='Send Message' />
		</div>
	</body>

Some additional CSS will help the layout.

	#messages {
    	height: 400px;
    	width: 400px;
    	border: 1px solid #c7c7c7;
    	overflow-x: hidden;
		overflow-y: auto;
    	padding: 5px;
	}

	#textToSend {
    	width: 400px;
    	padding: 5px;
	}


To receive messages, add a listener to the client that formats the message and adds it to the screen.

	// listen for incoming messages
	client.listen('message', function(evt) {
		$("#messages").append(
			"<li>" + evt.message.message + "</li>"
		);
	});

To send a message, you just need to know the ID of the person (or device) you want to message. Use the ID to create an 'endpoint' object, and use the [endpoint object's sendMessage()](/js-library/endpoint.js.html#sendMessage) method:

	$("#sendMessage").click(function (){

		// get the recipient name
		var remote = $("#remoteId").val();

		// make an endpoint for that recipient
		var endpoint = client.getEndpoint({ id: remote });

		// grab the text to send
		var messageText = $("#textToSend").val();

		// send it
		endpoint.sendMessage({ message : messageText });

		// show yourself the message
		$("#messages").append(
			"<li>" + messageText + "</li>"
		);

		// clear the text you just sent
		$("#textToSend").val('');
	});

<br />

#### **Test messaging**

Open the page on two different computers, or using a private browsing session in a second window on the same computer.

Log in using a different name on each.

Enter the name of the *other* login into the "Send To" box.

Add a message and hit the "Send Message" button. The message should appear for both users.


### Step 6: Make An Audio Call

Now that you can send messages between clients, it doesn't take much to get audio calls working.

Update the HTML with some buttons to attach the call handlers to.

	<div id="messaging">
	    <ul id="messages"></ul><br />
	    Send To:
	    <input id="remoteId" type="text" /><br />
	    <textarea id="textToSend" rows="2"></textarea><br />
	    <input id='sendMessage' type='button' value='Send Message' />
	    <input id='makeCall' type='button' value='Audio Call' />
	    <input id='endCall' type='button' value='Hang Up' />
	</div>

At the top of your JS, add a variable to track the active call.

	var call = null;

The **call** event handler captures the incoming call and automatically answers it.

	// listen for, and answer, incoming calls
	client.listen('call', function(evt) {
		 call = evt.call;
	     if (call.caller !== true) {
	         call.answer({constraints: {audio: true, video: false}});
	         call.listen('hangup', function () {
	         	call = null;
	         });
         }
    });


Now wire up the "Audio Call" button to a function that places a new audio call and the "Hangup" button to a function that disconnects an active call:

	// Call somebody
	$("#makeCall").click(function () {
		var endpoint = client.getEndpoint({ id: $("#remoteId").val() });
		call = endpoint.startAudioCall();
        call.listen('hangup', function () {
        	call = null;
        });
	});

	// Hang up on them
	$("#endCall").click(function () {
		if (call) {
			call.hangup();
			call = null;
		}
	});

<br />

#### **Test audio calls**

Follow the same steps as *Test messaging*, but click the "Audio Call" button.

The browser will prompt you to allow the call. Both parties must accept before the call will go through. *This is a WebRTC requirement for security reasons. If you host your application on a secure server (HTTPS), the user will be allowed to grant the "Allow" permission on an ongoing basis.*


### The Whole Enchilada

So there you have it. IM and voice calling in a few lines of code.

[Try it live &raquo;](http://jsbin.com/jipeg)

### HTML

	<!DOCTYPE html>
	<html>
    <!-- Note that Chrome blocks the getUserMedia API when you open an html
         file from the filesystem (file:// prefix). Therefore, it is necessary
         to run this example page from a web server in order for it to behave
         correctly -->
	<head>
	  <script type='text/javascript' src='https://cdn.respoke.io/respoke.min.js'></script>
	  <script type='text/javascript' src='http://code.jquery.com/jquery-2.1.0.min.js'></script>
	</head>
	<body>
	    <h3 id="status">Not Connected</h3>
	    <div id="login">
	        User Name:
	        <input id="endpoint" type="text" />
	        <input id="doLogin" type="button" value="Connect" />
	    </div>
	    <div id="messaging">
	        <ul id="messages"></ul><br />
	        Send To:
	        <input id="remoteId" type="text" /><br />
	        <textarea id="textToSend" rows="2"></textarea><br />
	        <input id='sendMessage' type='button' value='Send Message' />
	        <input id='makeCall' type='button' value='Audio Call' />
	        <input id='endCall' type='button' value='Hang Up' />
	    </div>
	  </body>
	</html>

### CSS

	body {
	  	font-family: Arial, Helvetica;
	  	margin-left: 25px;
	}

	#messages {
	    height: 200px;
	    width: 400px;
	    border: 1px solid #c7c7c7;
	    overflow-x: hidden;
	    overflow-y: auto;
	    padding: 5px;
	}

	#textToSend {
	    width: 400px;
	    padding: 5px;
	}

### JavaScript

	var appid = "DD90A374-0C06-456F-9D4F-E8038E6523D2";
	var call = null;

	// create a client object using the App ID value from Step 2
	var client = respoke.createClient({
	  	appId: appid,
	  	developmentMode: true
	});

	// listen for the 'connect' event
	client.listen('connect', function () {
	    $("#status").html("Connected to Respoke!");
	});

	// listen for incoming messages
	client.listen('message', function(evt) {
	    $("#messages").append("<li>" + evt.message.message + "</li>");
	});

	// listen for and answer incoming calls
	client.listen('call', function(evt) {
		call = evt.call;
	    if (call.caller !== true) {
	        call.answer({constraints: {audio: true, video: false}});
	        call.listen('hangup', function () {
	         	call = null;
	        });
        }
    });

	// now connect when the user clicks the 'Connect' button
	$("#doLogin").click(function () {
	    var endpoint =  $("#endpoint").val();
	    client.connect({
	        endpointId: endpoint
	    });
	});

	// send a message to the far-end party
	$("#sendMessage").click(function (){

	    // get the recipient name
	    var remote = $("#remoteId").val();

	    // make an endpoint for that recipient
	    var endpoint = client.getEndpoint({ id: remote});

	    // grab the text to send
	    var messageText = $("#textToSend").val();

	    // send it
	    endpoint.sendMessage({ message : messageText });
	});

	// Create a call
	$("#makeCall").click(function () {
	    var endpoint = client.getEndpoint({ id: $("#remoteId").val()});
	    call = endpoint.startAudioCall();
	});

	// Hang up the call
	$("#endCall").click(function () {
	    if (call) {
	    	call.hangup();
	    	call = null;
	    }
	});

<br />

[Now you're ready for video!](/js-library/video-chat.html)
