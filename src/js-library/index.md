---
title: "How to setup Respoke.js"
shortTitle: "Overview"
date: 2014-12-18
template: article.jade
showInMenu: "true"
linkUrl: "/js-library/"
menuOrder: 0
---

# Respoke.js

Respoke.js is a client side JavaScript client for using Respoke in HTML5 web applications.

## Source code

[Respoke.js is open source on GitHub](https://github.com/respoke/respoke).

## Setup

### Option 1: add the CDN script to your HTML

```html
<script src="https://cdn.respoke.io/respoke.min.js"></script>
```

### Option 2: choose a specific CDN version

Go to the [Respoke CDN file listing](https://cdn.respoke.io/list.html) and choose one of the
versions.

```html
<script src="https://cdn.respoke.io/respoke-vMAJOR.MINOR.PATCH.min.js"></script>
```

### Option 3: include the NPM package

Using a tool like Browserify or Webpack, you can `require` Respoke.js from
[npm][https://www.npmjs.com/package/respoke].

In a terminal at the root of your app:
```bash
npm install --save respoke
```

In your application JavaScript:
```javascript
var respoke = require('respoke');
```

### Option 4: install with Bower

We provide a pre-built version of Respoke.js on GitHub that can be installed
using [Bower](http://bower.io). The sourcemap files are included as separate
files for use in debugging with developer tools.

```bash
bower install --save respoke
```

Then in your html include the Respoke.js script.

```html
<script type="text/javascript" src="/components/respoke/respoke.min.js"></script>
```

### Option 5: build Respoke.js from source

```bash
git clone https://github.com/respoke/respoke respoke-js
cd respoke-js
npm install
npm run build
```

The file will be at `./respoke.min.js`.

## How to use Respoke.js

* [Text chat and audio calling](/js-library/audio-chat.html)
* [Video calling](/js-library/video-chat-html)

**[Even more examples](/js-library/example-apps.html)**
