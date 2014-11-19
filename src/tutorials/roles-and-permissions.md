---
title: "Roles & Permissions"
date: 2014-07-09
template: article.jade
changefreq: monthly
---

# Roles and Permissions

In [Brokered Authentication: Securing Your Application](/tutorials/brokered-auth.html), you learn how to secure your app by using tokens to create endpoints and authenticate your users to Respoke.

To secure your app even further, you can use roles to limit the types of things authenticated users can do.

<br />

### About Roles and Permissions

As your Respoke app grows, you may want your users to have permission to perform only specific actions against Respoke. In this section, you will learn how to **create Roles for your users and assign them to an endpoint** when authentication occurs.

<br />

#### Concepts

**Permissions** live in Respoke and **granularly govern what user may or may not do**, in Respoke.

**Permissions** are granted by your application on a **per-token** basis.


**Roles provide a way to group permissions**. They are created by you via your [dev console](https://portal.respoke.io/) or REST API.

<br />

#### Regarding Dev Mode

It's only a few lines of code to get started developing with Respoke in development mode. If you have successfully logged an endpoint into Respoke and sent a message, you're probably already using development mode. The [Respoke Quickstart Guide](/) details how to place your Respoke app in development mode, connect, and send messages.

In development mode Respoke automatically assigns your endpoints a default role. This system role includes a wide set of permissions which make app setup and testing easy.

The **development mode role** consists of the following permissions:
- ability to list all groups that have been created
- ability to join, leave, create, destroy, and publish to a group
- ability to list the members of all groups

<br />
**It's undesirable to run your app in development mode all the time.** As your app matures, you'll want to use roles to limit what your app can do depending on what type of user is authenticated as an endpoint. If you like, you can keep it simple and use a single role for many endpoints, but at least force users to authenticate to your server before letting them connect to Respoke.

<br />

#### How To Create Custom Roles

The real power in Roles comes from how you customize them to fit your needs.

1. Select the app you'd like this role to be associated with.
1. Custom roles require that your app is using [brokered auth](/tutorials/brokered-auth.html), so you may have to put your app out of development mode. Head over to your [dev console](https://portal.respoke.io/) to do that.
1. Create a new role. Give it a unique name, like "general web visitors".
1. Set some permissions.
    - toggle the ability to media relay services (so audio and video calls work in more complex network scenarios)
    - allow subscribing and unsubscribing from app administrative events
    - allow specific actions to be performed on groups of specific names
    - allow calling to regular telephone numbers by specifying a list of numbers in the form "+15558675309". Use "*" in the list to allow calling to all numbers.

*Configuring App Administrative Events*

Leaving this section blank will result in attempts to subscribe or unsubscribe to app events being refused.

    {
        "subscribe": false,
        "unsubscribe": false,
    }

*Configuring Groups Permissions*

Leaving this section blank will result in attempts to perform any of these actions on groups of any name being refused. For more information on how to construct these configurations, read on to the next section.

    {
        "list": true,
        "myGroupName": {
            "subscribe": false,
            "unsubscribe": false,
            "create": false,
            "destroy": false,
            "publish": false,
            "getsubscribers": false
        }
    }

<br />

#### How To Construct Permissions on a Group

Group permissions match a group's name against a permissions rule. You can create a rule with the exact name of the group, with a prefix and a wildcard, or with only a wildcard to match all group names. Respoke will take the most specific rule it can find based on the group's name and use that set of permissions.

*Example*

Assume you have the following group rules:
- `*`
- `admin`
- `buddylistroom*`
- `buddylistcontrol`

<br />
Your app sends a request for an endpoint using these rules to join the group `buddylistroom5`. Respoke will match that group name against the `buddylistroom*` rule and use the permissions attached to that rule to authorize the endpoint to join the group. If the app sends a request for an endpoint using these rules to join the group `testgroup`, Respoke will match on the wildcard rule `*` and use those permissions to determine if the endpoint is allowed to join.

Respoke uses the longest match paradigm, so for rules like `buddy*`, `buddylist*`, and `buddylistroom*`, a request to join `buddylistroom1` will only match the `buddylistroom*` rule.

<br />

### Create Roles Programmatically with Respoke's REST API

Eventually, you may need to create roles programmatically. You can do this with [Respoke's REST API](/reference/rest-api.html) using an App Secret or Admin-Token header.

Here's an example of how you could recreate the development mode role as a proper role.

<pre><code class="xml">POST http://api.respoke.io/v1/roles
Content-Type: application/json
App-Secret OR Admin-Token: 28B061B9-A0D4-4E52-A0ED-EB6EA125F82A</code></pre>


    {
        "appId": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
        "name": "development-mode",
        "mediaRelay": false,
        "events": {
            "subscribe": false,
            "unsubscribe": false,
        },
        "groups": {
            "list": true,
            "*": {
                "subscribe": true,
                "unsubscribe": true,
                "create": true,
                "destroy": true,
                "publish": true,
                "getsubscribers": true
            }
        }
    }

Here's how you could recreate the role listed above in the Create Custom Roles section.

<pre><code class="xml">POST http://api.respoke.io/v1/roles
Content-Type: application/json
App-Secret OR Admin-Token: 28B061B9-A0D4-4E52-A0ED-EB6EA125F82A</code></pre>

    {
        "appId": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
        "name": "general-visitor",
        "mediaRelay": true,
        "events": {
            "subscribe": false,
            "unsubscribe": false,
        },
        "groups": {
            "list": true,
            "*": {
                "subscribe": false,
                "unsubscribe": false,
                "create": false,
                "destroy": false,
                "publish": false,
                "getsubscribers": false
            },
            "admin": {
                "subscribe": false,
                "unsubscribe": false,
                "create": false,
                "destroy": false,
                "publish": false,
                "getsubscribers": false
            },
            "buddylist-room*": {
                "subscribe": true,
                "unsubscribe": true,
                "create": true,
                "destroy": false,
                "publish": true,
                "getsubscribers": true
            },
            "buddylist-control": {
                "subscribe": true,
                "unsubscribe": false,
                "create": false,
                "destroy": false,
                "publish": true,
                "getsubscribers": false
            }
        }
    }

Both of these API calls will return the same role you've just sent with the addition of a unique identifier named `id` that you'll need to pass into the request you'll use to make tokens for your endpoints in brokered authentication.

Now that you have a few custom roles, all you need to do is start creating tokens that use them. As the [Brokered Authentication](/tutorials/brokered-auth.html) article says, this is done inside your server-side auth broker app with the `id` (named `roleId`) that each role you created was assigned.

<pre><code class="xml">POST https://api.respoke.io/v1/tokens
Content-Type: application/json
App-Secret: 28B061B9-A0D4-4E52-A0ED-EB6EA125F82A
</code></pre>

    {
        "appId": "34A9DDB9-D4AO-52AA-0ADE-EABEA521F2BA",
        "endpointId": "bobsmith",
        "roleId": "96070A0D-32B1-4B8C-9353-FE3E6A5E6C1D",
        "ttl": 86400
    }

Now all API calls made by the app that is authenticated as "bobsmith" will be tested against this role before being authorized.
