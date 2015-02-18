---
title: "Log messages in Respoke.js"
shortTitle: "Log and debug config"
date: 2015-2-17
template: article.jade
showInMenu: "true"
menuOrder: 4
---

# Log messages in Respoke.js

Respoke has debug logs turned on by default. By default, it will only write to the console if there are
warnings or errors.

The logging utility is attached at `respoke.log`.

## Disable all logs

To **disable** Respoke's logging, put the following code in your client-side app:

	respoke.log.disableAll();

<br />

## Change log level

You can set the log level to any of the following log levels:

	respoke.log.setLevel('error');
	respoke.log.setLevel('warn');
	respoke.log.setLevel('info');
	respoke.log.setLevel('debug');
	respoke.log.setLevel('trace');

or enable everything:

	respoke.log.enableAll();

## Debug logs

Turning on debug logs will give you a window into the complex negotiation process that Respoke
handles for you.

Enabling verbose logs from respoke.js may be helpful to determine if your client application is
not working properly. Nearly all of the respoke.js events and objects are printed to the console
so you can see, line by line, how thinks work.
