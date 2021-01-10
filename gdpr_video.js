/**
 * By Rik de Boer (c) Melbourne 2021.
 *
 * Pops up a GDPR-style consent prompt over the top of an embedded video iframe.
 *
 * Contains ideas from:
 * DSGVO Video Embed, v1.0.2, https://github.com/a-v-l/dsgvo-video-embed
 * (c) 2018 Arndt von Lucadou
 *
 * MIT License
 */
(function() {

   const consentTextYouTube =
     'By playing this video, you load content from YouTube, a service of Google LLC.' + '<br/>' +
     "For information on how Google may use your data see the <a target='_google' href='https://privacy.google.com/businesses/compliance#gdpr'>Google privacy policy</a>."

   const consentTextVimeo =
     'By playing this video, you load content from Vimeo.' + '<br/>' +
     "For information on how Vimeo may use your data see the <a target='_vimeo' href='https://vimeo.com/privacy'>Vimeo privacy policy</a>."

   const buttonText = "I'm OK with this"

   const setSrcToThumbnail = (element, provider, vid) => {
     if (provider == 'vimeo') {
       fetch(`https://vimeo.com/api/v2/video/${vid}.json`)
         .then(response => response.json())
         .then(data => {
           // Vimeo large thumbnail size is 640 x 360 (16:9)
           element.src = data[0].thumbnail_large
         })
         .catch(error => {
           console.error('Error fetching Vimeo thumbnail', error);
         })
     }
     else if (provider == 'youtube') {
       // YouTube maxresdefault img is normally 1280 x 720 (16:9)
       element.src = `https://img.youtube.com/vi/${vid}/maxresdefault.jpg`
       // There is also the 1st frame `https://img.youtube.com/vi/${vid}/0.jpg`
       // For 1st frame w x h appears to always equal 480 x 360 (4:3).
       // We can do little in terms of checking if any of these .jpg images
       // actually exist, due to CORS: a fetch() will fail.
     }
   }


   document.addEventListener('DOMContentLoaded', _ => {

     for (let iframe, f = 0; f < window.frames.length; f++) {
       try {
         iframe = window.frames[f].frameElement
       }
       catch(err) {
         console.log(`Please refresh page, due to: ${err.message}`)
       //location.reload()
       //break
       }

       // When a user embeds via the CKEditor Source function, they may use
       // For Vimeo:
       // https://player.vimeo.com/video/VIDEO_ID
       // For YouTube
       // https://youtube.com/embed/VIDEO_ID  or
       // https://youtube-nocookie.com/embed/VIDEO_ID
       //
       // vimeo.com/VIDEO_ID and youtu.be/VIDEO_ID may appear in
       // Drupal-generated special URLs
       const match = iframe.src.match(/(\/embed|youtu\.be|vimeo.com\/video|vimeo\.com)\/([^?&]+)/)
       if (!match || !match[2]) {
         // Not a YouTube or Vimeo iframe.
         continue
       }
       // First things first: stop the loading of the src before it can start.
       window.frames[f].stop()
       iframe.style.display = 'none'

       // Remember VIDEO_ID and provider for use below.
       const vid = match[2]
       const provider = match[1].startsWith('vimeo.com') ? 'vimeo' : 'youtube'
       const src = iframe['data-src'] ? iframe['data-src'] : iframe.src

       // Load the video's default frame as a teaser img. Loading this img does
       // not involve the creation of cookies or other local storage, so is GDPR
       // compliant.
       // Create a teaser img and place it over the top of the video frame.
       const img = document.createElement('img')
       img.setAttribute('class', 'video-img-overlay')
       setSrcToThumbnail(img, provider, vid)

       // Create a consent text and place it over the top of the video frame.
       const overlay = document.createElement('div')
       overlay.setAttribute('class', 'video-text-overlay')
       overlay.innerHTML = (provider == 'vimeo') ? consentTextVimeo : consentTextYouTube

       // Add an "I agree" button, which when clicked removes the overlay text
       // and loads the video into the iframe.
       button = document.createElement('button')
       button.innerHTML = buttonText
       button.addEventListener('click', (evt) => {
         // Remove the teaser img and overlay and load the video player.
         overlay.remove()
         img.remove()
         iframe.style.display = 'block'

         // Append some useful parameters to the video URL.
         // rel=0 : don't show related videos when paused (YouTube only)
         // loop=1: auto-restart video when it completes
         const pars = (src.indexOf('?') > 0 ? '&' : '?') +
           (provider == 'vimeo' ? 'loop=1' : `rel=0&playlist=${vid}&loop=1`)

         iframe.src = src + pars
       })

       // Append "I agree" button to the overlay.
       // Append img and overlay as siblings of the iframe.
       overlay.append(button)
       iframe.parentNode.append(img, overlay)

       // Make the video frame responsive, based on 16:9 ratio.
       iframe.parentNode.setAttribute('style', 'width:100%; height:0; position:relative; padding-bottom:56.25%')
       iframe.setAttribute('style', 'width:100%; height:100%; position:absolute; left:0; top:0')
     }
   })

}())
