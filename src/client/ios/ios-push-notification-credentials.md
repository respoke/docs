---
title: "Obtaining Apple Credentials for Sending Push Notifications to iOS Devices Using Respoke"
shortTitle: "Obtaining Push Credentials"
date: 2015-06-01
template: article.jade
showInMenu: "true"
menuOrder: 4
meta:
    keywords: "respoke, iOS, webrtc, push notifications, push"
    description: "Guide to obtaining Apple credentials for sending push notifications to iOS devices using Respoke."
---

### iOS SDK

# Obtaining Apple Credentials for Sending Push Notifications to iOS Devices Using Respoke

## Introduction

The process for generating credentials for use with Respoke push notifications is outlined in this guide. For more
information about sending push notifications with Respoke, see the [Push Notifications](/portal/push-notifications.html)
section of the Dev Portal guide.

## Generating a Certificate Request

You'll need to generate a Certificate Request before you can configure your app for push notifications. ***Note: This
same process is required when generating a PRODUCTION certificate.***

**Step 1.** Launch the "Keychain Access" app on your Mac.

![Keychain Access](../../images/ios-sdk/ios-push-creds-1-1.png)

**Step 2.** Open the Keychain Access menu -> Certificate Assistant -> Request a Certificate From a Certificate
Authority.

![Request Certificate](../../images/ios-sdk/ios-push-creds-1-2.png)

**Step 3.** Enter the email address and common name you prefer, select the 'Saved to disk' option, and click "Continue".

![Certificate Information](../../images/ios-sdk/ios-push-creds-1-3.png)

**Step 4.** Use the suggested name, select the save destination you prefer, and click the "Save" button.

![Certificate Save As](../../images/ios-sdk/ios-push-creds-1-4.png)

## Creating an App ID

If you haven't already created an iOS App ID, you'll need to do so now. If you already have one, skip to the next
section.

**Step 1.** Log in to the [iPhone Developer Portal](http://developer.apple.com/devcenter/ios/index.action) and open the
"Certificates, Identifiers, & Profiles" page.

![iPhone Developer Portal](../../images/ios-sdk/ios-push-creds-2-1.png)

**Step 2.** Click the "Identifiers" link.

![Identifiers](../../images/ios-sdk/ios-push-creds-2-2.png)

**Step 3.** Under the "Identifiers" section (left hand side of page), select "App IDs" if not already selected. Then
click the add new app button.

![App IDs](../../images/ios-sdk/ios-push-creds-2-3.png)

**Step 4.** Enter your app's name for the description and enter a unique bundle identifier (usually in the format
`com.domainname.appname`), then click the "Continue" button.

![App Details](../../images/ios-sdk/ios-push-creds-2-4.png)

**Step 5.** Confirm that your app info is correct then click the "Submit" button.

![Confirm App Settings](../../images/ios-sdk/ios-push-creds-2-5.png)

## Configuring an App ID for Push Notifications

**Step 1.** Log in to the [iPhone Developer Portal](http://developer.apple.com/devcenter/ios/index.action) and open the
"Certificates, Identifiers, & Profiles" page.

![iPhone Developer Portal](../../images/ios-sdk/ios-push-creds-2-1.png)

**Step 2.** Click the "Identifiers" link.

![Identifiers](../../images/ios-sdk/ios-push-creds-2-2.png)

**Step 3.** Under the "Identifiers" section (left hand side of page), select "App IDs" if not already selected. Select
the appropriate app ID and click its "Edit" button.

![App IDs](../../images/ios-sdk/ios-push-creds-3-3.png)

**Step 4.** Scroll down to check the "Push Notifications" option, then click the "Create Certificate" button within the
"Development SSL Certificate" section.

![Create Certificate](../../images/ios-sdk/ios-push-creds-3-4.png)

**Step 5.** Click the "Continue" button.

![Continue Creating Certificate](../../images/ios-sdk/ios-push-creds-3-5.png)

**Step 6.** Click the "Choose File" button to upload the Certificate Request file that you created earlier, then click
the "Generate" button.

![Generate Certificate](../../images/ios-sdk/ios-push-creds-3-6.png)

**Step 7.** Now download your certificate.

![Download Certificate](../../images/ios-sdk/ios-push-creds-3-7.png)

**Step 8.** The downloaded certificate will be named "aps_development.cer". Double-click it to load it in the Keychain
Access application. Launch the "Keychain Access" app on your Mac, select "login" from the "Keychains" filters and "My
Certificates" from the "Category" filters. You will see an expandable option called “Apple Development iOS Push
Services: your_app_id”. Right click this option and select "Export ...".

![Load and Export Certificate from Keychain Access](../../images/ios-sdk/ios-push-creds-3-8.png)

**Step 9.** Name your file "apns-dev-cert.p12", select a save destination you'll remember, click the "Save" button, and
then enter a password when prompted (can be left blank).

![Save Exported Certificate](../../images/ios-sdk/ios-push-creds-3-9.png)

**Step 10.** You may be asked to provide your admin password at this point.

![Enter Password for Keychain Access Certificate Export](../../images/ios-sdk/ios-push-creds-3-10.png)

**Step 11.** Launch the "Terminal" app on your Mac and navigate to the directory where you saved your
"aps_development.cer" and "apns-dev-cert.p12" files.

![Navigate In Terminal To Files](../../images/ios-sdk/ios-push-creds-3-11.png)

**Step 12.** Create your certificate PEM file with the following command:
`openssl x509 -in aps_development.cer -inform DER -outform PEM -out apns-dev-cert.pem`

![Create Certificate PEM File On Command Line](../../images/ios-sdk/ios-push-creds-3-12.png)

**Step 13.** Create your key PEM file with the following command (if you didn't set a password just hit enter when
prompted for one): `openssl pkcs12 -in apns-dev-cert.p12 -out apns-dev-key.pem -nodes`

![Create Key PEM File On Command Line](../../images/ios-sdk/ios-push-creds-3-13.png)

**Step 14.** To test that your certificate and key were generated correctly, run the following command:

For development:
`openssl s_client -connect gateway.sandbox.push.apple.com:2195 -cert apns-dev-cert.pem -key apns-dev-key.pem`

For production: `openssl s_client -connect gateway.push.apple.com:2195 -cert apns-dev-cert.pem -key apns-dev-key.pem`

It'll print out your certificate and other information, but if it succeeds you should see something like the output
below towards the bottom:

![Test Certificate and Key PEM Files Using OpenSSL](../../images/ios-sdk/ios-push-creds-3-14.png)

**Step 15.** Upload the certificate and key contents you created in Step 12 to the Respoke Portal.

![Enter Credentials In Respoke Developer Console](../../images/ios-sdk/ios-push-creds-3-15.png)
