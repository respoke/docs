---
title: "connect"
shortTitle: "connect"
date: 2015-04-14
template: article.jade
showInMenu: "true"
menuOrder: 0
meta:
    keywords: "respoke, connect"
---

#connect

##Description

This event is fired the first time the `Client` connects to Respoke.

##Usage
```
function onConnectHandler( event ) {
	console.log("Connected to Respoke!");
}
```

###Parameters
The `connect` event returns an Object with the following properties

Name 			| Type 			    | Description 
------------ 	| ------------- 	| -------------
name | String | The name of the event
target | Client | Reference to the Respoke Client Object that initiated the request to connect.



##Examples

####Using an Event Handler
Some further information about the example here.

```
 var client = respoke.createClient({
     appId: "XXXXXXX-my-app-id-XXXXXX",
     developmentMode: true,
     endpointId: "joe",
     onConnect: function (event) {
     	console.log('connected to respoke!');
     }    
 });

 client.connect();
```

####Using an Event Listener
Some further information about the example here.

```
var client = respoke.createClient({
     appId: "XXXXXXX-my-app-id-XXXXXX",
     developmentMode: true,
     endpointId: "joe"    
 });

 client.addListener('connect', onConnectHandler);
 
 function onConnectHandler( event ) {
 	console.log('connected to respoke!');
 };
 
 client.connect();
```
