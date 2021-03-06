# GDPR video
_GDPR-style consent prompt for YouTube and Vimeo videos on your website_

This project implements a requirement from the European General Data Protection
Regulation, which applies to websites targeting any of the European Union 
member states. For details, see https://privacyinternational.org/long-read/2207/why-and-how-gdpr-applies-companies-globally.

In short, when it comes to videos, the GDPR requires the following.

*If a website features embedded videos, these must not use cookies (or other private data) before the
user has been prompted and has given explicit consent.*

File gdpr_video.js automatically pops up a GDPR-style consent prompt over the top of 
each YouTube or Vimeo remote video iframe on your site.
Rather than first loading the player and its controls, this code loads the
video's default frame as a plain image "teaser". 
This does not involve cookies or other private data, so is compliant with GDPR.
The module then places a consent prompt over the top of the image with an
"I agree" button. After the user has clicked the button, the video player is
loaded and its play button may be pressed to watch the video as per normal.
From this point onwards, cookies may or may not be used by YouTube or Vimeo.

## How to install
Drupal users: there's a module for this, https://drupal.org/project/gdpr_video


If you use another website system you need to make sure that the gdpr_video.js
and gdpr_video.css files are included on the pages on your site that (may) 
contain embedded video iframes.
Put these files with the other .js and .css files on your server.
Then make sure that the page HTML contains something like this (with the file paths updated, of course):
```
<head>
  ....
  <link rel="stylesheet" href=".../gdpr_video.css"/>
</head>
<body>
  ....
  ...
  <script src=".../gdpr_video.js"></script>
</body>
```
If you prefer you can put the &lt;script> tag inside the &lt;head>, just before or after the CSS &lt;link>.

### Instant satisfaction
For a super simple working demo, download the following 3 files into the same
folder on your laptop or PC;
* gdpr_video.css
* gdpr_video.js
* gdpr_video_example.html

Then double-click the .html file and a YouTube video with GDPR consent overlay should appear. 

Nice?


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
