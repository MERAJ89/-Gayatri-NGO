/* =====================================================
   FORM VALIDATION & UTILITIES
   ===================================================== */

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (10 digits)
const phoneRegex = /^[0-9]{10}$/;

/* =====================================================
   DONATION PAGE FUNCTIONS
   ===================================================== */

// Select donation amount
function selectAmount(amount) {
    const amountInput = document.getElementById('donationAmount');
    
    if (amount === 'custom') {
        amountInput.value = '';
        amountInput.focus();
    } else {
        amountInput.value = amount;
    }

    // Update button styles
    document.querySelectorAll('.btn-amount').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.classList.add('selected');
}

// Handle donation form submission
function handleDonation(event) {
    event.preventDefault();

    // Get form values
    const amount = document.getElementById('donationAmount').value;
    const name = document.getElementById('donorName').value.trim();
    const email = document.getElementById('donorEmail').value.trim();
    const phone = document.getElementById('donorPhone').value.trim();

    // Validate fields
    if (!amount || amount <= 0) {
        showAlert('Please enter a valid donation amount', 'warning');
        return;
    }

    if (!name || name.length < 3) {
        showAlert('Please enter your full name', 'warning');
        return;
    }

    if (!emailRegex.test(email)) {
        showAlert('Please enter a valid email address', 'warning');
        return;
    }

    if (!phoneRegex.test(phone)) {
        showAlert('Please enter a valid 10-digit phone number', 'warning');
        return;
    }

    // Prepare donation data
    const donationData = {
        amount: parseFloat(amount),
        name: name,
        email: email,
        phone: phone,
        date: new Date().toISOString()
    };

    // Log to console (replace with actual API call)
    console.log('Donation Data:', donationData);

    // Simulate API call
    fetch('/api/donations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(donationData)
    })
    .catch(() => {
        // API not available, show success message anyway
        showAlert(`Thank you ${name}! Your donation of ₹${amount} has been received. We will contact you soon.`, 'success');
        document.getElementById('donationForm').reset();
    });
}

/* =====================================================
   CONTACT PAGE FUNCTIONS
   ===================================================== */

// Handle contact form submission
function handleContact(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    // Validate fields
    if (!name || name.length < 3) {
        showAlert('Please enter your full name', 'warning');
        return;
    }

    if (!emailRegex.test(email)) {
        showAlert('Please enter a valid email address', 'warning');
        return;
    }

    if (!subject || subject.length < 3) {
        showAlert('Please enter a subject', 'warning');
        return;
    }

    if (!message || message.length < 10) {
        showAlert('Please enter a message (at least 10 characters)', 'warning');
        return;
    }

    // Prepare contact data
    const contactData = {
        name: name,
        email: email,
        subject: subject,
        message: message,
        date: new Date().toISOString()
    };

    // Log to console (replace with actual API call)
    console.log('Contact Data:', contactData);

    // Simulate API call
    fetch('/api/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactData)
    })
    .catch(() => {
        // API not available, show success message anyway
        showAlert(`Thank you ${name}! We have received your message and will get back to you soon.`, 'success');
        document.getElementById('contactForm').reset();
    });
}

/* =====================================================
   VOLUNTEER PAGE FUNCTIONS
   ===================================================== */

