/**
 * Professional Animation Library
 * Provides smooth animations and transitions for all pages
 */

class AnimationController {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollReveal();
        this.setupCounterAnimation();
        this.setupRippleEffect();
        this.setupPageTransitions();
        this.setupNotificationSystem();
        this.setupLoadingStates();
    }

    // Scroll Reveal Animation
    setupScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.scroll-reveal').forEach(element => {
            observer.observe(element);
        });
    }

    // Counter Animation
    setupCounterAnimation() {
        const counters = document.querySelectorAll('[data-counter]');
        
        const animateCounter = (element) => {
            const target = parseInt(element.getAttribute('data-counter'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    element.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target;
                }
            };

            updateCounter();
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => observer.observe(counter));
    }

    // Ripple Effect
    setupRippleEffect() {
        document.addEventListener('click', (e) => {
            const target = e.target.closest('.ripple');
            if (!target) return;

            const ripple = document.createElement('span');
            const rect = target.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add('ripple-effect');

            target.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    }

    // Page Transitions
    setupPageTransitions() {
        // Fade in page on load
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
        });

        // Smooth navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Notification System
    setupNotificationSystem() {
        window.showNotification = (message, type = 'success', duration = 3000) => {
            const notification = document.createElement('div');
            notification.className = `notification notification-${type} notification-enter`;
            notification.innerHTML = `
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            `;

            document.body.appendChild(notification);

            // Position notifications
            const notifications = document.querySelectorAll('.notification');
            notifications.forEach((notif, index) => {
                notif.style.top = `${20 + (index * 70)}px`;
            });

            // Close button
            notification.querySelector('.notification-close').addEventListener('click', () => {
                notification.style.animation = 'slideOutRight 0.4s ease-out forwards';
                setTimeout(() => notification.remove(), 400);
            });

            // Auto remove
            if (duration > 0) {
                setTimeout(() => {
                    notification.style.animation = 'slideOutRight 0.4s ease-out forwards';
                    setTimeout(() => notification.remove(), 400);
                }, duration);
            }
        };
    }

    // Loading States
    setupLoadingStates() {
        window.showLoading = (element) => {
            element.classList.add('loading');
            element.setAttribute('data-original-text', element.innerHTML);
            element.innerHTML = '<span class="loading-spinner"></span>';
            element.disabled = true;
        };

        window.hideLoading = (element, originalText) => {
            element.classList.remove('loading');
            element.innerHTML = originalText || element.getAttribute('data-original-text');
            element.disabled = false;
        };
    }

    // Stagger Animation
    staggerAnimation(elements, delay = 100) {
        elements.forEach((element, index) => {
            element.style.animationDelay = `${index * delay}ms`;
            element.classList.add('stagger-item');
        });
    }

    // Card Flip
    flipCard(card) {
        card.classList.toggle('flipped');
    }

    // Smooth Scroll to Top
    scrollToTop(duration = 500) {
        const start = window.pageYOffset;
        const startTime = performance.now();

        const scroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = this.easeInOutCubic(progress);

            window.scrollTo(0, start * (1 - easeProgress));

            if (progress < 1) {
                requestAnimationFrame(scroll);
            }
        };

        requestAnimationFrame(scroll);
    }

    // Easing function
    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    // Progress Bar Animation
    animateProgressBar(element, targetValue, duration = 1000) {
        element.style.width = '0%';
        setTimeout(() => {
            element.style.transition = `width ${duration}ms ease-out`;
            element.style.width = `${targetValue}%`;
        }, 10);
    }

    // Shake Element (for validation errors)
    shakeElement(element) {
        element.classList.add('animate-shake');
        setTimeout(() => element.classList.remove('animate-shake'), 500);
    }

    // Pulse Element (for attention)
    pulseElement(element, duration = 2000) {
        element.classList.add('animate-pulse');
        setTimeout(() => element.classList.remove('animate-pulse'), duration);
    }

    // Fade Out and Remove
    fadeOutAndRemove(element, duration = 300) {
        element.style.transition = `opacity ${duration}ms ease-out`;
        element.style.opacity = '0';
        setTimeout(() => element.remove(), duration);
    }

    // Slide Toggle
    slideToggle(element, duration = 300) {
        if (element.style.display === 'none' || !element.style.display) {
            this.slideDown(element, duration);
        } else {
            this.slideUp(element, duration);
        }
    }

    slideDown(element, duration = 300) {
        element.style.display = 'block';
        element.style.height = '0';
        element.style.overflow = 'hidden';
        element.style.transition = `height ${duration}ms ease-out`;
        
        const height = element.scrollHeight;
        setTimeout(() => {
            element.style.height = `${height}px`;
        }, 10);

        setTimeout(() => {
            element.style.height = '';
            element.style.overflow = '';
        }, duration);
    }

    slideUp(element, duration = 300) {
        const height = element.scrollHeight;
        element.style.height = `${height}px`;
        element.style.overflow = 'hidden';
        element.style.transition = `height ${duration}ms ease-out`;

        setTimeout(() => {
            element.style.height = '0';
        }, 10);

        setTimeout(() => {
            element.style.display = 'none';
            element.style.height = '';
            element.style.overflow = '';
        }, duration);
    }
}

// Initialize Animation Controller
const animationController = new AnimationController();

// Scroll to Top Button
const createScrollToTopButton = () => {
    const button = document.createElement('button');
    button.className = 'scroll-to-top';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    });

    button.addEventListener('click', () => {
        animationController.scrollToTop();
    });
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createScrollToTopButton);
} else {
    createScrollToTopButton();
}

// Export for use in other files
window.AnimationController = AnimationController;
window.animationController = animationController;

// Additional notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }

    .notification {
        position: fixed;
        right: 20px;
        background: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 10000;
        min-width: 300px;
        max-width: 400px;
    }

    .notification i {
        font-size: 20px;
    }

    .notification-success {
        border-left: 4px solid #28a745;
    }

    .notification-success i {
        color: #28a745;
    }

    .notification-error {
        border-left: 4px solid #dc3545;
    }

    .notification-error i {
        color: #dc3545;
    }

    .notification-info {
        border-left: 4px solid #17a2b8;
    }

    .notification-info i {
        color: #17a2b8;
    }

    .notification-close {
        margin-left: auto;
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        color: #666;
        padding: 0;
        width: 24px;
        height: 24px;
    }

    .notification-close:hover {
        color: #333;
    }

    .scroll-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #2e7d32;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    }

    .scroll-to-top.visible {
        opacity: 1;
        visibility: visible;
    }

    .scroll-to-top:hover {
        background: #1b5e20;
        transform: translateY(-3px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }

    .scroll-to-top:active {
        transform: translateY(-1px);
    }

    body.loaded {
        animation: fadeIn 0.5s ease-out;
    }

    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleAnimation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes rippleAnimation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
