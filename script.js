// ============================================
// GSAP ScrollTrigger Registration
// ============================================
gsap.registerPlugin(ScrollTrigger);

// ============================================
// Variables
// ============================================
let cartCount = 0;
let currentLang = 'ar';

// Language Data
const langData = {
    ar: {
        bannerText: 'احصل على توصيل مجاني لجميع الطلبات في سلطنة عمان',
        navStore: 'المتجر',
        navMac: 'Mac',
        navIpad: 'iPad',
        navIphone: 'iPhone',
        navSupport: 'الدعم',
        searchSoon: 'البحث قريباً 🔍',
        cartEmpty: 'السلة فارغة',
        cartItems: 'لديك {count} منتج في السلة',
        productAdded: 'تمت إضافة المنتج إلى السلة',
        learnMore: 'اعرف المزيد',
        buy: 'اشترِ',
        buyNow: 'اشترِ الآن',
        added: '✓ تمت الإضافة'
    },
    en: {
        bannerText: 'Get free delivery on all orders in Oman',
        navStore: 'Store',
        navMac: 'Mac',
        navIpad: 'iPad',
        navIphone: 'iPhone',
        navSupport: 'Support',
        searchSoon: 'Search coming soon 🔍',
        cartEmpty: 'Cart is empty',
        cartItems: 'You have {count} item{s} in cart',
        productAdded: 'Product added to cart',
        learnMore: 'Learn more',
        buy: 'Buy',
        buyNow: 'Buy Now',
        added: '✓ Added'
    }
};

// Product Details Data
const productDetails = {
    'iphone-15-pro-max': {
        name: 'iPhone 15 Pro Max',
        tagline: 'iPhone الأقوى على الإطلاق',
        price: 'من 499 ر.ع.',
        image: 'https://www.stickpng.com/assets/images/580b57fcd9996e24bc43c516.png',
        features: [
            'شريحة A17 Pro مع GPU 6 نواة',
            'نظام كاميرا Pro 48MP',
            'شاشة Super Retina XDR 6.7 بوصة',
            'تصميم من التيتانيوم',
            'زر الإجراء القابل للتخصيص',
            'منفذ USB-C',
            'مقاومة للماء IP68'
        ]
    },
    'iphone-15-pro': {
        name: 'iPhone 15 Pro',
        tagline: 'قوي جداً. خفيف جداً. Pro جداً.',
        price: 'من 429 ر.ع.',
        image: 'https://www.stickpng.com/assets/images/580b57fcd9996e24bc43c516.png',
        features: [
            'شريحة A17 Pro مع GPU 5 نواة',
            'نظام كاميرا Pro 48MP',
            'شاشة Super Retina XDR 6.1 بوصة',
            'تصميم من التيتانيوم',
            'زر الإجراء القابل للتخصيص',
            'منفذ USB-C',
            'مقاومة للماء IP68'
        ]
    },
    'macbook-pro-16': {
        name: 'MacBook Pro 16"',
        tagline: 'أقوى MacBook Pro على الإطلاق',
        price: 'من 1,119 ر.ع.',
        image: 'https://www.freeiconspng.com/uploads/apple-brand-macbook-photo-20.png',
        features: [
            'شريحة M3 Max مع CPU 16 نواة',
            'GPU حتى 40 نواة',
            'ذاكرة موحدة حتى 128 جيجابايت',
            'شاشة Liquid Retina XDR 16.2 بوصة',
            'عمر بطارية حتى 22 ساعة',
            'ستة منافذ Thunderbolt 4',
            'كاميرا FaceTime HD 1080p'
        ]
    },
    'ipad-pro': {
        name: 'iPad Pro',
        tagline: 'تجربة iPad الأقصى',
        price: 'من 499 ر.ع.',
        image: 'https://www.stickpng.com/assets/images/58428c4ca6515b1e0ad75ab1.png',
        features: [
            'شريحة M2 مع CPU 8 نواة',
            'GPU 10 نواة',
            'شاشة Liquid Retina XDR',
            'دعم Apple Pencil الجيل الثاني',
            'كاميرا خلفية 12MP',
            'كاميرا أمامية TrueDepth',
            'منفذ Thunderbolt / USB 4'
        ]
    }
};

// ============================================
// GSAP Animations (Apple Style)
// ============================================

// Page Load Animation
window.addEventListener('load', () => {
    const tl = gsap.timeline();
    
    tl.from('.navbar', {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    })
    .from('.hero-new', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
    }, '-=0.4')
    .from('.hero-title', {
        y: 50,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.3')
    .from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
    }, '-=0.4')
    .from('.hero-links a', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out'
    }, '-=0.3')
    .from('.hero-image img', {
        y: 100,
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.5');
});

