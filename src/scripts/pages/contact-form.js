(function () {
  var form = document.getElementById('contactForm');
  if (!form) return;

  var submitBtn  = document.getElementById('cfSubmit');
  var submitHTML = submitBtn.innerHTML;
  var status     = document.getElementById('cfStatus');

  var required = {
    name:    { el: form.querySelector('#cf-name'),    emptyMessage: 'Enter your name.',    minLength: 2,  shortMessage: 'Enter your full name.' },
    email:   { el: form.querySelector('#cf-email'),   emptyMessage: 'Enter your email.' },
    message: { el: form.querySelector('#cf-message'), emptyMessage: 'Add a message.',      minLength: 10, shortMessage: 'Tell us a bit more about your project.' }
  };

  function errorEl(input) {
    var id = input.getAttribute('aria-describedby');
    return id ? document.getElementById(id) : null;
  }

  function setFieldError(input, message) {
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
    var el = errorEl(input);
    if (el) el.textContent = message || '';
  }

  function isValidEmail(value) {
    // Requires a real local@domain.tld shape — rejects bare words, missing "@", or no dot in the domain.
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  }

  function validate() {
    var firstInvalid = null;

    Object.keys(required).forEach(function (key) {
      var field = required[key];
      var value = field.el.value.trim();
      var message = '';

      if (!value) {
        message = field.emptyMessage;
      } else if (key === 'email' && !isValidEmail(value)) {
        message = 'Enter a valid email address.';
      } else if (field.minLength && value.length < field.minLength) {
        message = field.shortMessage;
      }

      setFieldError(field.el, message);
      if (message && !firstInvalid) firstInvalid = field.el;
    });

    return firstInvalid;
  }

  Object.keys(required).forEach(function (key) {
    var field = required[key];
    field.el.addEventListener('blur', function () {
      if (field.el.value.trim()) validate();
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var firstInvalid = validate();
    if (firstInvalid) {
      firstInvalid.focus();
      status.dataset.state = 'error';
      status.textContent = 'Check the highlighted fields above.';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    status.dataset.state = '';
    status.textContent = '';

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    })
      .then(function (response) {
        if (response.ok) {
          form.reset();
          status.dataset.state = 'success';
          status.textContent = "Thanks — I'll get back to you within 24 hours.";
        } else {
          throw new Error('submission failed');
        }
      })
      .catch(function () {
        status.dataset.state = 'error';
        status.innerHTML = 'Something went wrong. Email me directly at <a href="mailto:rafhin.visual@gmail.com">rafhin.visual@gmail.com</a>.';
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = submitHTML;
      });
  });
})();
