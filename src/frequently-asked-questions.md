---
title: "Frequently asked questions"
shortTitle: "FAQ"
date: 2014-12-03
template: article.jade
showInMenu: "true"
menuOrder: 4
meta:
    keywords: "respoke, webrtc, javascript, FAQs, endpoint, precense, connection, media relay, TURN"
    description: "Frequently asked questions: Respoke documentation for developers." 
---

# Frequently asked questions

## What is an *endpoint* in Respoke?

Each connection ties into an **endpoint**. The endpoint controls **identity** - *who* or *what*
is at the far end of the connection) and **permissions** (what the connection is allowed to do).

When sending messages, you will address them to the endpoint using a unique identifier called,
predictably, an `endpointId`.

Any message sent to that endpoint will be delivered to all of its connections. This make it easy
to handle scenarios where the same person, device or other logical entity has **multiple connections**.

Imagine a user logged in from several devices or a security system with several internet-connected sensors. In either situation the endpoint represents the primary concern - the user or the home - while the individual connections represent

Respoke also synchronizes outgoing messages between all active connections on an endpoint. When an
endpoint sends a message, copies of that message are sent to all of the other connections.

There may be some use cases where you need to send a message to a specific connection on an
endpoint. No worries - the API supports that too.


## What is *presence*?

**Endpoints have presence**. Presence is a piece of JSON that follows around an endpoint.

As an endpoint, you can can subscribe to presence updates from other endpoints.

When an endpoint's last connection terminates, the other endpoints who are subscribed to its
presence receive an event indicating the endpoint is offline (`"unavailable"`).

## What is a *direct connection*?

Direct connections are **encrypted peer-to-peer connections between browsers**. Messages sent over a
direct connection do not use the Respoke messaging infrastructure. The messages flow directly
from the sender to the recipient.

Because the connection is direct, the latency (the time between the sending and receiving of
the message) is incredibly low.

## What does *concurrent connections* mean?
Each Respoke plan includes a maximum number of concurrent connections. When your application
creates a Respoke client instance and invokes the "connect()" method, the client establishes a
web socket connection to the Respoke service. We keep track of the number of web sockets
connected using your Respoke account.

If you have 10 clients connected to Respoke at one time, you have 10 concurrent connections.
If your plan includes 20 concurrent connections you will only be able to connect a total of
20 clients.

###### Exceeding your account connection limit - overages
Any requests to connect to Respoke once the connection limit has been reached will
respond with an HTTP status code `401 Not Authorized`.

## What does *media relay* mean?
When you make a call using Respoke, we attempt to send the media (audio and video) directly between
the two parties involved.

Most of the time, this peer-to-peer direct audio or video connection works properly.
Sometimes (roughly 15% of the time for desktop and up to 70% of the time for mobile) a direct
path cannot be established because of network issues. Certain NAT devices, firewalls and
mobile network configurations make it impossible to route the media directly.

When a peer-to-peer connection cannot be established, Respoke provides a backup connection
using our network of media relay servers (aka TURN servers). The relay servers act as bridges,
allowing media to reach otherwise unreachable destinations.

## How is media relay usage measured?

Media relay usage is metered in terms of bandwidth - the number of bytes of media that flow
through the server.

Each Respoke plan includes a set amount of media relay bandwidth.
For example, our free plan includes 1 GB (1,024 MB or 1,073,741,824 bytes) of media relay.

If you consume all of the bandwidth included with your plan, Respoke will disable media relay
services until your next monthly renewal date. Since this can cause calls to fail (15% to 70% of
the time), we will send you a notification.

###### Example media relay calculations
A single **audio stream** normally takes between 0.25 and 0.5 MB per minute.

A single **video stream** normally takes between 5 and 20 MB per minute.
