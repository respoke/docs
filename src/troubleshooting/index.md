---
title: "Troubleshooting"
shortTitle: "Troubleshooting"
date: 2015-09-29
template: article.jade
showInMenu: "false"
linkUrl: "/troubleshooting/"
menuOrder: 0
---

# Troubleshooting

## Audio / Video Not Working in Chrome 45+ But Worked Prior

This issue could be caused by the ['self' source expression change to exclude 'blob:'][1]
in Chrome's implementation of [Content Security Policy][2] that became the default behavior
in Chrome 45. If you are using a Content Security Policy to protect your site from XSS
attacks and were not aware of this change, it could potentially prevent your audio and video
calls from properly rendering the media, which would cause the audio to not play or the video
element to not show up.

Typically if your application is affected by this problem, you will see an error message printed
in the javascript console of your browser indicating that it refused to render a url starting with
'blob://' due to the Content Security Policy settings in effect.

To address this problem, you will need to update your Content Security Policy directives on your
server to allow `blob:` in the `media-src` directive. A resulting example Content-Security-Policy
header with the changes in place may look something like this:

    Content-Security-Policy:default-src 'self';script-src 'self' 'unsafe-inline';img-src data: 'self';media-src blob: 'self';connect-src * 'self';style-src 'self' 'unsafe-inline'

[1]: https://www.chromestatus.com/features/4876241895161856
[2]: http://content-security-policy.com/
