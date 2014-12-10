---
title: "Frequently Asked Questions"
shortTitle: "FAQ"
date: 2014-12-03
template: article.jade
showInMenu: "true"
menuOrder: 1
---

# Frequently Asked Questions

### What does "concurrent connections" mean?
Each Respoke plan includes a maximum number of concurrent connections. When your application creates a Respoke client
and invokes the "connect()" method, the client establishes a WebSocket connection to the Respoke service. We keep track
of the number of WebSockets connected using your Respoke account. If you have 10 clients connected to Respoke at one
time, you have 10 concurrent connections. If your plan includes 20 concurrent connections you will only be able to
connect a total of 20 clients. Any requests to connect to Respoke once the connection limit has been reached will
respond with an HTTP status code of 401 ("Not Authorized").

### What does "media relay" mean?
When you make a call using Respoke, we attempt to send the media (audio and video) directly between the two parties
involved. Most of the time this works properly. Sometimes (roughly 15% of the time for desktop and up to 70% of the
time for mobile) a direct path cannot be established because of network issues. Certain NAT devices, firewalls and
mobile network configurations make it impossible to route the media directly. In these cases, Respoke provides a backup
route using our network of media relay servers (aka TURN servers). The relay servers act as bridges, allowing media to
reach otherwise unreachable destinations.

Media relay usage is metered in terms of bandwidth - the number of bytes of media that flow through the server. Each
Respoke plan includes a set amount of media relay bandwidth. For example, our free Play plan includes 1 GB (1,024 MB
or 1,073,741,824 bytes) of media relay. Each audio stream takes between 0.25 and 0.5 MB per minute. Each video stream
takes between 5 and 20 MB per minute. If you happen to consume all of the bandwidth included with your plan, Respoke
will disable media relay services until your next monthly renewal date. Since this can cause calls to fail, we will
send you a notification if you exceed your monthly limit.
