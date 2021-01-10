# GDPR video
_GDPR-style consent prompt for YouTube and Vimeo videos on your website_

This projectimplements a requirement from the European General Data Protection
Regulation, which applies to websites targeting any of the European Union 
member states. For details, see https://privacyinternational.org/long-read/2207/why-and-how-gdpr-applies-companies-globally.
If a website features embedded videos, it must not use cookies before the user
has given explicit consent.

The JS automatically pops up a GDPR-style consent prompt over the top of 
each YouTube or Vimeo remote video iframe on your site.
Rather than first loading the player and its controls, this code loads the
video's default frame as a plain image "teaser". This does not involve cookies
or other private data. 
The module then places a consent prompt over the top of the image with an
"I agree" button. After the user has clicked the button, the video player is
loaded and its play button may be pressed to watch the video as per normal.

*Note regarding YouTube cookies*

While the alternative YouTube domain youtube-nocookie.com may suggest that
no cookies are created on the user's machine at all, there certainly are, once
the user has pressed "play".
See https://axbom.blog/embed-youtube-videos-without-cookies

*How can I see what cookies live on my machine?*

Most browsers have an advanced option for this. For instance in Chrome, first 
select View -> Developer -> Developer Tools. A panel opens at the bottom of
the screen with a toolbar of many options. Click Application to reveal a panel
on the left. Under the heading Storage, you'll see your Cookies and other types
of local storage appear.