// Scroll Animations
gsap.utils.toArray('.scroll-reveal').forEach((element, index) => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 1
        },
        y: 100,
        opacity: 0,
        scale: 0.9,
        duration: 1,
        delay: index * 0.1,
        ease: 'power3.out'
    });
});

// Parallax Effects
gsap.utils.toArray('.parallax-element').forEach(element => {
    gsap.to(element, {
        scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
        },
        y: -50,
        ease: 'none'
    });
});

// Navbar Hide/Show on Scroll
ScrollTrigger.create({
    start: 'top -80',
    end: 99999,
    onUpdate: (self) => {
        if (self.direction === -1) {
            gsap.to('.navbar', {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        } else {
            if (window.scrollY > 100) {
                gsap.to('.navbar', {
                    y: -100,
                    duration: 0.3,
                    ease: 'power2.in'
                });
            }
        }
    }
});

// Navbar Background on Scroll
ScrollTrigger.create({
    start: 'top -10',
    end: 99999,
    onEnter: () => {
        gsap.to('.navbar', {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            duration: 0.3
        });
    },
    onLeaveBack: () => {
        gsap.to('.navbar', {
            backgroundColor: 'rgba(255, 255, 255, 0.72)',
            boxShadow: 'none',
            duration: 0.3
        });
    }
});

// ============================================
// Language Switcher
// ============================================
function switchLang(lang) {
    if (lang === currentLang) return;
    
    currentLang = lang;
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick').includes(lang)) {
            btn.classList.add('active');
        }
    });
    
    // Change direction and language
    if (lang === 'ar') {
        document.documentElement.setAttribute('lang', 'ar');
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.setAttribute('lang', 'en');
        document.documentElement.setAttribute('dir', 'ltr');
    }
    
    // Update text content
    updateLanguageContent(lang);
    
    // Animate transition
    gsap.from('body', {
        opacity: 0.9,
        duration: 0.3,
        ease: 'power2.inOut'
    });
}

function updateLanguageContent(lang) {
    const data = langData[lang];
    
    // Update banner
    document.getElementById('banner-text').textContent = data.bannerText;
    
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks[0].textContent = data.navStore;
    navLinks[1].textContent = data.navMac;
    navLinks[2].textContent = data.navIpad;
    navLinks[3].textContent = data.navIphone;
    navLinks[4].textContent = data.navSupport;
    
    // Update buttons
    document.querySelectorAll('.link-primary').forEach(link => {
        if (link.textContent.includes('اعرف') || link.textContent.includes('Learn')) {
            link.textContent = data.learnMore;
        }
    });
    
    document.querySelectorAll('.link-secondary').forEach(link => {
        if (link.textContent.includes('اشترِ') || link.textContent.includes('Buy')) {
            link.textContent = data.buy;
        }
    });
    
    document.querySelectorAll('.btn-buy').forEach(btn => {
        if (btn.textContent.includes('اشترِ') || btn.textContent.includes('Buy')) {
            btn.textContent = data.buyNow;
        }
    });
}

// ============================================
// Shopping Cart Functions
// ============================================
function addToCart(productName) {
    cartCount++;
    updateCartDisplay();
    
    // Find the button that was clicked
    const buttons = document.querySelectorAll('.btn-buy');
    let clickedButton = null;
    
    buttons.forEach(btn => {
        if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(productName)) {
            clickedButton = btn;
        }
    });
    
    if (clickedButton) {
        // Button animation
        const originalText = clickedButton.textContent;
        const data = langData[currentLang];
        
        gsap.to(clickedButton, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            onComplete: () => {
                clickedButton.textContent = data.added;
                clickedButton.style.background = '#34c759';
                
                setTimeout(() => {
                    clickedButton.textContent = originalText;
                    clickedButton.style.background = '';
                }, 2000);
            }
        });
    }
    
    // Cart icon animation
    gsap.timeline()
        .to('.cart-icon', {
            scale: 1.4,
            duration: 0.2,
            ease: 'back.out(3)'
        })
        .to('.cart-icon', {
            scale: 1,
            duration: 0.3,
            ease: 'elastic.out(1, 0.3)'
        });
    
    // Show notification
    showNotification(langData[currentLang].productAdded);
}

function updateCartDisplay() {
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cartCount;
    
    if (cartCount > 0) {
        cartCountElement.classList.add('show');
    } else {
        cartCountElement.classList.remove('show');
    }
}

