---
title: "createClient"
shortTitle: "createClient"
date: 2015-04-14
template: article.jade
showInMenu: "true"
menuOrder: 0
meta:
    keywords: "respoke, createClient"
---


#respoke.createClient
###returns [Client]()

##Description

This method creates a new `Client` object which represents the user's connection to your Respoke app.

##Usage
```
respoke.createClient(obj);
```

###Parameters
The `createClient` method accepts a single Object with the following properties

Name 			| Type 			    | Description 
------------ 	| ------------- 	| -------------
appId | String |
baseURL | String |
token | String |
presence | String, Number, Object, Array | The initial presence to set once connected. |
developmentMode=false | Boolean | Indication to obtain an authentication token from the service. Note: Your app must be in developer mode to use this feature. This is not intended as a long-term mode of operation and will limit the services you will be able to use. | 
reconnect=false | Boolean | Whether or not to automatically reconnect to the Respoke service when a disconnect occurs. | 
enableCallDebugReport=true | Boolean	 | Optional flag defaulting to true which allows sending debugging information. | 
[onConnect]() | Function | Callback for when the Client succesfully connects to Respoke.
onSuccess | Function | Success handler for this invocation of this method only. | 
onError | Function | Error handler for this invocation of this method only. | 
onJoin | Function | Callback for when this client's endpoint joins a group. | 
onLeave | Function | Callback for when this client's endpoint leaves a group. | 
onMessage | Function | Callback for when any message is received from anywhere on the system. | 
onDisconnect | Function | Callback for Client disconnect. | 
onReconnect | Function | Callback for Client reconnect. Not Implemented. | 
onCall | Function | Callback for when this client's user receives a call. | 
onDirectConnection | Function | Callback for when this client's user receives a request for a direct connection. | 



##Examples

####Connecting to Respoke in Development Mode
Some further information about the example here.

```
 var client = respoke.createClient({
     appId: "XXXXXXX-my-app-id-XXXXXX",
     developmentMode: true,
     endpointId: "joe",
     onConnect: function () {
     	console.log('connected to respoke!');
     },
     onError: function () {
     	console.error('Connection to Respoke failed.', err);
     }     
 });

 client.connect();
```

####Connecting to Respoke Using Brokered Authentication
Some further information about the example here.

```
var client = respoke.createClient();

 client.listen('connect', function () {
     console.log('connected to respoke!');
 });

 client.listen('error', function (err) {
     console.error('Connection to Respoke failed.', err);
 });

 // Respoke auth token obtained by your server.
 // This is how you control who can connect to Respoke app.
 // See API docs for POST [base]/tokens
 var tokenId = "XXXX-XXXX-brokered-auth-token-XXXXX";

 // connect to respoke with the token
 client.connect({
     token: tokenId
 });

 // fetch a new token from your server if it expires
 client.listen('disconnect', function (evt) {
     // fetch another token from your server.
     var newTokenId = "XXXX-XXXX-brokered-auth-token2-XXXXX";
     client.connect({
         token: newTokenId
     });
 });
```
