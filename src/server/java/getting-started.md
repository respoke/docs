---
title: "Getting Started - Developing with Java and Respoke"
shortTitle: "Getting Started"
date: 2014-10-15
template: article.jade
showInMenu: "true"
menuOrder: 10
meta:
    keywords: "respoke, Java, webrtc"
    description: "Guide on how to get started developing with Java and Respoke."
---

### Java Library
# Getting Started

## Overview

The Respoke Java library provides a convenient way for Node developers to interface with Respoke for non-browser-to-browser communication tasks. Good examples of non-browser-to-browser communication tasks include authentication.

## Install Respoke Java

Install Respoke as a local application dependency using [Maven](http://search.maven.org/#search%7Cga%7C1%7Crespoke):

    <dependency>
        <groupId>com.digium.respoke</groupId>
        <artifactId>respoke-java</artifactId>
        <version>1.0.0</version>
    </dependency>
    
Install Respoke's Java Library to your project using [Gradle](https://gradle.org/).

    dependencies {	
    	compile "com.digium.respoke:respoke-java:1.0.0"
    }
    
## Create Respoke

Finally, create an instance of Respoke:

    import com.digium.respoke.*;

    Respoke client = new Respoke();

That's it! Now we're ready to start using all this Respoke server library has to offer.
    