function showCart() {
    const data = langData[currentLang];
    if (cartCount > 0) {
        const message = data.cartItems
            .replace('{count}', cartCount)
            .replace('{s}', cartCount > 1 ? 's' : '');
        showNotification(message);
    } else {
        showNotification(data.cartEmpty);
    }
}

// ============================================
// Notification System
// ============================================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'apple-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="10" fill="#34c759"/>
                <path d="M6 10L9 13L14 7" stroke="white" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 70px;
        ${currentLang === 'ar' ? 'right: 20px' : 'left: 20px'};
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        color: var(--text-dark);
        padding: 16px 24px;
        border-radius: 14px;
        font-weight: 500;
        font-size: 0.95rem;
        z-index: 10001;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        border: 1px solid rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        gap: 12px;
    `;
    
    document.body.appendChild(notification);
    
    // Slide in animation
    gsap.from(notification, {
        x: currentLang === 'ar' ? 400 : -400,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
    });
    
    // Slide out animation
    setTimeout(() => {
        gsap.to(notification, {
            x: currentLang === 'ar' ? 400 : -400,
            opacity: 0,
            duration: 0.4,
            ease: 'power2.in',
            onComplete: () => notification.remove()
        });
    }, 3000);
}

function showNotif(message) {
    showNotification(message);
}

// ============================================
// Product Detail Modal
// ============================================
function openProductDetail(productId) {
    const product = productDetails[productId];
    if (!product) return;
    
    const modal = document.getElementById('product-modal');
    const content = document.getElementById('product-detail-content');
    
    content.innerHTML = `
        <div class="product-detail">
            <div class="product-detail-image">
                <img src="${product.image}" alt="${product.name}" class="floating-device">
            </div>
            <div class="product-detail-info">
                <h2>${product.name}</h2>
                <p class="tagline">${product.tagline}</p>
                <p class="price">${product.price}</p>
                <div class="product-features">
                    <h3>المميزات الرئيسية</h3>
                    <ul>
                        ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="product-actions">
                    <button class="btn-buy" onclick="addToCart('${product.name}'); closeProductDetail();">
                        ${langData[currentLang].buyNow}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    
    // Animate modal
    gsap.from('.modal-content', {
        scale: 0.8,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.out'
    });
}

function closeProductDetail() {
    const modal = document.getElementById('product-modal');
    
    gsap.to('.modal-content', {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
            modal.style.display = 'none';
        }
    });
}

// ============================================
// Color Selector
// ============================================
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('color-dot')) {
        // Remove active class from siblings
        const siblings = e.target.parentElement.querySelectorAll('.color-dot');
        siblings.forEach(dot => {
            dot.classList.remove('active');
            gsap.to(dot, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        // Add active class to clicked dot
        e.target.classList.add('active');
        gsap.to(e.target, {
            scale: 1.3,
            duration: 0.3,
            ease: 'back.out(2)'
        });
        
        // Animate product image
        const card = e.target.closest('.product-card');
        const img = card.querySelector('.product-img');
        
        gsap.timeline()
            .to(img, {
                scale: 0.9,
                opacity: 0.7,
                duration: 0.2,
                ease: 'power2.in'
            })
            .to(img, {
                scale: 1,
                opacity: 1,
                duration: 0.3,
                ease: 'back.out(1.5)'
            });
    }
});

// ============================================
// Smooth Scroll Navigation
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            gsap.to(window, {
                duration: 1.2,
                scrollTo: {
                    y: target,
                    offsetY: 44
                },
                ease: 'power4.inOut'
            });
        }
    });
});

// ============================================
// Product Card 3D Hover Effect
// ============================================
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * 5;
        const rotateY = ((x - centerX) / centerX) * 5;
        
        const img = card.querySelector('.product-img');
        if (img) {
            gsap.to(img, {
                rotateX: -rotateX,
                rotateY: rotateY,
                transformPerspective: 1000,
                duration: 0.5,
                ease: 'power2.out'
            });
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const img = card.querySelector('.product-img');
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
// Close Modal on Outside Click
// ============================================
window.addEventListener('click', function(e) {
    const modal = document.getElementById('product-modal');
    if (e.target === modal) {
        closeProductDetail();
    }
});

// ============================================
// Initialize
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart display
    updateCartDisplay();
    
    // Initialize language
    updateLanguageContent(currentLang);
    
    console.log('🍎 مرحباً بك في موقع العهد - Al-Ahad Store');
    console.log('Built with GSAP + Apple Design System');
});

// ============================================
// Intersection Observer for Scroll Reveals
// ============================================
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

// Observe all scroll reveal elements
document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
});
