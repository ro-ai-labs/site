/* ===========================
   AI Leaders Romania - Main JS
   Bilingual toggle uses innerHTML to swap data-ro/data-en attributes
   which may contain HTML (e.g. anchor tags in the hero eyebrow).
   All attribute values are hardcoded in the page source - no user input.
   =========================== */

(function () {
  'use strict';

  // ---- Language Toggle ----
  var currentLang = 'ro';
  var langToggle = document.getElementById('langToggle');
  var langOptions = langToggle.querySelectorAll('.lang-option');

  function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;

    // Update toggle active state
    for (var k = 0; k < langOptions.length; k++) {
      if (langOptions[k].getAttribute('data-lang') === lang) {
        langOptions[k].classList.add('lang-active');
      } else {
        langOptions[k].classList.remove('lang-active');
      }
    }

    // Update all bilingual elements (attributes are hardcoded, not user-supplied)
    var elements = document.querySelectorAll('[data-ro][data-en]');
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      // Skip lang toggle options themselves
      if (el.classList.contains('lang-option')) continue;
      // Safe: values come from hardcoded data attributes in the HTML source
      el.innerHTML = el.getAttribute('data-' + lang); // eslint-disable-line no-unsanitized/property
    }
  }

  langToggle.addEventListener('click', function () {
    setLanguage(currentLang === 'ro' ? 'en' : 'ro');
  });

  langToggle.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setLanguage(currentLang === 'ro' ? 'en' : 'ro');
    }
  });

  // ---- Mobile Menu ----
  var hamburger = document.getElementById('navHamburger');
  var mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });

  // Close mobile menu on link click
  var mobileLinks = mobileMenu.querySelectorAll('a');
  for (var i = 0; i < mobileLinks.length; i++) {
    mobileLinks[i].addEventListener('click', function () {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  }

  // ---- FAQ Accordion ----
  var faqItems = document.querySelectorAll('.faq-item');
  for (var i = 0; i < faqItems.length; i++) {
    (function (item) {
      var btn = item.querySelector('.faq-question');
      if (!btn) return;
      btn.addEventListener('click', function () {
        var wasActive = item.classList.contains('active');
        // Close all
        for (var j = 0; j < faqItems.length; j++) {
          faqItems[j].classList.remove('active');
        }
        // Toggle clicked
        if (!wasActive) {
          item.classList.add('active');
        }
      });
    })(faqItems[i]);
  }

  // ---- Nav scroll state ----
  var nav = document.getElementById('nav');

  function checkNavScroll() {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', checkNavScroll, { passive: true });
  checkNavScroll();

  // ---- Scroll Fade-In ----
  var fadeEls = document.querySelectorAll('.fade-in');

  function checkFade() {
    var triggerBottom = window.innerHeight * 0.88;
    for (var i = 0; i < fadeEls.length; i++) {
      var el = fadeEls[i];
      var box = el.getBoundingClientRect();
      if (box.top < triggerBottom) {
        el.classList.add('visible');
      }
    }
  }

  window.addEventListener('scroll', checkFade, { passive: true });
  window.addEventListener('resize', checkFade, { passive: true });

  // Run on load
  checkFade();

  // ---- Active nav link highlight ----
  var sections = document.querySelectorAll('.section, .hero');
  var navLinks = document.querySelectorAll('.nav-links a');

  function highlightNav() {
    var scrollY = window.scrollY + 100;
    for (var i = sections.length - 1; i >= 0; i--) {
      var section = sections[i];
      if (section.offsetTop <= scrollY) {
        var id = section.getAttribute('id');
        for (var j = 0; j < navLinks.length; j++) {
          var link = navLinks[j];
          // Don't override nav-highlight base color
          if (link.classList.contains('nav-highlight')) {
            link.style.color = '';
            link.style.borderColor = '';
          } else {
            link.style.color = '';
          }
        }
        var active = document.querySelector('.nav-links a[href="#' + id + '"]');
        if (active) {
          if (active.classList.contains('nav-highlight')) {
            active.style.color = '#ffffff';
            active.style.borderColor = 'rgba(59, 130, 246, 0.6)';
          } else {
            active.style.color = '#ffffff';
          }
        }
        break;
      }
    }
  }

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();
})();
