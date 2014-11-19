---
title: "REST API Routes"
date: 2014-08-27
template: article.jade
changefreq: weekly
---

# Respoke REST API

All REST routes require the header `Content-Type: application/json`.

<br />

# Base URL

`https://api.respoke.io/v1`

<br />


# Authentication Methods

There are **three ways to authenticate** to Respoke. Each provides a different level of permissions.

<br />
## Full Admin Auth > Partial Admin Auth > App Token Auth
<br />

### 1. Full Admin Auth

Full API permissions are obtained by `POST`ing your username and password to `[base]/adminsessions`.


### 2. Partial Admin Auth

By using the `App-Secret` header, you can perform API calls to obtain Respoke sessions for your users via `POST` to `[base]/tokens`.

`App-Secret`s are found in the [Dev Console](https://portal.respoke.io/#apps).
    
### 3. App Token Auth

Your users authenticate to Respoke using an `App-Token` obtained when they `POST` your `tokenId` to `[base]/appauthsessions`.


<br />
<br />


# API Routes

<br />

## POST [base]/admin-sessions

Log in with the account username and password. Get an `Admin-Token`.

##### Header

none

##### Body

    {
        "username": "ada@respoke.io",
        "password": "c0unte55love1@ce"
    }

##### Response

    {
        "message": "Authorization successful",
        "token": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
    }


<br />


## POST [base]/apps

Create an app.


##### Header

`Admin-Token: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`


##### Body


    {
        "name": "My Example App Name",
        "description": "Testing and making things rock."
    }

##### Response

	{
	    "name": "My Example App Name",
	    "description": "Testing and making things rock.",
	    "accountId": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
	    "locked": false,
	    "developmentMode": false,
	    "id": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
	    "secret": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
	    "createdAt": "2014-04-23T18:25:43.511Z",
	    "updatedAt": "2014-04-23T18:25:43.511Z"
	}


<br />


## POST [base]/roles

Create `roleId` and `roleName` for creating tokens.


##### Header

`App-Secret: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`


##### Body

*Example, equivalent to development mode role:*

    {
        "appId": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
        "name":"your-role-name-here",
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

##### Response

    {
        "appId": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
        "name": "your-role-name-here", // This is the roleName for creating tokens.
        "id": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX", // This is the roleId for creating tokens.
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
        },
        "createdAt": "2014-04-23T18:25:43.511Z",
        "updatedAt": "2014-04-23T18:25:43.511Z"
    }

<br />


## POST [base]/tokens

Get an access token `tokenId` for an end-user.

##### Header
    
`App-Secret: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`

##### Body

    {
        "appId": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
        "endpointId": "yourendpointwithnospaces",
        /* response token will expire in this many seconds */
        "ttl": "86400",
        /* from POST permissions response "id" (optional if roleName is provided) */
        "roleId": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
        /* optional if roleId is provided */
        "roleName": "your role name"
    }

##### Response

    {
        "appId": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
        "endpointId": "yourendpointwithnospaces",
        "roleId": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
        "createTime": 1404315468,
        "expiryTime": 1404315468,
        "id": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
        "tokenId": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
    }

<br />

## POST [base]/session-tokens

An end-user client posts a `tokenId` from `POST [base]/tokens` to authenticate to an app as `endpointId`.


##### Header

`App-Token: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`

##### Body

    {
        "tokenId": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
    }

##### Response

    {
        "message": "Authorization successful",
        "token": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
    }

<br />

## POST [base]/turn

Get TURN credentials.


##### Header

`App-Token: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`

##### Body

none

##### Response

    {
        "username": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXXXXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX.0000000000",
        "password": "XXXXXXXXXXXX+XXXXXXXXXXXXXX=",
        "ttl": 60,
        "uris": [
            "turn:54.193.20.11:3478?transport=udp"
        ]
    }

