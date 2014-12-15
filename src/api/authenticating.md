---
title: Authentication methods
date: 2014-12-12
template: article.jade
showInMenu: "true"
menuOrder: 1
---

# Authentication methods

There are **three ways to authenticate** to Respoke. Each provides a different level of permissions.

> *[Account admin] > [Application admin] > [Endpoint authentication]*

[Account admin]: #account-admin
[Application admin]: #application-admin
[Endpoint authentication]: #endpoint-authentication

## Account admin

For account level admin permissions you need to an `Admin-Token`.

{example: admin-sessions}

## Application admin

By using an `App-Secret` you gain application level permissions. `App-Secret`'s are
found in the [Dev Console](https://portal.respoke.io/#apps). By passing the
`App-Secret` header you can perform API calls to obtain Respoke sessions for
your users. Here is an example which uses the `App-Secret` to fetch a given
application's details.

{example: app-get}

## Endpoint authentication

To authenticate as a specific endpoint (user) you need to request an `App-Token`
to pass as a header in other requests. To do this you need to use either the
Account admin or Application admin method. This is a two step process where you request
a tokenId and use that to request the actual `App-Token` for use by the
endpoint. Note that you will often want to specify a role ID to set permissions
on what the endpoint is allowed to do.

{example: endpoint-authentication}
