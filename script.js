// Buttons and navigation
const applyBtn = document.querySelector(".apply-btn");
const tourBtn = document.querySelector(".tour-btn");
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (applyBtn) {
  applyBtn.addEventListener('click', (e) => {
    // If this button is inside a form (submit), let the form handle it.
    const admission = document.getElementById('admission');
    if (admission) {
      admission.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

if (tourBtn) {
  tourBtn.addEventListener('click', () => {
    const gallery = document.getElementById('gallery');
    if (gallery) gallery.scrollIntoView({ behavior: 'smooth' });
  });
}

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// Smooth-scroll for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const feedbackForm = document.getElementById('feedbackForm');
const feedbackMessage = document.getElementById('feedbackMessage');
const smsActions = document.querySelectorAll('a.sms-action');
const whatsappActions = document.querySelectorAll('a.whatsapp-action');

function showStatusMessage(message) {
  if (feedbackMessage) {
    feedbackMessage.textContent = message;
  } else {
    alert(message);
  }
}

if (feedbackForm) {
  feedbackForm.addEventListener('submit', (event) => {
    event.preventDefault();
    showStatusMessage('Thanks for your feedback.');
    feedbackForm.reset();
  });
}

function attachContactResponse(links, message) {
  links.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      showStatusMessage(message);
      window.location.href = link.href;
    });
  });
}

if (smsActions.length > 0) {
  attachContactResponse(smsActions, 'We will send a reply within 24hrs. Thanks for your response.');
}

if (whatsappActions.length > 0) {
  attachContactResponse(whatsappActions, 'We will send a reply within 24hrs. Thanks for your response.');
}
