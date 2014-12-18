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

## Usage

### Option 1: add the CDN script to your HTML

```javascript
<script src="https://cdn.respoke.io/respoke.min.js"></script>
```

### Option 2: choose a specific CDN version

Go to the [Respoke CDN file listing](https://cdn.respoke.io/list.html) and choose one of the
versions.

```javascript
<script src="https://cdn.respoke.io/respoke-vMAJOR.MINOR.PATCH.min.js"></script>
```

### Option 3: include the NPM package

Using a tool like Browserify or Webpack, you can `require` Respoke.js from **npm**.

In a terminal at the root of your app:
```bash
npm install respoke
```

In your application JavaScript:
```javascript
var respoke = require('respoke');
```

### Option 4: build Respoke.js from source

```bash
git clone https://github.com/respoke/respoke respoke-js
cd respoke-js
npm install
npm run build
```

The file will be at `./respoke.min.js`.
