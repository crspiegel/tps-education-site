// Load header from external file and initialize
async function loadHeader() {
    try {
        const response = await fetch('header.html');
        const html = await response.text();
        const headerContainer = document.getElementById('header-container');
        if (headerContainer) {
            headerContainer.innerHTML = html;
            // Initialize mobile menu after header is loaded
            initializeHeaderScripts();
        }
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

// Initialize header scripts (mobile menu, dropdowns)
function initializeHeaderScripts() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');

    if (mobileMenuBtn && mobileMenu) {
        // Remove old listeners by cloning and replacing
        const newBtn = mobileMenuBtn.cloneNode(true);
        mobileMenuBtn.parentNode.replaceChild(newBtn, mobileMenuBtn);
        
        newBtn.addEventListener('click', () => {
            mobileMenu.classList.add('open');
        });
    }

    if (mobileMenuClose && mobileMenu) {
        const newClose = mobileMenuClose.cloneNode(true);
        mobileMenuClose.parentNode.replaceChild(newClose, mobileMenuClose);
        
        newClose.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
        });
    }

    // Mobile Dropdown Menu
    document.querySelectorAll('.mobile-dropdown > a').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const submenu = item.nextElementSibling;
            if (submenu) {
                submenu.classList.toggle('hidden');
            }
        });
    });

    // Prevent dropdown from closing when clicking inside
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
}

// Load header when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
} else {
    loadHeader();
}

