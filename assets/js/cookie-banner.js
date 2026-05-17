/* EZLogs cookie banner.
   - Shows on first visit unless a choice is already stored in localStorage.
   - "Accept" => stores 'accepted' and loads Google Analytics (GA4).
   - "Decline" => stores 'declined' and does NOT load GA4.
   GA4 Measurement ID is read from the data-ga-id attribute on the banner
   element so we don't bake it into JS. */
(function () {
  var STORAGE_KEY = 'ezlogs.cookieConsent';
  var stored = null;
  try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) { /* private mode */ }

  function loadGA(gaId) {
    if (!gaId) return;
    if (window.__ezlogsGALoaded) return;
    window.__ezlogsGALoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(gaId);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', gaId, { anonymize_ip: true });
  }

  function setupBanner() {
    var banner = document.getElementById('cookie-banner');
    if (!banner) return;
    var gaId = banner.getAttribute('data-ga-id') || '';

    if (stored === 'accepted') {
      loadGA(gaId);
      return;
    }
    if (stored === 'declined') {
      return;
    }

    banner.classList.add('is-visible');
    banner.querySelector('[data-action="accept"]').addEventListener('click', function () {
      try { localStorage.setItem(STORAGE_KEY, 'accepted'); } catch (e) {}
      banner.classList.remove('is-visible');
      loadGA(gaId);
    });
    banner.querySelector('[data-action="decline"]').addEventListener('click', function () {
      try { localStorage.setItem(STORAGE_KEY, 'declined'); } catch (e) {}
      banner.classList.remove('is-visible');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupBanner);
  } else {
    setupBanner();
  }
})();
