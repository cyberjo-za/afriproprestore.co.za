document.addEventListener('DOMContentLoaded', function () {

  /* ===== Cookie Banner ===== */
  const cookieBanner = document.getElementById('cookieBanner');
  const cookieAccept = document.getElementById('cookieAccept');
  const cookieReject = document.getElementById('cookieReject');

  if (cookieBanner) {
    const consent = localStorage.getItem('afriproprestore-cookie-consent');
    if (!consent) {
      cookieBanner.classList.add('show');
    }

    const hideBanner = function () {
      cookieBanner.classList.remove('show');
    };

    if (cookieAccept) {
      cookieAccept.addEventListener('click', function () {
        localStorage.setItem('afriproprestore-cookie-consent', 'accepted');
        hideBanner();
      });
    }

    if (cookieReject) {
      cookieReject.addEventListener('click', function () {
        localStorage.setItem('afriproprestore-cookie-consent', 'rejected');
        hideBanner();
      });
    }
  }

  /* ===== Mobile Nav Toggle ===== */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu after clicking a link (mobile UX)
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ===== Back To Top Button ===== */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ===== Fade In On Scroll ===== */
  const fadeEls = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window && fadeEls.length) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    fadeEls.forEach(function (el) { observer.observe(el); });
  } else {
    fadeEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ===== Contact Form Validation & Mailto Handoff ===== */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const enquiry = document.getElementById('enquiry');
      const message = document.getElementById('message');
      const phone = document.getElementById('phone');
      const successMsg = document.getElementById('formSuccess');

      let valid = true;

      // Clear previous errors
      [name, email, enquiry, message].forEach(function (field) {
        field.parentElement.classList.remove('invalid');
      });
      ['nameError', 'emailError', 'enquiryError', 'messageError'].forEach(function (id) {
        document.getElementById(id).textContent = '';
      });

      // Name check
      if (!name.value.trim()) {
        valid = false;
        name.parentElement.classList.add('invalid');
        document.getElementById('nameError').textContent = 'Please enter your full name.';
      }

      // Email check
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value.trim())) {
        valid = false;
        email.parentElement.classList.add('invalid');
        document.getElementById('emailError').textContent = 'Please enter a valid email address.';
      }

      // Enquiry type check
      if (!enquiry.value) {
        valid = false;
        enquiry.parentElement.classList.add('invalid');
        document.getElementById('enquiryError').textContent = 'Please select an option.';
      }

      // Message check
      if (!message.value.trim()) {
        valid = false;
        message.parentElement.classList.add('invalid');
        document.getElementById('messageError').textContent = 'Please tell us a little about your enquiry.';
      }

      if (!valid) {
        successMsg.textContent = '';
        return;
      }

      // Build WhatsApp message with prefilled details
      const whatsappNumber = '27615164609';
      const whatsappMessage = encodeURIComponent(
        'Hello AfriProp Restore,\n\n' +
        'Name: ' + name.value + '\n' +
        'Email: ' + email.value + '\n' +
        'Phone: ' + (phone.value || 'Not provided') + '\n' +
        'Enquiry Type: ' + enquiry.value + '\n\n' +
        'Message:\n' + message.value
      );
      const whatsappLink = 'https://wa.me/' + whatsappNumber + '?text=' + whatsappMessage;

      successMsg.textContent = 'Thank you. Your WhatsApp chat is opening with your message pre-filled.';
      window.open(whatsappLink, '_blank', 'noopener,noreferrer');

      contactForm.reset();
    });
  }

});