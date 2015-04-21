---
title: "Messaging (1:1) - Respoke JavaScript Library"
shortTitle: "Messaging (1:1)"
date: 2015-04-20
template: article.jade
showInMenu: "true"
menuOrder: 60
meta:
    keywords: "respoke, endpoint, messaging"
    description: "Learn how to send indiviudal endpoint messages using Respoke"
---

###JavaScript Library
# Messaging (1:1)

## Overview

Sending 1:1 messages to individual users is easy using Respoke. First connect to Respoke either in [development mode](/client/javascript/getting-started.html) or [authenticated](/client/javascript/guide/authentication.html).

## Send Indiviual Message

Next, get the endpoint you want to message

    var endpoint = client.getEndpoint({
        id: "kirk@enterprise.com"
    });

Finally, send a message to the individual.

    // The message can be simple text
    endpoint.sendMessage("Live Long and Prosper");
    
    // Or the message can be a complex object literal
    endpoint.sendMessage({ 
        message: {
            name: "Spock",
            rank: "Captain, retired",
            serialNumber: "S179-276SP",
            birthYear: "2230",
            placeOfBirth: "Shi'Kahr, Vulcan",
            education: "Starfleet Academy, 2249-53"
        } 
    });