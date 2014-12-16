---
title: "Log messages in Respoke.js"
shortTitle: "Logs"
date: 2014-07-04
template: article.jade
showInMenu: "true"
menuOrder: 4
---

# Log messages in Respoke.js

Respoke has debug logs turned on by default. A logging utility is attached at `respoke.log`.

To **disable** Respoke's logging:

	respoke.log.disableAll();

<br />

Other available `respoke.log` methods:

	respoke.log.setLevel('trace');
	respoke.log.setLevel('debug');
	respoke.log.setLevel('info');
	respoke.log.setLevel('warn');
	respoke.log.setLevel('error');

	respoke.log.enableAll();
