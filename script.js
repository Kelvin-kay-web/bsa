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

// Carousel functionality
const carousels = {
  'carousel-l': { currentIndex: 0, autoPlayInterval: null },
  'carousel-pg': { currentIndex: 0, autoPlayInterval: null },
  'carousel-cd': { currentIndex: 0, autoPlayInterval: null }
};

function getCarouselSlides(carouselId) {
  const carousel = document.getElementById(carouselId);
  return carousel ? carousel.querySelectorAll('.carousel-slide') : [];
}

function updateCarouselPosition(carouselId) {
  const carousel = document.getElementById(carouselId);
  const slides = getCarouselSlides(carouselId);
  const state = carousels[carouselId];
  
  if (carousel && slides.length > 0) {
    const offset = -state.currentIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;
  }
}

function changeSlide(carouselId, direction) {
  const slides = getCarouselSlides(carouselId);
  const state = carousels[carouselId];
  
  if (slides.length === 0) return;
  
  state.currentIndex += direction;
  
  if (state.currentIndex >= slides.length) {
    state.currentIndex = 0;
  } else if (state.currentIndex < 0) {
    state.currentIndex = slides.length - 1;
  }
  
  updateCarouselPosition(carouselId);
  resetAutoPlay(carouselId);
}

function autoPlayCarousel(carouselId) {
  const state = carousels[carouselId];
  const slides = getCarouselSlides(carouselId);
  
  if (slides.length <= 1) return;
  
  state.autoPlayInterval = setInterval(() => {
    changeSlide(carouselId, 1);
  }, 5000);
}

function resetAutoPlay(carouselId) {
  const state = carousels[carouselId];
  if (state.autoPlayInterval) {
    clearInterval(state.autoPlayInterval);
  }
  autoPlayCarousel(carouselId);
}

function initializeCarousels() {
  Object.keys(carousels).forEach(carouselId => {
    const slides = getCarouselSlides(carouselId);
    if (slides.length > 0) {
      updateCarouselPosition(carouselId);
      autoPlayCarousel(carouselId);
    }
  });
}

document.addEventListener('DOMContentLoaded', initializeCarousels);

window.changeSlide = changeSlide;
