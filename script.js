// ============================================
// 3D Background Animation with Three.js
// ============================================
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('bg-canvas'),
    alpha: true,
    antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Create 3D Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1000;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 100;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    color: 0x0071e3,
    transparent: true,
    opacity: 0.8
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    particlesMesh.rotation.x += 0.0005;
    particlesMesh.rotation.y += 0.0005;
    renderer.render(scene, camera);
}

animate();

// Resize Handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ============================================
// GSAP Scroll Animations
// ============================================
gsap.registerPlugin(ScrollTrigger);

// Animate Hero Sections
gsap.utils.toArray('.hero-main, .hero-secondary, .hero-small').forEach(section => {
    gsap.from(section.querySelector('.hero-content-center'), {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
});

// Parallax Effect for Images
gsap.utils.toArray('.parallax-img').forEach(img => {
    gsap.to(img, {
        scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        },
        y: -50,
        ease: 'none'
    });
});

// Product Cards Scroll Reveal
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('revealed');
            }, index * 100);
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
});

// ============================================
// Language Switcher
// ============================================
const langButtons = document.querySelectorAll('.lang-btn');
let currentLang = 'ar';

langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        
        if (lang === currentLang) return;
        
        // Update active button
        langButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Change direction
        if (lang === 'ar') {
            document.documentElement.setAttribute('lang', 'ar');
            document.documentElement.setAttribute('dir', 'rtl');
        } else {
            document.documentElement.setAttribute('lang', 'en');
            document.documentElement.setAttribute('dir', 'ltr');
        }
        
        // Update all text elements
        document.querySelectorAll('[data-ar][data-en]').forEach(el => {
            const text = el.getAttribute(`data-${lang}`);
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = text;
            } else {
                el.textContent = text;
            }
        });
        
        currentLang = lang;
        
        // Animate transition
        gsap.from('body', {
            opacity: 0.8,
            duration: 0.3,
            ease: 'power2.inOut'
        });
    });
});

// ============================================
// Shopping Cart
// ============================================
let cartCount = 0;
const cartCountElement = document.querySelector('.cart-count');
const buyButtons = document.querySelectorAll('.btn-buy');

buyButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Increment cart
        cartCount++;
        cartCountElement.textContent = cartCount;
        
        // Animate cart icon
        gsap.to('.cart-icon', {
            scale: 1.3,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut'
        });
        
        // Button feedback
        const originalText = this.textContent;
        const lang = currentLang;
        this.textContent = lang === 'ar' ? '✓ تمت الإضافة' : '✓ Added';
        this.style.background = '#34c759';
        
        setTimeout(() => {
            this.textContent = originalText;
            this.style.background = '';
        }, 2000);
        
        // Show notification
        showNotification(
            lang === 'ar' ? 'تمت إضافة المنتج إلى السلة' : 'Product added to cart'
        );
    });
});

// ============================================
// Notification System
// ============================================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        ${currentLang === 'ar' ? 'right: 20px' : 'left: 20px'};
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        font-weight: 500;
        font-size: 0.95rem;
        z-index: 10000;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    gsap.from(notification, {
        x: currentLang === 'ar' ? 400 : -400,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out'
    });
    
    // Animate out
    setTimeout(() => {
        gsap.to(notification, {
            x: currentLang === 'ar' ? 400 : -400,
            opacity: 0,
            duration: 0.5,
            ease: 'power3.in',
            onComplete: () => notification.remove()
        });
    }, 3000);
}

// ============================================
// Smooth Scroll for Navigation
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                scrollTo: {
                    y: target,
                    offsetY: 44
                },
                duration: 1,
                ease: 'power3.inOut'
            });
        }
    });
});

// ============================================
// Navbar Scroll Effect
// ============================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        gsap.to(navbar, {
            y: -100,
            duration: 0.3,
            ease: 'power2.inOut'
        });
    } else {
        gsap.to(navbar, {
            y: 0,
            duration: 0.3,
            ease: 'power2.inOut'
        });
    }
    
    // Add shadow on scroll
    if (currentScroll > 10) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// Product Image Hover Effect
// ============================================
document.querySelectorAll('.product-card-apple').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        const img = card.querySelector('.product-img-hover');
        if (img) {
            gsap.to(img, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.5,
                ease: 'power2.out'
            });
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const img = card.querySelector('.product-img-hover');
        if (img) {
            gsap.to(img, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        }
    });
});

// ============================================
// Color Selector
// ============================================
document.querySelectorAll('.color-dot').forEach(dot => {
    dot.addEventListener('click', function() {
        // Remove active class from siblings
        this.parentElement.querySelectorAll('.color-dot').forEach(d => {
            d.style.transform = 'scale(1)';
            d.style.border = '1px solid rgba(0, 0, 0, 0.1)';
        });
        
        // Add active state
        this.style.transform = 'scale(1.3)';
        this.style.border = '2px solid var(--accent-color)';
        
        // Animate product image
        const card = this.closest('.product-card-apple');
        const img = card.querySelector('.product-img-hover');
        
        gsap.to(img, {
            scale: 0.95,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut'
        });
    });
});

// ============================================
// Search Icon Click
// ============================================
document.querySelector('.search-icon').addEventListener('click', () => {
    const searchText = currentLang === 'ar' ? 'البحث قريباً! 🔍' : 'Search coming soon! 🔍';
    showNotification(searchText);
});

// ============================================
// Cart Icon Click
// ============================================
document.querySelector('.cart-icon').addEventListener('click', () => {
    if (cartCount > 0) {
        const cartText = currentLang === 'ar' 
            ? `لديك ${cartCount} منتج في السلة` 
            : `You have ${cartCount} item${cartCount > 1 ? 's' : ''} in cart`;
        showNotification(cartText);
    } else {
        const emptyText = currentLang === 'ar' ? 'السلة فارغة' : 'Cart is empty';
        showNotification(emptyText);
    }
});

// ============================================
// Floating Animation for Hero Images
// ============================================
gsap.to('.floating-device', {
    y: -20,
    duration: 3,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1
});

// ============================================
// Page Load Animation
// ============================================
window.addEventListener('load', () => {
    gsap.from('body', {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut'
    });
    
    // Animate navbar
    gsap.from('.navbar', {
        y: -100,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2
    });
    
    // Animate hero content
    gsap.from('.hero-content-center > *', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.5
    });
});

// ============================================
// Mouse Cursor Effect (Optional)
// ============================================
const cursor = document.createElement('div');
cursor.style.cssText = `
    width: 20px;
    height: 20px;
    border: 2px solid var(--accent-color);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.2s ease;
    display: none;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.display = 'block';
    gsap.to(cursor, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.3,
        ease: 'power2.out'
    });
});

// Enlarge cursor on hover
document.querySelectorAll('a, button, .product-card-apple').forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursor, {
            scale: 2,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    el.addEventListener('mouseleave', () => {
        gsap.to(cursor, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// ============================================
// Console Message
// ============================================
console.log('%c🍎 مرحباً بك في موقع العهد!', 'font-size: 20px; color: #0071e3; font-weight: bold;');
console.log('%cWelcome to Al-Ahad Store!', 'font-size: 16px; color: #0071e3;');
console.log('%cBuilt with ❤️ using Three.js, GSAP, and modern web technologies', 'font-size: 12px; color: #86868b;');
