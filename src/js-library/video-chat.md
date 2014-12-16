---
title: "Build a video chat app"
shortTitle: "Video chat"
date: 2014-03-11
template: article.jade
showInMenu: "true"
menuOrder: 1
---

# Build a video chat app


Leveraging the power of Respoke, you can make a 100% client-side video chat app in minutes. This tutorial uses development mode for ease of development, but all apps should be converted to using [brokered authentication](/tutorials/brokered-auth.html) before being published.

*This examples uses [Angular.js](http://angularjs.org).*

<div class="alert alert-info">
	Make sure you have an app ID handy. [Respoke dev console &raquo;](https://portal.respoke.io/#apps)
</div>


### Step One: Setup

Include some scripts.

	<!-- Respoke client library -->
	<script src="https://cdn.respoke.io/respoke.min.js"></script>

	<!-- Angular.js, used in this example -->
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0-beta.13/angular.min.js"></script>

Setup Angular in your HTML.

	<html ng-app>

And make a controller with some variables you'll need soon.

	function RespokeController($scope) {

		$scope.activeCall = null;

		$scope.username = "";
		$scope.friendId = "";

	}


Then reference your controller in the HTML. All of your HTML will go inside this div.

	<div ng-controller="RespokeController">

	</div>

### Step Two: Pick a username and connect to your Respoke app

Add a place to indicate you are connected.

	<h3 ng-show="client.isConnected()">
		Connected as \{\{username\}\} {{}}
	</h3>

You'll need an input box for the username, and a button that calls `connect()`.

	<div ng-show="!client.isConnected()">
		<input placeholder="My Username" ng-model="username" type="text" autofocus />
		<button ng-click="connect()">Connect</button>
	</div>

Before you can connect as a specific username, you must create a respoke client.

	$scope.client = respoke.createClient({
	    appId: "2a56901d-78ca-4436-b698-4a7a66cdc1fc", // your app ID goes here
	    baseURL: "https://api.respoke.io",
	    developmentMode: true
	});

	// Listen for the 'connect' event, and update the interface
	$scope.client.listen('connect', function () {
		$scope.$apply();
	});

Here's the button click event for connecting with your username.

	$scope.connect = function () {
		$scope.client.connect({
			endpointId: $scope.username
		});
	};

Now you can connect and it will update the UI when it's successful.

### Step Three: Video Calling

Add some HTML for inputting the username of the person you'd like to call.

	<div ng-show="client.isConnected()">
		<input placeholder="User to call" ng-model="friendId" type="text" autofocus ng-show="!activeCall" />
		<button ng-click="call()" ng-show="!activeCall">Call</button>
		<button ng-click="hangup()" ng-show="activeCall">Hang up</button>
	</div>

When a call connects, there must be a place to insert the `<video>`.

	<!-- the person you called -->
	<div id="remoteVideoSource"></div>

	<!-- you -->
	<div id="localVideoSource"></div>

Make sure your video has some style.

	#localVideoSource video{
		height: 100px;
		margin: -130px 0 0 20px;
		position: absolute;
	}

Respoke constructs a `<video>` element for you. `setVideo` is a function to update the UI.

	function setVideo(elementId, videoElement) {
		var videoParent = document.getElementById(elementId);
		videoParent.innerHTML = "";
		videoParent.appendChild(videoElement);
	}

Throw the call options in an object. `setVideo` is called inside the callbacks.

	var callOptions = {
    	constraints: {audio: true, video: true},

    	// your video
    	onPreviewLocalMedia: function(evt) {
    		setVideo('localVideoSource', evt.element)
    	},
    	// your video
    	onLocalMedia: function(evt) {
    		setVideo('localVideoSource', evt.element)
    	},

    	// their video
    	onConnect: function(evt) {
    		setVideo('remoteVideoSource', evt.element)
    	}

    };


Your friend is an endpoint. Calling them is simple: just invoke `startVideoCall` on their endpoint.

	$scope.call = function () {
		var recipientEndpoint = $scope.client.getEndpoint({ id: $scope.friendId });
		$scope.activeCall = recipientEndpoint.startVideoCall(callOptions);
	};

	// provide a way to escape
	$scope.hangup = function () {
		$scope.activeCall.hangup();
		$scope.activeCall = null;
	};

Finally, set an event listener for the call.

	$scope.client.listen('call', function(evt) {
	    $scope.activeCall = evt.call;

	    if ($scope.activeCall.caller !== true) {
	        $scope.activeCall.answer(callOptions);

	        // The hangup event indicates the call is over
	        $scope.activeCall.listen('hangup', function () {
	        	$scope.activeCall = null;
	        	$scope.$apply();
	        });
	    }
		$scope.$apply();
	});


### The Entire Burrito

[See it in action &raquo;](video-chat-example.html)

[Fiddle with it &raquo;](http://jsfiddle.net/ruffrey/Kfp47/1/)


	<!doctype html>
	<html ng-app>
		<head>
			<!-- Respoke client library -->
			<script src="https://cdn.respoke.io/respoke.min.js"></script>

			<!-- Angular.js for this example -->
			<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0-beta.13/angular.min.js"></script>

			<style type="text/css">
				#localVideoSource video{
					height: 100px;
					margin: -130px 0 0 20px;
					position: absolute;
				}
			</style>

			<script>

				function setVideo(elementId, videoElement) {
					var videoParent = document.getElementById(elementId);
					videoParent.innerHTML = "";
					videoParent.appendChild(videoElement);
				}

				function RespokeController($scope) {

					$scope.activeCall = null;

					$scope.username = "";
					$scope.friendId = "";

					var callOptions = {
				    	constraints: {audio: true, video: true},

				    	onPreviewLocalMedia: function(evt) {
				    		setVideo('localVideoSource', evt.element)
				    	},
				    	onLocalMedia: function(evt) {
				    		setVideo('localVideoSource', evt.element)
				    	},

				    	onConnect: function(evt) {
				    		setVideo('remoteVideoSource', evt.element)
				    	}

				    };


					$scope.client = respoke.Client({
					    appId: "2a56901d-78ca-4436-b698-4a7a66cdc1fc",
					    baseURL: "https://api.respoke.io",
					    developmentMode: true
					});

					// Listen for the 'connect' event
					$scope.client.listen('connect', function () {
						$scope.$apply();
					});

					// Listen for the 'call' event
					$scope.client.listen('call', function(evt) {

					    $scope.activeCall = evt.call;

					    if ($scope.activeCall.caller !== true) {
					        $scope.activeCall.answer(callOptions);
					        $scope.activeCall.listen('hangup', function () {
					        	$scope.activeCall = null;
					        	$scope.$apply();
					        });
					    }
						$scope.$apply();
					});


					$scope.connect = function () {
						$scope.client.connect({
							endpointId: $scope.username
						});
					};

					$scope.call = function () {
						var recipientEndpoint = $scope.client.getEndpoint({ id: $scope.friendId });
						$scope.activeCall = recipientEndpoint.startVideoCall(callOptions);
					};

					$scope.hangup = function () {
						$scope.activeCall.hangup();
						$scope.activeCall = null;
					};

				}

			</script>

		</head>
		<body>
			<div ng-controller="RespokeController">

				<h3 ng-show="client.isConnected()">
					Connected as \{\{username\}\} {{}}
				</h3>

				<div ng-show="!client.isConnected()">
					<input placeholder="My Username" ng-model="username" type="text" autofocus />
					<button ng-click="connect()">Connect</button>
				</div>

				<div ng-show="client.isConnected()">
					<input placeholder="User to call" ng-model="friendId" type="text" autofocus ng-show="!activeCall" />
					<button ng-click="call()" ng-show="!activeCall">Call</button>
					<button ng-click="hangup()" ng-show="activeCall">Hang up</button>
				</div>

				<div id="remoteVideoSource"></div>
				<div id="localVideoSource"></div>

			</div>
		</body>
	</html>
