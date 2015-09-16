---
title: "Getting Started - Developing with .NET and Respoke"
shortTitle: "Getting Started"
date: 2014-10-15
template: article.jade
showInMenu: "true"
menuOrder: 10
meta:
    keywords: "respoke, .NET, webrtc"
    description: "Guide on how to get started developing with .NET and Respoke."
---

### .NET Library
# Getting Started

## Overview

The Respoke .NET library provides a convenient way for Node developers to interface with Respoke for
non-browser-to-browser communication tasks. Good examples of non-browser-to-browser communication tasks include
authentication.

## Install Respoke .NET

Install Respoke as a local application dependency by git cloning dotnet-respoke-admin:

    git clone https://github.com/ruffrey/dotnet-respoke-admin.git

## Create Respoke

Finally, create an instance of Respoke:

    using Respoke;

    RespokeClient respoke = new RespokeClient();

That's it! Now we're ready to start using all this Respoke server library has to offer.
