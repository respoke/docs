---
title: "Phone Numbers - Respoke Dashboard"
shortTitle: "Phone Numbers"
date: 2015-04-20
template: article.jade
showInMenu: "true"
menuOrder: 30
meta:
    keywords: "respoke, dashboard, apps, account, phone numbers"
    description: "Learn how to use the dashboard section of the Respoke Dashboard."
---

### Respoke Dashboard
# Phone Numbers

## Overview

In order to [place calls](/client/javascript/guide/phone-calling.html) to a phone number, your endpointId must
[authenticate](/client/javascript/guide/authentication.html) using a role which has PSTN (phone) calling enabled.

## Enabling Phone Calling Features

First, specify a phone number or group of phone numbers that the endpoint is allowed to call. Alternatively, you can
specify "*" to allow calling to any phone number.

![allowed pstn out phone numbers](../images/allow-pstn-out-numbers.png)

Next, choose a phone number from the "Phone Numbers" section.

![phone numbers](../images/phone-numbers.png)

Finally, assign the phone number to an App Role.

![phone number caller id](../images/pstn-caller-id.png)

That's it. You're all set to call phone numbers and display callerId for outgoing phone calls.
