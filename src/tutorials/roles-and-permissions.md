---
title: "Roles and permissions"
date: 2014-07-09
template: article.jade
showInMenu: "true"
menuOrder: 1
---

# Roles and permissions

In [Brokered Authentication: Securing Your Application](/tutorials/brokered-auth.html), you learn how to secure your app by using tokens to create endpoints and authenticate your users to Respoke.

To secure your app even further, you can use roles to limit the types of things authenticated users can do.



## About Roles and Permissions

As your Respoke app grows, you may want your users to have permission to perform only specific actions against Respoke. In this section, you will learn how to **create Roles for your users and assign them to an endpoint** when authentication occurs.


### Concepts

**Permissions** live in Respoke and **define what a user may or may not do** in Respoke.

**Permissions** are granted by your application on a **per-token** basis.


**Roles provide a way to group permissions**. They are created by you via the [dev console](https://portal.respoke.io/) or REST API.



### Regarding Dev Mode

It's only a few lines of code to get started developing with Respoke in development mode. The [Audio Chat](/js-library/audio-chat.html) example details how to place your Respoke app in development mode, connect, and send messages. If you have successfully logged an endpoint into Respoke and sent a message, then you're probably already using development mode.

In development mode Respoke automatically assigns your endpoints a default role. This "system role" includes a wide set of permissions which make app setup and testing easy.

The **development mode role** consists of the following permissions:
- ability to list all groups that have been created
- ability to join, leave, create, destroy, and publish to a group
- ability to list the members of all groups

<br />
**It's undesirable to run your app in development mode all the time.** As your app matures, you'll want to use roles to limit what your app can do depending on what type of user is authenticated as an endpoint. If you like, you can keep it simple and use a single role for many endpoints, but at the very least you will want to require your users to authenticate to your server before letting them connect to Respoke.

### How To Create Custom Roles

The real power in Roles comes from how you customize them to fit your needs.

1. Select the app you'd like this role to be associated with.
1. Custom roles require that your app is using [brokered auth](/tutorials/brokered-auth.html), so you will have to put your app out of development mode if you haven't already done so. Head over to your [dev console](https://portal.respoke.io/) to do that.
1. Create a new role. Give it a unique name, like "general web visitors".
1. Set some permissions.
    - toggle the ability to media relay services (so audio and video calls work in more complex network scenarios)
    - allow subscribing and unsubscribing from app administrative events
    - allow specific actions to be performed on specific groups
    - allow calling to regular telephone numbers by specifying a list of numbers in the form "+15558675309". Use "*" in the list to allow calling to all numbers.

*Configuring Administrative Events and Group Permissions*

Administration events and group permissions can be configured under the apps' settings page in the [dev console](https://portal.respoke.io/). As shown in the image below, turning events and permissions on and off is a simple matter of clicking the appropriate toggle button. You can also configure these options via the Admin API. More information on that is available in the [Role Management](/api/roles.html) section of the Admin API documentation.

<p><img src="/images/screenshot-role-permissions.jpg" alt="Roles and Permissions Settings"></p>

<br />

### How To Construct Permissions on a Group

Group permissions match a group's name against a permissions rule. You can create a rule with the exact name of the group, with a prefix and a wildcard, or with only a wildcard to match all group names. Respoke will take the most specific rule it can find based on the group's name and use that set of permissions.

*Example:*

Assume you have the following group rules:
- `*`
- `admin`
- `buddylistroom*`
- `buddylistcontrol`


Your app sends a request for an endpoint using these rules to join the group `buddylistroom5`. Respoke will match that group name against the `buddylistroom*` rule and use the permissions attached to that rule to authorize the endpoint to join the group. If the app sends a request for an endpoint using these rules to join the group `testgroup`, Respoke will match on the wildcard rule `*` and use those permissions to determine if the endpoint is allowed to join.

Respoke uses the longest match paradigm, so for rules like `buddy*`, `buddylist*`, and `buddylistroom*`, a request to join `buddylistroom1` will only match the `buddylistroom*` rule.



## Create Roles Programmatically with Respoke's REST API

Eventually, you may need to create roles programmatically. You can do this with [Respoke's REST API](/api) using an App Secret or Admin-Token header.

Here's an example of how you could recreate the development mode role as a proper role.

<pre><code class="xml">POST http://api.respoke.io/v1/roles
Content-Type: application/json
App-Secret <b>OR</b> Admin-Token: 28B061B9-A0D4-4E52-A0ED-EB6EA125F82A</code></pre>


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
App-Secret <b>OR</b> Admin-Token: 28B061B9-A0D4-4E52-A0ED-EB6EA125F82A</code></pre>

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

<pre>
{
   "appId": "34A9DDB9-D4AO-52AA-0ADE-EABEA521F2BA",
   "endpointId": "bobsmith",
   "roleId": "96070A0D-32B1-4B8C-9353-FE3E6A5E6C1D",
   "ttl": 86400
}
</pre>

Now all API calls made by the app that is authenticated as "bobsmith" will be tested against this role before being authorized.

### PSTN Permissions (Phone calls)

To be able to make phone calls out to the phone network from Respoke, you need to have enabled the `pstnOut` permission.

By default, `pstnOut` is fully disabled unless you specify a pstnOut rule. It is also only available if your application is **not** in Development Mode.

The `pstnOut` permission is just another key within your role and it's a list of strings. Below is an example of allowing a role to call out to any allowed phone number on the PSTN.

<pre><code class="xml">POST http://api.respoke.io/v1/roles
Content-Type: application/json
App-Secret <b>OR</b> Admin-Token: 28B061B9-A0D4-4E52-A0ED-EB6EA125F82A
</code></pre>

<pre>
{
   "appId": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
   "name": "allowed-to-phone-out",
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
	},
	<b>pstnOut: ['*']</b>
}
</pre>

As PSTN calling is currently in beta there are some restrictions on what you can do within PSTN calling. One of the restrictions is that you cannot phone outside of the United States, what is referred to as US48.

You can either allow your role to call any allowed number as above, or you can limit calls to certain numbers in the `e164` format. The below lets your role call San Jose and San Francisco's Speaking Clocks only.

```
pstnOut: ['+1408767267', '+14157672676']
```
