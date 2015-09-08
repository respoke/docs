---
title: "Getting Started - Developing with Asterisk and Respoke"
shortTitle: "Getting Started"
date: 2014-10-15
template: article.jade
showInMenu: "true"
menuOrder: 0
meta:
    keywords: "respoke, asterisk, chan_respoke, webrtc"
    description: "Guide on how to connect to Respoke to Asterisk for WebRTC and web app calling features."
---

### Asterisk Channel Driver

# Getting Started - Developing with Asterisk and Respoke

## Summary

In the course of your app development, you may find it convenient to place calls from or into your [Asterisk](http://asterisk.org/) phone system. Asterisk's [Respoke module](https://github.com/respoke/chan_respoke) makes it possible to use the WebRTC features of Respoke together with Asterisk. This tutorial covers making calls from a web app into Asterisk.

### Assumptions

1. You have a Respoke app with an app secret.
1. You have an Asterisk server (version 13+) on which you have administrative access.
1. You are comfortable compiling and configuring Asterisk.

## Setup Asterisk and The Respoke Channel

### 1: Install Asterisk 13

Install [Asterisk 13](http://www.asterisk.org/downloads). How to install Asterisk is outside the scope of this document, but if Asterisk is not already installed and you are unsure how to proceed see the [Asterisk wiki](https://wiki.asterisk.org/wiki/display/AST/Installing+Asterisk) for more information. Also [install pjproject](https://wiki.asterisk.org/wiki/display/AST/Building+and+Installing+pjproject). You will need `pjproject` in order to build `res_rtp_asterisk`, which is necessary for chan_respoke.

You can find other notes about compiling and installing pjproject and Asterisk [in the chan_respoke README](https://github.com/respoke/chan_respoke/blob/master/README.md).

### 2: Install the Respoke Asterisk module

Once Asterisk has been installed on your server, download [the Respoke Asterisk module from GitHub](https://github.com/respoke/chan_respoke). Enter into the chan_respoke directory and issue the following command with superuser access. See the included README file for more information.

```bash
$ git clone https://github.com/respoke/chan_respoke.git
$ cd chan_respoke
$ make && sudo make install
```

### 3. Set up TLS keys for connecting securely to Respoke

Next, make a self-signed certificate for use with Respoke. You may have to use `sudo` to write the keys out, but remember that you shouldn't run Asterisk as root. Note that if you use the `ast_tls_cert` script in Asterisk's `contrib/scripts` directory, it may generate a larger cert, that can encounter IP fragementation problems when used with WebRTC.

```bash
# From the chan_respoke source directory
$ sudo make install-keys
```

### 4. Configure the Respoke module for Asterisk

Create a "respoke.conf" file under /etc/asterisk (or wherever your Asterisk configuration files are installed) and add the following settings. These settings allow anonymous access into Asterisk from the configured Respoke app. Incoming offers, for instance, are passed into the dialplan (default context) where they are accepted or rejected based upon configured extensions.

```ini
[transport]
type=transport
protocol=socket.io

[app]
type=app
app_secret=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXXX ;Respoke app secret

[endpoint_t](!) ; template for endpoints below
type=endpoint
transport=transport
app=app
context=default
disallow=all
allow=ulaw
dtls_verify=fingerprint
dtls_cert_file=/etc/asterisk/keys/respoke.pem
dtls_setup=actpass
turn=yes

[anonymous](endpoint_t)
register=no

[sales](endpoint_t) ; put your desired Respoke endpoint id in the square brackets

[support](endpoint_t) ; put your desired Respoke endpoint id in the square brackets
```

### 5. Configure Asterisk Call Support

After adding the respoke.conf file, the rest of the setup follows a typical Asterisk call configuration setup. In this example we want to be able to dial two SIP phones, one for "sales" and one for "support". Add the following to pjsip.conf:

```ini
[transport]
type=transport
protocol=udp
bind=0.0.0.0

[endpoint_t](!)
type=endpoint
transport=transport
context=default
direct_media=no
disallow=all
allow=ulaw

[aor_t](!)
type=aor
max_contacts=1

[sales](aor_t)
contact= ; the sales phone sip uri

[sales](endpoint_t)
aors=sales

[support](aor_t)
contact= ; the support phone sip uri

[support](endpoint_t)
aors=support
```

Be sure to add the appropriate sip uri for each contact (sales and support). Now add the extensions to the dialplan's default context in extensions.conf:

```ini
[general]

[default]
exten => sales,1,Answer()
    same => n,Set(remoteEndpointId=${CHANNEL(remote)})
    same => n,NoOp(${remoteEndpointId})
    same => n,Echo()
    same => n,Hangup
```

That should be it!  Asterisk should now be ready to participate in a basic Respoke click to call scenario.

### 6. Call your new Asterisk endpoint.

All that's left to be done is to set up your web app to call your new Asterisk endpoint.

Put this in your HTML:

```html
<script type='text/javascript' src='https://cdn.respoke.io/respoke.min.js'></script>
```

And use this JavaScript, which will call the "sales" endpoint.

```javascript
var client = respoke.createClient({
    endpointId: "bob",
    appId: "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXXX",
    developmentMode: true
});

client.connect({
    onSuccess: function () {
        // call Asterisk
        client.startAudioCall({
            endpointId: "sales"
        });
    }
});
```
