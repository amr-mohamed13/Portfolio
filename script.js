// Pixel Master Portfolio - Advanced Interactive Features

class PixelPortfolio {
  constructor() {
    this.isLoading = true;
    this.init();
  }

  init() {
    // Hide loading screen
    setTimeout(() => {
      const loadingScreen = document.querySelector('.loading-screen');
      if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
          loadingScreen.style.display = 'none';
          this.isLoading = false;
        }, 500);
      }
    }, 2000);

    // Setup all event listeners
    this.setupEventListeners();
    
    // Setup navigation
    this.setupNavigation();
    
    // Initialize animations
    this.initializeAnimations();
    
    // Setup form handling
    this.setupFormHandling();
    
    // Create ambient effects
    this.createAmbientEffects();
    
    // Load saved theme
    this.loadTheme();
    
    // Create ambient sound effect
    this.createAmbientSound();
  }

  setupEventListeners() {
    // Navigation links - smooth scrolling
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = link.getAttribute('href');
        this.scrollToSection(targetSection);
      });
    });

    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    if (navToggle) {
      navToggle.addEventListener('click', () => {
        this.toggleMobileMenu();
      });
    }

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        this.toggleTheme();
      });
    }

    // Scroll effects
    window.addEventListener('scroll', () => {
      this.handleScroll();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      this.handleKeyboardNavigation(e);
    });

    // Easter egg
    this.setupEasterEgg();

    // Make entire contact cards clickable if they contain a link
    document.querySelectorAll('.contact-card').forEach(card => {
      const primaryLink = card.querySelector('a[href]');
      if (!primaryLink) return;

      card.style.cursor = 'pointer';
      card.setAttribute('role', 'link');
      card.setAttribute('tabindex', '0');

      const navigate = () => {
        const url = primaryLink.getAttribute('href');
        const target = primaryLink.getAttribute('target');
        if (url) {
          if (target === '_blank') {
            window.open(url, '_blank');
          } else {
            window.location.href = url;
          }
        }
      };

      card.addEventListener('click', (e) => {
        if (e.target && e.target.closest('a')) return; // let native link clicks work
        navigate();
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate();
        }
      });
    });

    // Smooth scroll for any in-page hero buttons/links
    document.querySelectorAll('a.btn[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          this.scrollToSection(href);
        }
      });
    });
  }

  setupNavigation() {
    // Update active navigation based on scroll position
    const updateActiveNav = () => {
      const sections = document.querySelectorAll('.section');
      const navLinks = document.querySelectorAll('.nav-link');
      
      let currentSection = '';
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSection = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
          link.classList.add('active');
        }
      });
    };

    // Initial active state
    updateActiveNav();
    
    // Update on scroll
    window.addEventListener('scroll', updateActiveNav);
  }

  scrollToSection(sectionId) {
    const targetSection = document.querySelector(sectionId);
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  }

  initializeAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.project-card, .about-card, .contact-card, .skill-category, .experience-card').forEach(el => {
      observer.observe(el);
    });
  }

  setupFormHandling() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleFormSubmission(contactForm);
      });
    }

    // Form field animations
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(field => {
      field.addEventListener('focus', () => {
        field.parentElement.classList.add('focused');
      });
      
      field.addEventListener('blur', () => {
        if (!field.value) {
          field.parentElement.classList.remove('focused');
        }
      });
    });
  }

  handleFormSubmission(form) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Validate form
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    if (!name || !email || !subject || !message) {
      this.showNotification('Please fill in all fields!', 'error');
      return;
    }
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
      this.showNotification('Message sent successfully! 🎮', 'success');
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      
      // Remove focused class from all form groups
      form.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('focused');
      });
    }, 2000);
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas ${this.getNotificationIcon(type)}"></i>
        <span>${message}</span>
      </div>
    `;
    
    // Style the notification
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 20px 25px;
      border: 2px solid;
      border-radius: 0;
      color: white;
      font-weight: bold;
      z-index: 10000;
      transform: translateX(400px);
      transition: transform 0.3s ease;
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
      font-family: 'Press Start 2P', cursive;
      font-size: 0.7rem;
      max-width: 300px;
    `;
    
    // Set colors based on type
    const colors = {
      success: { bg: '#00ff41', border: '#00ff41' },
      error: { bg: '#ff6b35', border: '#ff6b35' },
      info: { bg: '#11998e', border: '#11998e' }
    };
    
    notification.style.background = colors[type].bg;
    notification.style.borderColor = colors[type].border;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 5000);
  }

  getNotificationIcon(type) {
    const icons = {
      success: 'fa-check-circle',
      error: 'fa-exclamation-triangle',
      info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
  }

  createAmbientEffects() {
    // Create floating particles
    setInterval(() => {
      this.createParticle();
    }, 3000);

    // Create pixel grid movement
    this.animatePixelGrid();
    
    // Create matrix rain effect
    this.createMatrixRain();
    
    // Create geometric shapes
    this.createGeometricShapes();
  }

  toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle ? themeToggle.querySelector('i') : null;
    
    body.classList.toggle('light-theme');
    
    if (body.classList.contains('light-theme')) {
      if (icon) icon.className = 'fas fa-sun';
      localStorage.setItem('theme', 'light');
    } else {
      if (icon) icon.className = 'fas fa-moon';
      localStorage.setItem('theme', 'dark');
    }
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle ? themeToggle.querySelector('i') : null;
    
    if (savedTheme === 'light') {
      body.classList.add('light-theme');
      if (icon) icon.className = 'fas fa-sun';
    } else {
      body.classList.remove('light-theme');
      if (icon) icon.className = 'fas fa-moon';
    }
  }

  createMatrixRain() {
    const matrixContainer = document.getElementById('matrixRain');
    if (!matrixContainer) return;

    // Create multiple matrix columns
    for (let i = 0; i < 20; i++) {
      const column = document.createElement('div');
      column.className = 'matrix-column';
      column.style.left = Math.random() * 100 + '%';
      column.style.animationDelay = Math.random() * 3 + 's';
      column.style.animationDuration = (2 + Math.random() * 2) + 's';
      matrixContainer.appendChild(column);
    }
  }

  createParticle() {
    const particle = document.createElement('div');
    const colors = ['#00ff41', '#ff6b35', '#11998e', '#4ecdc4'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
      position: fixed;
      width: 2px;
      height: 2px;
      background: ${color};
      border-radius: 0;
      pointer-events: none;
      z-index: -1;
      opacity: 0.6;
      left: ${Math.random() * window.innerWidth}px;
      top: ${window.innerHeight + 10}px;
    `;
    
    document.body.appendChild(particle);
    
    // Animate particle
    particle.animate([
      { transform: 'translateY(0) scale(1)', opacity: 0.6 },
      { transform: `translateY(-${window.innerHeight + 100}px) scale(0)`, opacity: 0 }
    ], {
      duration: 4000 + Math.random() * 2000,
      easing: 'linear'
    }).onfinish = () => {
      document.body.removeChild(particle);
    };
  }

  animatePixelGrid() {
    const grid = document.querySelector('.pixel-grid');
    if (grid) {
      let position = 0;
      setInterval(() => {
        position += 1;
        grid.style.transform = `translate(${position}px, ${position}px)`;
        if (position >= 50) position = 0;
      }, 100);
    }
  }

  setupEasterEgg() {
    let clickCount = 0;
    const logo = document.querySelector('.logo-icon');
    
    if (logo) {
      logo.addEventListener('click', () => {
        clickCount++;
        
        // Create pixel explosion
        for (let i = 0; i < 10; i++) {
          this.createPixelExplosion(logo);
        }
        
        // Easter egg after 10 clicks
        if (clickCount >= 10) {
          this.showNotification('🎮 You found the secret! You\'re a true pixel master!', 'success');
          clickCount = 0;
          this.triggerSpecialEffect();
        }
      });
    }
  }

  createPixelExplosion(parent) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      background: #00ff41;
      border-radius: 0;
      pointer-events: none;
      z-index: 100;
    `;
    
    const rect = parent.getBoundingClientRect();
    particle.style.left = rect.left + rect.width / 2 + 'px';
    particle.style.top = rect.top + rect.height / 2 + 'px';
    
    document.body.appendChild(particle);
    
    // Animate the particle
    const angle = Math.random() * Math.PI * 2;
    const distance = 50 + Math.random() * 150;
    const endX = rect.left + rect.width / 2 + Math.cos(angle) * distance;
    const endY = rect.top + rect.height / 2 + Math.sin(angle) * distance;
    
    particle.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: `translate(${endX - rect.left - rect.width / 2}px, ${endY - rect.top - rect.height / 2}px) scale(0)`, opacity: 0 }
    ], {
      duration: 1000,
      easing: 'ease-out'
    }).onfinish = () => {
      document.body.removeChild(particle);
    };
  }

  triggerSpecialEffect() {
    // Create a special visual effect
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle, rgba(0, 255, 65, 0.1) 0%, transparent 70%);
      pointer-events: none;
      z-index: 9998;
      animation: specialGlow 2s ease-out;
    `;
    
    document.body.appendChild(overlay);
    
    setTimeout(() => {
      document.body.removeChild(overlay);
    }, 2000);
  }

  handleScroll() {
    // Parallax effect for stars
    const scrolled = window.pageYOffset;
    const stars = document.querySelectorAll('.pixel-star');
    
    stars.forEach((star, index) => {
      const speed = 0.3 + (index * 0.1);
      star.style.transform = `translateY(${scrolled * speed}px)`;
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.pixel-nav');
    if (navbar) {
      if (scrolled > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
      } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
      }
    }
  }

  handleKeyboardNavigation(e) {
    if (e.ctrlKey || e.metaKey) {
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];
      
      switch(e.key) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
          e.preventDefault();
          const index = parseInt(e.key) - 1;
          if (sections[index]) {
            this.scrollToSection(`#${sections[index]}`);
          }
          break;
      }
    }
  }

  hideLoadingScreen() {
    setTimeout(() => {
      const loadingScreen = document.querySelector('.loading-screen');
      if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
          loadingScreen.style.display = 'none';
          this.isLoading = false;
        }, 500);
      }
    }, 2000);
  }
}

