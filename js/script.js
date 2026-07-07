document.addEventListener('DOMContentLoaded', function () {

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

      // Build mailto link with prefilled details
      const subject = encodeURIComponent('New Enquiry from AfriProp Restore Website: ' + enquiry.value);
      const body = encodeURIComponent(
        'Name: ' + name.value + '\n' +
        'Email: ' + email.value + '\n' +
        'Phone: ' + (phone.value || 'Not provided') + '\n' +
        'Enquiry Type: ' + enquiry.value + '\n\n' +
        'Message:\n' + message.value
      );

      const mailtoLink = 'mailto:info@afriproprestore.co.za?subject=' + subject + '&body=' + body;

      successMsg.textContent = 'Thank you. Your email client will now open so you can send your message to our team.';
      window.location.href = mailtoLink;

      contactForm.reset();
    });
  }

});