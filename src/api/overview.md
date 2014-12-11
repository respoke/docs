---
title: "Overview"
date: 2014-12-08
template: article.jade
showInMenu: "true"
menuOrder: 0
---

# Overview

Respoke is powered by a RESTful API. There are several ways you can interact
with it. Below is a list of wrapper libraries that we provide which will
simplify working with our API. These are all open source projects that you can
help contribute to.

For the full API reference please see the [RAML documentation][RAML].

[RAML]: https://raml.respoke.io

## Respoke API Wrapper Libraries

We currently provide a Node.js library for interacting with our API. More will
be coming soon!

- [Documentation](http://respoke.github.io/node-respoke-admin)</li>
- [Source](https://github.com/respoke/node-respoke-admin)</li>

### Installing

```sh
# from the root of your project install respoke-admin
npm install --save respoke-admin
```

### Usage

```js
var Respoke = require('respoke-admin');

var respoke = new Respoke({
  'App-Secret': appSecret
});
```