// Global functions for button clicks
function scrollToSection(sectionId) {
  if (window.portfolio) {
    window.portfolio.scrollToSection(sectionId);
  }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.portfolio = new PixelPortfolio();
  
  // Add CSS animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes specialGlow {
      0% { opacity: 0; transform: scale(0.5); }
      50% { opacity: 1; transform: scale(1.2); }
      100% { opacity: 0; transform: scale(2); }
    }
    
    .animate-in {
      animation: slideInUp 0.8s ease-out forwards;
    }
    
    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(50px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .form-group.focused label {
      top: -10px;
      font-size: 0.8rem;
      color: #00ff41;
    }
    
    .nav-menu.active {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.98);
      border-top: 2px solid #00ff41;
      padding: 20px;
    }
    
    .nav-toggle.active span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active span:nth-child(2) {
      opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .notification-content {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  `;
  document.head.appendChild(style);
  
  console.log('🎮 Amr Mohamed Portfolio loaded successfully! Ready to level up!');
});

// Add some ambient sound effects (visual representation)
function createAmbientSound() {
  const soundWave = document.createElement('div');
  soundWave.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 20px;
    width: 60px;
    height: 20px;
    display: flex;
    align-items: center;
    gap: 2px;
    z-index: 1000;
  `;
  
  for (let i = 0; i < 5; i++) {
    const bar = document.createElement('div');
    bar.style.cssText = `
      width: 4px;
      background: #00ff41;
      border-radius: 0;
      animation: soundWave 1s ease-in-out infinite;
      animation-delay: ${i * 0.1}s;
    `;
    soundWave.appendChild(bar);
  }
  
  document.body.appendChild(soundWave);
}

// Add sound wave animation
const soundStyle = document.createElement('style');
soundStyle.textContent = `
  @keyframes soundWave {
    0%, 100% { height: 4px; }
    50% { height: 20px; }
  }
`;

document.head.appendChild(soundStyle);

// Create ambient sound effect
setTimeout(createAmbientSound, 3000);

// Removed edge mini-game per user request
