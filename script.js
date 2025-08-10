// Global Variables
let currentPage = window.location.pathname.split('/').pop() || 'index.html';

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize clock
    updateClock();
    setInterval(updateClock, 1000);
    
    // Set active link in TOC
    setActiveLink();
    
    // Initialize toggle buttons for TOC
    initToggleButtons();
    
    // Initialize login form if on login page
    if (currentPage === 'index.html') {
        initLoginForm();
    }
});

// Update Clock Function
function updateClock() {
    const options = { 
        timeZone: 'Asia/Jakarta',
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    
    const now = new Date();
    const timeString = now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    }).toUpperCase();
    
    const dateString = now.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    if (document.getElementById('clock')) {
        document.getElementById('clock').textContent = `${timeString} WIB pada ${dateString}`;
    }
}

// Set Active Link in TOC
function setActiveLink() {
    const links = document.querySelectorAll('.toc-list a');
    links.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === 'main.html' && linkHref === 'daftar_isi.html')) {
            link.classList.add('active');
        }
    });
}

// Login Form Handling
function initLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('errorMessage');
            
            if (username === 'mangrove' && password === 'arry1234') {
                window.location.href = 'main.html';
            } else {
                errorMessage.style.display = 'block';
                setTimeout(() => {
                    errorMessage.style.display = 'none';
                }, 3000);
            }
        });
    }
}

// Logout Function
function logout() {
    window.location.href = 'index.html';
}

// Dynamic Content Loading (for SPA-like behavior)
function loadContent(url) {
    if (url.startsWith('javascript:')) return;   // abaikan javascript:void(0)
    window.location.href = url;                  // navigasi biasa
}

// Handle back/forward navigation
window.addEventListener('popstate', function() {
    const newPage = window.location.pathname.split('/').pop() || 'index.html';
    if (newPage !== currentPage) {
        loadContent(newPage);
    }
});

// Initialize event delegation for navigation
//document.addEventListener('click', function(e) {
//    if (e.target.matches('.toc-list a') || e.target.matches('.home-btn')) {
//        e.preventDefault();
//        const url = e.target.getAttribute('href');
//        loadContent(url);
//    }
//});

// MathJax Configuration (if needed)
if (typeof MathJax !== 'undefined') {
    MathJax = {
        tex: {
            inlineMath: [['$', '$'], ['\\(', '\\)']]
        },
        svg: {
            fontCache: 'global'
        }
    };
}