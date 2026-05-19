// --- 1. Sticky Navbar & Mobile Menu ---
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const navItems = document.querySelectorAll('.nav-links li a');

// Sticky Navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close Mobile Menu on Link Click
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.querySelector('i').classList.remove('fa-times');
        hamburger.querySelector('i').classList.add('fa-bars');
    });
});

// --- 2. Countdown Timer ---
// Set target date for October 15, 2026
const targetDate = new Date('October 15, 2026 18:00:00').getTime();

const countdown = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display
    document.getElementById('days').innerText = days < 10 ? '0' + days : days;
    document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;

    // If countdown finishes
    if (distance < 0) {
        clearInterval(countdown);
        document.getElementById('countdown').innerHTML = "<h3>The Event Has Started!</h3>";
    }
}, 1000);

// --- 3. Scroll Reveal Animations ---
function reveal() {
    const reveals = document.querySelectorAll('.scroll-reveal');
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

window.addEventListener('scroll', reveal);
// Trigger once on load
reveal();

// --- 4. Ticket Modal Logic ---
const modal = document.getElementById('ticketModal');
const modalOpenBtns = document.querySelectorAll('.open-modal');
const closeBtn = document.querySelector('.close-btn');
const bookingForm = document.getElementById('bookingForm');

// Open Modal
modalOpenBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
        
        // Pre-select dropdown based on button clicked
        const card = e.target.closest('.pricing-card');
        if (card) {
            const planName = card.querySelector('h3').innerText.toLowerCase();
            const select = bookingForm.querySelector('select');
            if (planName.includes('standard')) select.value = 'standard';
            if (planName.includes('premium')) select.value = 'premium';
            if (planName.includes('vip')) select.value = 'vip';
        }
    });
});

// Close Modal
closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

// Close on outside click
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// Form Submit handling
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = bookingForm.querySelector('button');
    const originalText = btn.innerText;
    btn.innerText = 'Processing...';
    btn.style.opacity = '0.7';
    
    // Simulate API call
    setTimeout(() => {
        btn.innerText = 'Success! Tickets Booked.';
        btn.style.backgroundColor = '#28a745';
        btn.style.color = '#fff';
        
        setTimeout(() => {
            modal.classList.remove('active');
            bookingForm.reset();
            btn.innerText = originalText;
            btn.style.backgroundColor = '';
            btn.style.color = '';
            btn.style.opacity = '1';
        }, 2000);
    }, 1500);
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'Sending...';
        
        setTimeout(() => {
            btn.innerText = 'Message Sent!';
            btn.style.backgroundColor = '#28a745';
            btn.style.color = '#fff';
            
            setTimeout(() => {
                contactForm.reset();
                btn.innerText = originalText;
                btn.style.backgroundColor = '';
                btn.style.color = '';
            }, 3000);
        }, 1000);
    });
}

// --- 5. Lightbox for Gallery ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        lightboxImg.src = imgSrc;
        lightbox.classList.add('active');
    });
});

lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        lightbox.classList.remove('active');
    }
});
