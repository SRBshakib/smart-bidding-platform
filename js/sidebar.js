/**
 * Professional Sidebar Controller
 * Handles sidebar toggle, dark mode, and navigation
 */

class SidebarController {
    constructor() {
        this.body = document.querySelector('body');
        this.sidebar = this.body.querySelector('nav.sidebar');
        this.toggle = this.body.querySelector('.toggle');
        this.searchBtn = this.body.querySelector('.search-box');
        this.modeSwitch = this.body.querySelector('.toggle-switch');
        this.modeText = this.body.querySelector('.mode-text');
        
        this.init();
    }

    init() {
        this.setupToggle();
        this.setupDarkMode();
        this.setupActiveLink();
        this.setupSearch();
        this.setupTooltips();
        this.loadPreferences();
    }

    setupToggle() {
        if (this.toggle) {
            this.toggle.addEventListener('click', () => {
                this.sidebar.classList.toggle('close');
                this.savePreference('sidebarClosed', this.sidebar.classList.contains('close'));
                
                // Animate toggle icon
                this.toggle.style.transform = 'rotate(180deg) scale(1.2)';
                setTimeout(() => {
                    this.toggle.style.transform = '';
                }, 300);
            });
        }

        // Close sidebar on mobile when clicking outside
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                if (!this.sidebar.contains(e.target) && !e.target.closest('.toggle')) {
                    this.sidebar.classList.add('close');
                }
            }
        });
    }

    setupDarkMode() {
        if (this.modeSwitch) {
            this.modeSwitch.addEventListener('click', () => {
                this.body.classList.toggle('dark');
                const isDark = this.body.classList.contains('dark');
                
                if (this.modeText) {
                    this.modeText.innerText = isDark ? 'Light mode' : 'Dark mode';
                }
                
                this.savePreference('darkMode', isDark);
                
                // Animate switch
                const switchEl = this.modeSwitch.querySelector('.switch');
                if (switchEl) {
                    switchEl.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        switchEl.style.transform = '';
                    }, 200);
                }

                // Show notification
                if (typeof showNotification === 'function') {
                    showNotification(
                        `${isDark ? 'Dark' : 'Light'} mode enabled`,
                        'success',
                        2000
                    );
                }
            });
        }
    }

    setupActiveLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.sidebar .nav-link a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes(currentPage)) {
                link.classList.add('active');
                
                // Highlight parent menu item if in submenu
                const parentLi = link.closest('li');
                if (parentLi) {
                    parentLi.classList.add('active');
                }
            }

            // Add click animation
            link.addEventListener('click', function(e) {
                // Remove active from all links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Add active to clicked link
                this.classList.add('active');
                
                // Ripple effect
                const ripple = document.createElement('span');
                ripple.className = 'nav-ripple';
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    setupSearch() {
        if (this.searchBtn) {
            this.searchBtn.addEventListener('click', () => {
                this.sidebar.classList.remove('close');
                
                const input = this.searchBtn.querySelector('input');
                if (input) {
                    setTimeout(() => input.focus(), 300);
                }
            });

            // Live search functionality
            const searchInput = this.searchBtn.querySelector('input');
            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    this.filterMenuItems(e.target.value);
                });
            }
        }
    }

    filterMenuItems(query) {
        const navLinks = document.querySelectorAll('.sidebar .nav-link');
        const lowerQuery = query.toLowerCase();

        navLinks.forEach(link => {
            const text = link.querySelector('.text')?.textContent.toLowerCase() || '';
            
            if (text.includes(lowerQuery) || query === '') {
                link.style.display = '';
                link.style.animation = 'slideIn 0.3s ease forwards';
            } else {
                link.style.display = 'none';
            }
        });
    }

    setupTooltips() {
        const navLinks = document.querySelectorAll('.sidebar .nav-link a');
        
        navLinks.forEach(link => {
            const text = link.querySelector('.text')?.textContent;
            if (text) {
                link.setAttribute('data-tooltip', text);
            }
        });
    }

    savePreference(key, value) {
        try {
            localStorage.setItem(`sidebar_${key}`, JSON.stringify(value));
        } catch (e) {
            console.warn('Could not save preference:', e);
        }
    }

    loadPreferences() {
        try {
            // Load sidebar state
            const sidebarClosed = JSON.parse(localStorage.getItem('sidebar_sidebarClosed'));
            if (sidebarClosed && this.sidebar) {
                this.sidebar.classList.add('close');
            }

            // Load dark mode
            const darkMode = JSON.parse(localStorage.getItem('sidebar_darkMode'));
            if (darkMode) {
                this.body.classList.add('dark');
                if (this.modeText) {
                    this.modeText.innerText = 'Light mode';
                }
            }
        } catch (e) {
            console.warn('Could not load preferences:', e);
        }
    }

    // Public methods
    open() {
        if (this.sidebar) {
            this.sidebar.classList.remove('close');
        }
    }

    close() {
        if (this.sidebar) {
            this.sidebar.classList.add('close');
        }
    }

    toggleDarkMode() {
        this.body.classList.toggle('dark');
    }
}

// Initialize sidebar when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.sidebarController = new SidebarController();
    });
} else {
    window.sidebarController = new SidebarController();
}

// Add custom styles for nav ripple effect
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .nav-ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(46, 125, 50, 0.3);
        width: 100%;
        height: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        animation: navRipple 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes navRipple {
        to {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
        }
    }

    /* Smooth page transition */
    .page-transition {
        animation: pageTransitionIn 0.4s ease-out;
    }

    @keyframes pageTransitionIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(rippleStyle);

// Export for use in other files
window.SidebarController = SidebarController;
