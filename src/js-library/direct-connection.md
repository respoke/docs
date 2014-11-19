---
title: "Direct Connections"
date: 2014-04-24 10:10
template: article.jade
changefreq: monthly
---
# Using Direct Connections


Direct connections provide a way to send messages from one endpoint to another without going through Respoke's cloud infrastructure. This quick guide should help you build a **secure direct-messaging app** in about 10 minutes. This tutorial uses development mode for ease of development, but all apps should be converted to using [brokered authentication](/tutorials/brokered-auth.html) before being published.

### Assumptions

1. You have a Respoke account and an app ID.

### Step 1: HTML Scaffold

You can either use a real web server or something like [JSFiddle](http://jsfiddle.net). This is **strictly client-side** stuff (HTML, CSS and JavaScript) so you won't need any server-side tech.

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

We're using jQuery here, but you're welcome to use whatever library you prefer. Respoke has no dependencies.


*Pro Tip: If you're using JSFiddle, only add the stuff inside the &lt;body&gt; tag to the HTML panel, add jQuery using the Frameworks & Extensions box, and drop the Respoke library URL from the second &lt;script&gt; tag to the External Resources list.*

Add some optional CSS:

    body {
        font-family: Arial, Helvetica;
        margin-left: 25px;
    }

### Step 2: Connecting To Respoke

The first thing your client will need to do is connect to Respoke. All that takes is a 'client' object and an access token.

    // Put your app ID from the Respoke developer console here
    var appid = "dc0feacb-13c7-44c8-ad19-0acdd3c6a9dd";
    var directConnection = null;

    $("#sendMessage").attr('disabled', true);
    $("#closeDirectConnection").attr('disabled', true);
    $("#openDirectConnection").attr('disabled', true);

    // create a client object using the App ID
    var client = new respoke.Client({
        appId: appid,
        developmentMode: true
    });

    // listen for the 'connect' event
    client.listen('connect', function() {
        $("#status").html("Connected to Respoke!");
        $("#openDirectConnection").attr('disabled', false);
    });

    // now connect when the user clicks the 'Connect' button
    $("#doLogin").click(function() {
        var endpoint = $("#endpoint").val();
        client.connect({
             endpointId: endpoint
        });
    });

Once you have that in place, run it. You should see the page load with a "Not Connected" status.

Enter a name - whatever you want - in the User Name box and click the 'Connect' button. The status box should update to read "Connected To Respoke!", and the "Open Direct Connection" button will be enabled.

### Step 3: Opening a Direct Connection

Ok, so you're connected. Time to really have some fun.

Add a bit more to your HTML scaffold by replacing the whole body tag with the following:

    <body>
        <h3 id="status">Not Connected</h3>
        <div id="login">
            User Name:
            <input id="endpoint" type="text" />
            <input id="doLogin" type="button" value="Connect" />
        </div>
        <div id="messaging">
            <ul id="messages"></ul><br />
            Connect To:
            <input id="remoteId" type="text" /><br />
            <textarea id="textToSend" rows="2"></textarea><br />
            <input id='sendMessage' type='button' value='Send Message' />
            <input id='openDirectConnection' type='button' value='Open Direct Connection' />
            <input id='closeDirectConnection' type='button' value='Close Direct Connection' />
        </div>
    </body>

To start and stop a direct connection, add a button click listener that will initiate the direct connection and another one for closing it.

    // Open a direct connection
    $("#openDirectConnection").click(function() {
        var endpoint = client.getEndpoint({"id" : $("#remoteId").val()});
        directConnection = endpoint.startDirectConnection();
    });

    // Close a direct connection
    $("#closeDirectConnection").click(function() {
        if (directConnection) {
            directConnection.hangup();
            directConnection = null;
        }
    });

And add some code to accept a direct connection another endpoint has initiated.

    // listen for and answer incoming direct connections
    client.listen('direct-connection', function(evt) {
         directConnection = evt.directConnection;
         directConnection.accept();
         directConnection.listen('open', function() {
             $("#remoteId").val(evt.endpoint.id);
             $("#openDirectConnection").attr('disabled', true);
             $("#sendMessage").attr('disabled', false);
             $("#closeDirectConnection").attr('disabled', false);
         });
         directConnection.listen('close', function() {
             $("#openDirectConnection").attr('disabled', false);
             $("#sendMessage").attr('disabled', true);
             $("#closeDirectConnection").attr('disabled', true);
             directConnection = null;
         });
         // listen for incoming messages
         directConnection.listen('message', function(evt) {
            console.log('message', evt);
            $("#messages").append("<li>"+evt.message.message+"</li>");
        });
    });

Now when you type the name of another endpoint into the "Connect To" input box and click "Open Direct Connection", a direct connection will be initiated and automatically accepted by the other party.

You can test this in by opening your app in two different tabs and connecting with two different endpoint IDs. When the direct connection opens, the "Send Message" and "Close Direct Connection" buttons will become enabled. Your endpoint ID will be added to the other party's "Connect To" input box when the direct connection opens.

### Step 4: Sending Messages

To receive messages, add a listener to the client that formats the message and adds it to the screen.

	// listen for incoming messages
    client.listen('message', function(evt) {
        $("#messages").append("<li>"+evt.message.message+"</li>");
    });

To send a message, you just need to have a reference to the directConnection object, and use its [sendMessage()](/js-library/respoke.DirectConnection.html#sendMessage) method:

    // send a message to the far-end party
    $("#sendMessage").click(function(){
        if (!directConnection) {
            return;
        }

        // grab the text to send
        var messageText = $("#textToSend").val();

        // send it
        directConnection.sendMessage({"message" : messageText});
    });

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

<br />

#### **Test messaging**

Open the page in two different tabs. Log in using a different name on each.

Enter the name of the *other* login into the "Connect To" box.

Click "Open Direct Connection" and wait until the "Send Message" button is enabled.

Add a message and hit the "Send Message" button. The message should appear in the other users's messages box.


### The Whole Enchilada

Now you've got a very small app with secure, encrypted peer-to-peer messaging!

[Try it live &raquo;](http://jsfiddle.net/respoke/u0n1jc5o/)

### HTML

    <!DOCTYPE html>
    <html>
    <head>
    <meta name="description" content="Respoke Direct Connection Demo App" />
        <script type='text/javascript' src='http://code.jquery.com/jquery-2.1.0.min.js'></script>
        <script type='text/javascript' src='https://cdn.respoke.io/respoke.min.js'></script>
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
                Connect To:
                <input id="remoteId" type="text" /><br />
                <textarea id="textToSend" rows="2"></textarea><br />
                <input id='sendMessage' type='button' value='Send Message' />
                <input id='openDirectConnection' type='button' value='Open Direct Connection' />
                <input id='closeDirectConnection' type='button' value='Close Direct Connection' />
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

    var appid = "dc0feacb-13c7-44c8-ad19-0acdd3c6a9dd";
    var directConnection = null;
    $("#sendMessage").attr('disabled', true);
    $("#closeDirectConnection").attr('disabled', true);
    $("#openDirectConnection").attr('disabled', true);

    // create a client object using the App ID value from Step 2
    var client = new respoke.Client({
        appId: appid,
        developmentMode: true
    });

    // listen for the 'connect' event
    client.listen('connect', function() {
        $("#status").html("Connected to Respoke!");
        $("#openDirectConnection").attr('disabled', false);
    });

    // listen for incoming messages
    client.listen('message', function(evt) {
        $("#messages").append("<li>"+evt.message.message+"</li>");
    });

    // listen for and answer incoming direct connections
    client.listen('direct-connection', function(evt) {
         directConnection = evt.directConnection;
         directConnection.accept();
         directConnection.listen('open', function() {
             $("#remoteId").val(evt.endpoint.id);
             $("#openDirectConnection").attr('disabled', true);
             $("#sendMessage").attr('disabled', false);
             $("#closeDirectConnection").attr('disabled', false);
         });
         directConnection.listen('close', function() {
             $("#openDirectConnection").attr('disabled', false);
             $("#sendMessage").attr('disabled', true);
             $("#closeDirectConnection").attr('disabled', true);
             directConnection = null;
         });
         // listen for incoming messages
         directConnection.listen('message', function(evt) {
             $("#messages").append("<li>"+evt.message.message+"</li>");
         });
    });

    // now connect when the user clicks the 'Connect' button
    $("#doLogin").click(function() {
        var endpoint = $("#endpoint").val();
        client.connect({
             endpointId: endpoint
        });
    });

    // send a message to the far-end party
    $("#sendMessage").click(function(){
        if (!directConnection) {
            return;
        }

        // grab the text to send
        var messageText = $("#textToSend").val();

        // send it
        directConnection.sendMessage({"message" : messageText});
    });

    // Create a direct connection
    $("#openDirectConnection").click(function() {
        var endpoint = client.getEndpoint({"id" : $("#remoteId").val()});
        directConnection = endpoint.startDirectConnection();
    });

    // close the direct connection
    $("#closeDirectConnection").click(function() {
        if (directConnection) {
            directConnection.hangup();
            directConnection = null;
        }
    });

<br />

[Now you're ready for video!](/tutorials/video-chat.html)
