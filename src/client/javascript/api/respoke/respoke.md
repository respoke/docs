---
title: "respoke"
date: 2015-04-14
template: article.jade
showInMenu: "false"
menuOrder: 0
meta:
    keywords: "respoke"
---

#respoke
Defined in: [respoke.js](https://github.com/respoke/respoke/blob/master/respoke/respoke.js)

The `respoke` object is the base object of the Respoke JavaScript client library. A single global instance is created automatically when the library loads. Applications use the `respoke` object to create instances of the [`client`](http://docs.respoke.io/js/client/client.md) object and to check the functionality of the browser platform. 


#Properties

Name 			| Value 			| Description   | Notes
------------ 	| ------------- 	| ------------- | -------------
version <a id="version"></a> | string | Returns the version of the Respoke client library
clients <a id="clients"></a> | Array | An array representing all active [client](https://docs.respoke.io/js-library/respoke.Client.html) objects. 


#Methods

Name         | Description
------------ | -------------
[createClient](https://docs.respoke.io/js-library/respoke.Client.html) | Creates and returns a [client](https://docs.respoke.io/js-library/respoke.Client.html) object.
hasMessaging | Whether or not the browser supports messaging.
hasCalling | Whether or not the browser supports Respoke audio and video calling.
hasDirectConnection | Whether or not the browser supports peer-to-peer data connections.
hasScreenSharing | Whether or not the browser supports screen sharing and if the appropriate browser plugin is installed.
hasDirectConnection | Whether or not the browser supports peer-to-peer data connections.


# Events

The `respoke` object does not raise any events.

Name 			| Description 		
------------ 	| ------------- 	
version <a id="version"></a> | string | Returns the version of the Respoke client library
clients <a id="clients"></a> | Array | An array representing all active [client](https://docs.respoke.io/js-library/respoke.Client.html) objects. 