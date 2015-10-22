---
title: "Supported Devices"
shortTitle: "Supported Devices"
date: 2015-09-29
template: article.jade
showInMenu: "false"
linkUrl: "/supported-devices/"
menuOrder: 0
---

# Supported Devices

<table class="supported-devices-matrix">
<thead>
  <tr>
    <th>Browser/Platform</th>
    <th>Supported?</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Chrome</td>
    <td class="supported">Yes</td>
  </tr>
  <tr>
    <td>Firefox</td>
    <td class="supported">Yes</td>
  </tr>
  <tr>
    <td>Opera</td>
    <td class="supported">Yes</td>
  </tr>
  <tr>
    <td>Safari</td>
    <td class="not-supported">No</td>
  </tr>
  <tr>
    <td>Internet Explorer/Edge</td>
    <td class="not-supported">No</td>
  </tr>
  <tr>
    <td>Android Native</td>
    <td class="supported">Yes<span class="footnote"><a href="#notes">1</a></span></td>
  </tr>
  <tr>
    <td>Android Webview</td>
    <td class="supported">Yes<span class="footnote"><a href="#notes">2</a></span></td>
  </tr>
  <tr>
    <td>Chrome for Android</td>
    <td class="supported">Yes</td>
  </tr>
  <tr>
    <td>Firefox for Android</td>
    <td class="supported">Yes</td>
  </tr>
  <tr>
    <td>Opera for Android</td>
    <td class="supported">Yes</td>
  </tr>
  <tr>
    <td>iOS Native</td>
    <td class="supported">Yes<span class="footnote"><a href="#notes">3</a></span></td>
  </tr>
  <tr>
    <td>iOS Webview</td>
    <td class="not-supported">No</td>
  </tr>
  <tr>
    <td>Chrome for iOS</td>
    <td class="not-supported">No</td>
  </tr>
  <tr>
    <td>Firefox for iOS</td>
    <td class="not-supported">No</td>
  </tr>
  <tr>
    <td>Opera for iOS</td>
    <td class="not-supported">No</td>
  </tr>
  <tr>
    <td>nw.js</td>
    <td class="supported">Yes</td>
  </tr>
</tbody>
</table>

## Notes

1. Respoke is supported on Android natively by using the [Respoke Android SDK][].
2. The Android Webview supports WebRTC as of [Android 5.0+ (Webview v36+)][android webrtc].
3. Respoke is supported on iOS natively by using the [Respoke iOS SDK][].

[Respoke Android SDK]: https://github.com/respoke/respoke-sdk-android
[android webrtc]: https://developer.chrome.com/multidevice/webview/overview#does_the_new_webview_have_feature_parity_with_chrome_for_android_
[Respoke iOS SDK]: https://github.com/respoke/respoke-sdk-ios
