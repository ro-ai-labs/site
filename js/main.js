/* ===========================
   RO AI Labs — Main JS
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

    // Update all bilingual elements
    var elements = document.querySelectorAll('[data-ro][data-en]');
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      // Skip lang toggle options themselves
      if (el.classList.contains('lang-option')) continue;
      el.textContent = el.getAttribute('data-' + lang);
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
    var scrollY = window.scrollY + 120;
    for (var i = sections.length - 1; i >= 0; i--) {
      var section = sections[i];
      if (section.offsetTop <= scrollY) {
        var id = section.getAttribute('id');
        for (var j = 0; j < navLinks.length; j++) {
          navLinks[j].style.color = '';
        }
        var active = document.querySelector('.nav-links a[href="#' + id + '"]');
        if (active) {
          active.style.color = '#ffffff';
        }
        break;
      }
    }
  }

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();
})();