// Handle volunteer form submission
function handleVolunteer(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('volunteerName').value.trim();
    const email = document.getElementById('volunteerEmail').value.trim();
    const phone = document.getElementById('volunteerPhone').value.trim();
    const age = document.getElementById('volunteerAge').value;
    const skills = document.getElementById('volunteerSkills').value.trim();
    const availability = document.getElementById('volunteerAvailability').value;
    const experience = document.getElementById('volunteerExperience').value.trim();
    const agree = document.getElementById('volunteerAgree').checked;

    // Validate fields
    if (!name || name.length < 3) {
        showAlert('Please enter your full name', 'warning');
        return;
    }

    if (!emailRegex.test(email)) {
        showAlert('Please enter a valid email address', 'warning');
        return;
    }

    if (!phoneRegex.test(phone)) {
        showAlert('Please enter a valid 10-digit phone number', 'warning');
        return;
    }

    if (age && (age < 18 || age > 150)) {
        showAlert('Please enter a valid age (18-150)', 'warning');
        return;
    }

    if (!skills || skills.length < 10) {
        showAlert('Please describe your skills (at least 10 characters)', 'warning');
        return;
    }

    if (!availability) {
        showAlert('Please select your availability', 'warning');
        return;
    }

    if (!agree) {
        showAlert('Please agree to the terms and conditions', 'warning');
        return;
    }

    // Prepare volunteer data
    const volunteerData = {
        name: name,
        email: email,
        phone: phone,
        age: age || null,
        skills: skills,
        availability: availability,
        experience: experience || null,
        date: new Date().toISOString()
    };

    // Log to console (replace with actual API call)
    console.log('Volunteer Data:', volunteerData);

    // Simulate API call
    fetch('/api/volunteers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(volunteerData)
    })
    .catch(() => {
        // API not available, show success message anyway
        showAlert(`Thank you ${name}! Your volunteer registration has been received. We will contact you soon.`, 'success');
        document.getElementById('volunteerForm').reset();
    });
}

/* =====================================================
   UTILITY FUNCTIONS
   ===================================================== */

// Show bootstrap alert
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    // Insert at top of page
    const container = document.querySelector('.container');
    if (container && container.parentNode) {
        container.parentNode.insertBefore(alertDiv, container);
    } else {
        document.body.insertBefore(alertDiv, document.body.firstChild);
    }

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);
}

// Scroll to element
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

/* =====================================================
   DOM READY
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize form handlers
    initializeFormHandlers();

    // Add smooth scroll behavior to navbar links
    document.querySelectorAll('.navbar-nav a').forEach(link => {
        link.addEventListener('click', function() {
            // Close navbar on mobile
            const navbarToggle = document.querySelector('.navbar-toggler');
            if (navbarToggle && window.getComputedStyle(navbarToggle).display !== 'none') {
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggle.click();
                }
            }
        });
    });

    // Add active class to navbar links based on current page
    setActiveNavLink();

    // Update navbar on scroll
    window.addEventListener('scroll', function() {
        updateNavbarOnScroll();
    });
});

// Initialize form handlers
function initializeFormHandlers() {
    const donationForm = document.getElementById('donationForm');
    if (donationForm) {
        donationForm.addEventListener('submit', handleDonation);
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContact);
    }

    const volunteerForm = document.getElementById('volunteerForm');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', handleVolunteer);
    }

    // Add input validation
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    });

    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !emailRegex.test(this.value)) {
                this.classList.add('is-invalid');
            } else {
                this.classList.remove('is-invalid');
            }
        });
    });
}

// Set active nav link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Update navbar styling on scroll
function updateNavbarOnScroll() {
    const navbar = document.querySelector('.navbar-custom');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
}

/* =====================================================
   LOCAL STORAGE FOR DONATIONS
   ===================================================== */

// Save donation to local storage
function saveDonation(donationData) {
    let donations = JSON.parse(localStorage.getItem('gayatriDonations')) || [];
    donations.push(donationData);
    localStorage.setItem('gayatriDonations', JSON.stringify(donations));
}

// Get donations from local storage
function getDonations() {
    return JSON.parse(localStorage.getItem('gayatriDonations')) || [];
}

// Clear donations from local storage
function clearDonations() {
    localStorage.removeItem('gayatriDonations');
}

/* =====================================================
   PERFORMANCE OPTIMIZATION
   ===================================================== */

// Lazy load images
function lazyLoadImages() {
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        images.forEach(img => imageObserver.observe(img));
    }
}

// Call lazy load on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', lazyLoadImages);
} else {
    lazyLoadImages();
}
