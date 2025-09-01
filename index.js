// Variables globales
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');

// Navigation mobile
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const header = document.getElementById('header');

// Toggle menu mobile
mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Navigation entre les pages
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Fermer le menu mobile
        navMenu.classList.remove('active');
        
        // Retirer la classe active de tous les liens
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Ajouter la classe active au lien cliqué
        link.classList.add('active');
        
        // Cacher toutes les pages
        pages.forEach(page => page.classList.remove('active'));
        
        // Afficher la page correspondante
        const targetPage = link.getAttribute('data-page');
        document.getElementById(targetPage).classList.add('active');
        
        // Scroll vers le haut
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Header avec effet scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Fonctions du carrousel
function showSlide(index) {
    currentSlide = index;
    const container = document.getElementById('carousel-container');
    container.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Mettre à jour les dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

function currentSlideFunc(index) {
    showSlide(index - 1);
}

// Auto-play carrousel
setInterval(nextSlide, 5000);

// Animation des éléments au scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .gallery-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}

window.addEventListener('scroll', animateOnScroll);

// Animation au chargement
window.addEventListener('load', () => {
    animateOnScroll();
});

// Smooth scroll pour les liens
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Le formulaire sera soumis normalement à Formspree
        const submitBtn = this.querySelector('.submit-btn');
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        // Réinitialiser après 3 secondes si pas de redirection
        setTimeout(() => {
            submitBtn.textContent = 'Envoyer le Message';
            submitBtn.disabled = false;
        }, 1000);
    });
}

// Responsive gallery grid
function adjustGalleryGrid() {
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid && window.innerWidth < 768) {
        galleryGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
    } else if (galleryGrid) {
        galleryGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
    }
}

window.addEventListener('resize', adjustGalleryGrid);
adjustGalleryGrid();

// Lazy loading pour les images (simulation)
function lazyLoadImages() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
                observer.unobserve(entry.target);
            }
        });
    });
    
    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        imageObserver.observe(item);
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    lazyLoadImages();
    
    // Précharger les images du carrousel (simulation)
    slides.forEach((slide, index) => {
        if (index === 0) {
            slide.style.opacity = '1';
        }
    });
});



