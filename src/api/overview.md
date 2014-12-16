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

**Please note that all REST routes require the header
`Content-Type: application/json`.**

## Node.js API Wrapper Library

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

