---
title: "Getting Started - Developing with PHP and Respoke"
shortTitle: "Getting Started"
date: 2014-10-15
template: article.jade
showInMenu: "true"
menuOrder: 10
meta:
    keywords: "respoke, PHP, webrtc"
    description: "Guide on how to get started developing with PHP and Respoke."
---

###PHP Library
# Getting Started

## Overview

The Respoke PHP Library provides a convenient way for PHP developers to interface with Respoke for non-browser-to-browser communication tasks. Good examples of non-browser-to-browser communication tasks include authentication.

First validate you have PHP 5.3.* or greater installed.

## Install Respoke PHP

Install Respoke as a local application dependency using [composer](https://getcomposer.org/):

    composer require respoke/respoke
    
## Create Respoke

Finally, create an instance of Respoke:

    use Respoke\Client;

    $client = new Respoke\Client();

That's it! Now we're ready to start using all this Respoke server library has to offer.