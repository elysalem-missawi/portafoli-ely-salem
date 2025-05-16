// ====== Tema oscuro ======
const toggleBtn = document.getElementById('toggleTheme');
const userPref = localStorage.getItem('theme');

if (userPref === 'dark') {
  document.body.classList.add('dark');
  toggleBtn.textContent = '☀️ Modo Claro';
}

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  toggleBtn.textContent = isDark ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ====== Menú hamburguesa ======
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// ====== Scroll nav ======
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ====== Acordeón ======
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;
    document.querySelectorAll('.accordion-content').forEach(c => {
      if (c !== content) c.classList.remove('open');
    });
    content.classList.toggle('open');
  });
});

// ====== Lightbox ======
const galleryImages = document.querySelectorAll('.gallery img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.getElementById('closeBtn');

galleryImages.forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightbox.classList.add('open');
  });
});

closeBtn.addEventListener('click', () => {
  lightbox.classList.remove('open');
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('open');
  }
});

// ====== Contacto: Validación simple ======
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('¡Gracias por contactarnos! Pronto responderemos a tu mensaje.');
    contactForm.reset();
  });
}

// ====== Slider de Imágenes ======
const sliderImages = document.querySelectorAll('.slider-img');
const sliderPrev = document.getElementById('sliderPrev');
const sliderNext = document.getElementById('sliderNext');
const sliderDots = document.getElementById('sliderDots');
let sliderIndex = 0;
let sliderInterval;

function showSliderImage(idx) {
  sliderImages.forEach((img, i) => {
    img.classList.toggle('active', i === idx);
  });
  if (sliderDots) {
    Array.from(sliderDots.children).forEach((dot, i) => {
      dot.classList.toggle('active', i === idx);
    });
  }
}

function createSliderDots() {
  if (!sliderDots) return;
  sliderDots.innerHTML = '';
  sliderImages.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.addEventListener('click', () => {
      sliderIndex = i;
      showSliderImage(sliderIndex);
      resetSliderInterval();
    });
    if (i === 0) dot.classList.add('active');
    sliderDots.appendChild(dot);
  });
}

function nextSliderImage() {
  sliderIndex = (sliderIndex + 1) % sliderImages.length;
  showSliderImage(sliderIndex);
}

function prevSliderImage() {
  sliderIndex = (sliderIndex - 1 + sliderImages.length) % sliderImages.length;
  showSliderImage(sliderIndex);
}

function startSliderInterval() {
  sliderInterval = setInterval(nextSliderImage, 4000);
}

function resetSliderInterval() {
  clearInterval(sliderInterval);
  startSliderInterval();
}

if (sliderImages.length) {
  createSliderDots();
  showSliderImage(sliderIndex);
  if (sliderPrev && sliderNext) {
    sliderPrev.addEventListener('click', () => {
      prevSliderImage();
      resetSliderInterval();
    });
    sliderNext.addEventListener('click', () => {
      nextSliderImage();
      resetSliderInterval();
    });
  }
  startSliderInterval();
}
