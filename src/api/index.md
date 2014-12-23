---
title: "API Overview"
shortTitle: "Overview"
date: 2014-12-08
template: article.jade
showInMenu: "true"
linkUrl: "/api/"
menuOrder: 0
---

# API Overview

Respoke is powered by a RESTful API which can be accessed via normal HTTP requests or web sockets.
Some routes are restricted to one of these formats only.

Below is a list of wrapper libraries that we provide which will simplify working with our API.
Respoke wrappers are all open source projects. We encourage community contributions and
accept pull requests from community members.

###### Note when making requests to the API

All routes **require the header** `Content-Type: application/json`.

## Node.js API Wrapper Library

[Documentation](http://respoke.github.io/node-respoke-admin)</li>

[Source](https://github.com/respoke/node-respoke-admin)</li>

### Installation

```bash
# from the root of your project install respoke-admin
npm install --save respoke-admin
```

### Usage

```javascript
var Respoke = require('respoke-admin');

var respoke = new Respoke({
  'App-Secret': appSecret
});
```
