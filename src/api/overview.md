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

## Respoke API Wrapper Libraries

<ul class="accordion-tabs-minimal">
  <li class="tab-header-and-content">
    <a href="#" class="tab-link is-active">Node.js</a>
    <div class="tab-content">
      <p>
        <ul>
          <li>[Documentation](http://respoke.github.io/node-respoke-admin)</li>
          <li>[Source](https://github.com/respoke/node-respoke-admin)</li>
        </ul>
      </p>
      <h3>Installing</h3>
      <pre><code class="lang-sh">
        # from the root of your project install respoke-admin
        npm install --save respoke-admin
      </code></pre>

      <h3>Usage</h3>
      <pre><code class="lang-js">
        var Respoke = require('respoke-admin');

        var respoke = new Respoke({
          'App-Secret': appSecret
        });
      </code></pre>
    </div>
  </li>
</ul>
