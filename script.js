// ========================================
// PORTFOLIO ÉPICO - DATA ANALYST 2.0
// JavaScript con todas las funcionalidades
// ========================================

'use strict';

// === CONFIGURACIÓN GLOBAL ===
const CONFIG = {
    particleCount: 100,
    contributionDays: 365,
    easterEggsTotal: 3,
    matrixChars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?',
    typewriterSpeed: 100,
    statsAnimationDuration: 2000
};

// === ESTADO GLOBAL ===
let state = {
    isMatrixMode: false,
    easterEggsFound: 0,
    viewCount: parseInt(localStorage.getItem('viewCount') || '1234'),
    theme: localStorage.getItem('theme') || 'dark'
};

// === UTILIDADES ===
const utils = {
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
};

// === CURSOR PERSONALIZADO ===
class CustomCursor {
    constructor() {
        this.dot = document.querySelector('[data-cursor-dot]');
        this.outline = document.querySelector('[data-cursor-outline]');
        this.init();
    }

    init() {
        if (!this.dot || !this.outline) return;

        document.addEventListener('mousemove', (e) => {
            this.dot.style.left = e.clientX + 'px';
            this.dot.style.top = e.clientY + 'px';
            
            this.outline.style.left = e.clientX + 'px';
            this.outline.style.top = e.clientY + 'px';
        });

        // Enlaces y botones
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.dot.style.transform = 'scale(2)';
                this.outline.style.transform = 'scale(1.5)';
            });

            el.addEventListener('mouseleave', () => {
                this.dot.style.transform = 'scale(1)';
                this.outline.style.transform = 'scale(1)';
            });
        });
    }
}

// === MATRIZ RAIN ===
class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrixCanvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.isActive = false;
        this.drops = [];
        this.fontSize = 14;
        this.init();
    }

    init() {
        this.resizeCanvas();
        window.addEventListener('resize', utils.debounce(() => this.resizeCanvas(), 250));
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        const columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(columns).fill(1);
    }

    draw() {
        if (!this.isActive) return;

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#0f0';
        this.ctx.font = this.fontSize + 'px monospace';

        for (let i = 0; i < this.drops.length; i++) {
            const char = CONFIG.matrixChars.charAt(
                Math.floor(Math.random() * CONFIG.matrixChars.length)
            );

            this.ctx.fillText(char, i * this.fontSize, this.drops[i] * this.fontSize);

            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }

            this.drops[i]++;
        }

        requestAnimationFrame(() => this.draw());
    }

    toggle() {
        this.isActive = !this.isActive;
        this.canvas.classList.toggle('active');
        
        if (this.isActive) {
            this.draw();
        }
    }
}

// === NAVEGACIÓN ===
class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        // Scroll
        window.addEventListener('scroll', utils.throttle(() => this.handleScroll(), 100));

        // Toggle mobile menu
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => this.toggleMenu());
        }

        // Active link on scroll
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.handleLinkClick(e, link);
            });
        });

        // Close menu on link click (mobile)
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    this.toggleMenu();
                }
            });
        });

        // Set initial active link
        this.updateActiveLink();
    }

    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }

        this.updateActiveLink();
    }

    toggleMenu() {
        this.navToggle.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    }

    handleLinkClick(e, link) {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                this.navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
}

// === THEME TOGGLE ===
class ThemeToggle {
    constructor() {
        this.toggle = document.getElementById('themeToggle');
        this.init();
    }

    init() {
        // Aplicar tema guardado
        if (state.theme === 'light') {
            document.body.classList.add('light-theme');
            if (this.toggle) {
                this.toggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        }

        if (this.toggle) {
            this.toggle.addEventListener('click', () => this.switchTheme());
        }
    }

    switchTheme() {
        document.body.classList.toggle('light-theme');
        state.theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
        localStorage.setItem('theme', state.theme);

        // Cambiar icono
        this.toggle.innerHTML = state.theme === 'light' 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';

        // Animación
        this.toggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            this.toggle.style.transform = 'rotate(0deg)';
        }, 300);
    }
}

// === HERO PARTICLES ===
class HeroParticles {
    constructor() {
        this.container = document.getElementById('heroParticles');
        if (!this.container) return;
        this.particles = [];
        this.init();
    }

    init() {
        for (let i = 0; i < CONFIG.particleCount; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = utils.randomBetween(2, 4) + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(99, 102, 241, ${Math.random() * 0.5 + 0.2})`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        const duration = utils.randomBetween(10, 30);
        particle.style.animation = `float ${duration}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * -20 + 's';

        this.container.appendChild(particle);
        this.particles.push(particle);
    }
}

// === CONTRIBUTION GRAPH ===
class ContributionGraph {
    constructor() {
        this.container = document.getElementById('contributionGrid');
        if (!this.container) return;
        this.init();
    }

    init() {
        const weeks = 52;
        const daysPerWeek = 7;

        for (let week = 0; week < weeks; week++) {
            for (let day = 0; day < daysPerWeek; day++) {
                const cell = document.createElement('div');
                cell.className = 'contribution-day';
                
                // Generar niveles aleatorios (más actividad reciente)
                const recentBonus = week > 40 ? 0.3 : 0;
                const random = Math.random() + recentBonus;
                
                if (random > 0.9) {
                    cell.classList.add('level-4');
                } else if (random > 0.7) {
                    cell.classList.add('level-3');
                } else if (random > 0.5) {
                    cell.classList.add('level-2');
                } else if (random > 0.3) {
                    cell.classList.add('level-1');
                }

                // Tooltip
                const date = new Date();
                date.setDate(date.getDate() - ((weeks - week - 1) * 7 + (daysPerWeek - day - 1)));
                cell.title = `${date.toLocaleDateString()}: ${Math.floor(random * 10)} contributions`;

                this.container.appendChild(cell);
            }
        }
    }
}

// === STATS COUNTER ===
class StatsCounter {
    constructor() {
        this.stats = document.querySelectorAll('[data-stat]');
        this.hasAnimated = false;
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.animateStats();
                    this.hasAnimated = true;
                }
            });
        }, { threshold: 0.5 });

        this.stats.forEach(stat => observer.observe(stat));
    }

    animateStats() {
        this.stats.forEach((stat, index) => {
            setTimeout(() => {
                this.animateStat(stat);
            }, index * 100);
        });
    }

    animateStat(stat) {
        const numberElement = stat.querySelector('.stat-number');
        const progressBar = stat.querySelector('.stat-progress-bar');
        
        if (!numberElement) return;

        const target = parseInt(numberElement.dataset.target);
        const suffix = numberElement.dataset.suffix || '';
        const duration = CONFIG.statsAnimationDuration;
        const start = 0;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = utils.easeOutCubic(progress);
            const current = Math.floor(start + (target - start) * eased);

            numberElement.textContent = current.toLocaleString() + suffix;

            // Animar progress bar
            if (progressBar) {
                const progressValue = progressBar.dataset.progress;
                progressBar.style.width = (progressValue * eased) + '%';
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                numberElement.textContent = target.toLocaleString() + suffix;
            }
        };

        requestAnimationFrame(animate);
    }
}

// === SKILLS FILTER ===
class SkillsFilter {
    constructor() {
        this.tabs = document.querySelectorAll('.skill-tab');
        this.cards = document.querySelectorAll('.skill-card');
        this.init();
    }

    init() {
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => this.filterSkills(tab));
        });

        // Animar progreso al hacer visible
        this.animateSkillsOnScroll();
    }

    filterSkills(selectedTab) {
        const category = selectedTab.dataset.category;

        // Update active tab
        this.tabs.forEach(tab => tab.classList.remove('active'));
        selectedTab.classList.add('active');

        // Filter cards
        this.cards.forEach(card => {
            const cardCategory = card.dataset.category;
            
            if (category === 'all' || cardCategory === category) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    animateSkillsOnScroll() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target.querySelector('.skill-progress');
                    if (progress) {
                        const width = progress.dataset.progress;
                        setTimeout(() => {
                            progress.style.width = width + '%';
                        }, 100);
                    }
                }
            });
        }, { threshold: 0.5 });

        this.cards.forEach(card => observer.observe(card));
    }
}

// === PROJECTS FILTER ===
class ProjectsFilter {
    constructor() {
        this.filters = document.querySelectorAll('.filter-btn');
        this.projects = document.querySelectorAll('.project-card');
        this.init();
    }

    init() {
        this.filters.forEach(filter => {
            filter.addEventListener('click', () => this.filterProjects(filter));
        });
    }

    filterProjects(selectedFilter) {
        const category = selectedFilter.dataset.filter;

        // Update active filter
        this.filters.forEach(filter => filter.classList.remove('active'));
        selectedFilter.classList.add('active');

        // Filter projects with animation
        this.projects.forEach((project, index) => {
            const projectCategory = project.dataset.category;
            
            setTimeout(() => {
                if (category === 'all' || projectCategory === category) {
                    project.classList.remove('hidden');
                } else {
                    project.classList.add('hidden');
                }
            }, index * 50);
        });
    }
}
// === CONTACT FORM ===
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.successMessage = document.getElementById('formSuccess');
        this.init();
    }

    init() {
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Obtener datos del formulario
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        // Simular envío (aquí integrarías con tu backend)
        try {
            // Simulación de delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mostrar mensaje de éxito
            this.showSuccess();

            // Reset form
            this.form.reset();

            // Ocultar mensaje después de 5 segundos
            setTimeout(() => {
                this.hideSuccess();
            }, 5000);

        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.');
        }
    }

    showSuccess() {
        if (this.successMessage) {
            this.successMessage.classList.add('active');
        }
    }

    hideSuccess() {
        if (this.successMessage) {
            this.successMessage.classList.remove('active');
        }
    }
}

// === SCROLL TO TOP ===
class ScrollToTop {
    constructor() {
        this.button = document.getElementById('scrollToTop');
        this.init();
    }

    init() {
        if (!this.button) return;

        window.addEventListener('scroll', utils.throttle(() => {
            if (window.scrollY > 500) {
                this.button.classList.add('visible');
            } else {
                this.button.classList.remove('visible');
            }
        }, 100));

        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// === TERMINAL INTERACTIVO ===
class InteractiveTerminal {
    constructor() {
        this.output = document.getElementById('terminalOutput');
        this.commands = [
            { cmd: 'cat README.md', output: '"Building the future, one dataset at a time."' },
            { cmd: 'whoami', output: 'data-wizard' },
            { cmd: 'pwd', output: '/home/portfolio/projects' },
            { cmd: 'git status', output: 'On branch main\nnothing to commit, working tree clean' }
        ];
        this.currentCommand = 0;
        this.init();
    }

    init() {
        if (!this.output) return;

        // Agregar comandos aleatorios cada 5 segundos
        setInterval(() => {
            this.addRandomCommand();
        }, 8000);
    }

    addRandomCommand() {
        const command = this.commands[this.currentCommand % this.commands.length];
        
        const promptLine = document.createElement('div');
        promptLine.className = 'terminal-line';
        promptLine.innerHTML = `
            <span class="prompt">visitor@portfolio:~$</span>
            <span class="command">${command.cmd}</span>
        `;

        const outputLine = document.createElement('div');
        outputLine.className = 'terminal-line output';
        outputLine.textContent = command.output;

        this.output.appendChild(promptLine);
        this.output.appendChild(outputLine);

        // Scroll al final
        this.output.scrollTop = this.output.scrollHeight;

        this.currentCommand++;

        // Limitar líneas
        const lines = this.output.querySelectorAll('.terminal-line');
        if (lines.length > 20) {
            lines[0].remove();
            lines[1].remove();
        }
    }
}

// === EASTER EGGS ===
class EasterEggs {
    constructor() {
        this.surpriseBtn = document.getElementById('surpriseBtn');
        this.modal = document.getElementById('easterEggModal');
        this.modalClose = document.getElementById('modalClose');
        this.easterEggLink = document.getElementById('easterEggLink');
        this.matrixToggle = document.getElementById('matrixToggle');
        this.konamiCode = [];
        this.konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        this.init();
    }

    init() {
        // Botón sorpresa
        if (this.surpriseBtn) {
            this.surpriseBtn.addEventListener('click', () => this.showEasterEgg());
        }

        // Link secreto en footer
        if (this.easterEggLink) {
            this.easterEggLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showEasterEgg();
            });
        }

        // Cerrar modal
        if (this.modalClose) {
            this.modalClose.addEventListener('click', () => this.hideEasterEgg());
        }

        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.hideEasterEgg();
                }
            });
        }

        // Konami Code
        document.addEventListener('keydown', (e) => this.checkKonamiCode(e));

        // Doble click en Matrix toggle
        if (this.matrixToggle) {
            this.matrixToggle.addEventListener('dblclick', () => {
                this.activateMatrixMode();
            });
        }

        // Triple click en logo
        const logo = document.querySelector('.nav-brand');
        if (logo) {
            let clickCount = 0;
            let clickTimer = null;

            logo.addEventListener('click', () => {
                clickCount++;
                
                if (clickCount === 1) {
                    clickTimer = setTimeout(() => {
                        clickCount = 0;
                    }, 500);
                } else if (clickCount === 3) {
                    clearTimeout(clickTimer);
                    clickCount = 0;
                    this.activateRainbowMode();
                }
            });
        }
    }

    showEasterEgg() {
        if (this.modal) {
            this.modal.classList.add('active');
            state.easterEggsFound++;
            
            const eggsFoundElement = document.getElementById('eggsFound');
            if (eggsFoundElement) {
                eggsFoundElement.textContent = state.easterEggsFound;
            }

            // Confetti effect
            this.createConfetti();
        }
    }

    hideEasterEgg() {
        if (this.modal) {
            this.modal.classList.remove('active');
        }
    }

    checkKonamiCode(e) {
        this.konamiCode.push(e.key);
        this.konamiCode = this.konamiCode.slice(-this.konamiSequence.length);

        if (this.konamiCode.join(',') === this.konamiSequence.join(',')) {
            this.activateKonamiEasterEgg();
            this.konamiCode = [];
        }
    }

    activateKonamiEasterEgg() {
        alert('🎮 ¡KONAMI CODE ACTIVADO! 🎮\n\n¡Has desbloqueado el modo SUPER DATA ANALYST!\n\n+100 puntos de curiosidad 🌟');
        document.body.style.animation = 'rainbow 5s linear infinite';
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }

    activateMatrixMode() {
        if (window.matrixRain) {
            window.matrixRain.toggle();
            state.isMatrixMode = !state.isMatrixMode;
            
            if (state.isMatrixMode) {
                alert('🔴 MODO MATRIX ACTIVADO 🔴\n\n"Wake up, Neo..."');
            }
        }
    }

    activateRainbowMode() {
        alert('🌈 ¡MODO ARCOÍRIS ACTIVADO! 🌈\n\nTodo es más colorido ahora... 🎨');
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        document.body.style.animation = 'rainbow 10s linear infinite';

        setTimeout(() => {
            document.body.style.animation = '';
        }, 10000);
    }

    createConfetti() {
        const colors = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#8b5cf6'];
        const confettiCount = 50;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '10000';
            confetti.style.opacity = '1';
            
            document.body.appendChild(confetti);

            const fall = confetti.animate([
                { 
                    transform: 'translateY(0) rotate(0deg)',
                    opacity: 1
                },
                { 
                    transform: `translateY(${window.innerHeight + 10}px) rotate(${Math.random() * 720}deg)`,
                    opacity: 0
                }
            ], {
                duration: Math.random() * 2000 + 2000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });

            fall.onfinish = () => confetti.remove();
        }
    }
}

// === VIEW COUNTER ===
class ViewCounter {
    constructor() {
        this.counter = document.getElementById('viewCount');
        this.init();
    }

    init() {
        if (!this.counter) return;

        // Incrementar contador
        state.viewCount++;
        localStorage.setItem('viewCount', state.viewCount);

        // Animar contador
        this.animateCounter();
    }

    animateCounter() {
        const target = state.viewCount;
        const duration = 2000;
        const start = Math.max(0, target - 50);
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = utils.easeOutCubic(progress);
            const current = Math.floor(start + (target - start) * eased);

            this.counter.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }
}

// === TYPING EFFECT ===
class TypingEffect {
    constructor() {
        this.roles = [
            'Data Analyst & Data Scientist',
            'Python Developer',
            'ML Engineer',
            'Data Visualization Expert',
            'SQL Wizard',
            'Statistics Geek'
        ];
        this.element = document.getElementById('roleText');
        this.currentIndex = 0;
        this.currentText = '';
        this.isDeleting = false;
        this.init();
    }

    init() {
        if (!this.element) return;
        this.type();
    }

    type() {
        const fullText = this.roles[this.currentIndex];

        if (this.isDeleting) {
            this.currentText = fullText.substring(0, this.currentText.length - 1);
        } else {
            this.currentText = fullText.substring(0, this.currentText.length + 1);
        }

        this.element.textContent = this.currentText;

        let typeSpeed = this.isDeleting ? 50 : CONFIG.typewriterSpeed;

        if (!this.isDeleting && this.currentText === fullText) {
            typeSpeed = 2000;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentText === '') {
            this.isDeleting = false;
            this.currentIndex = (this.currentIndex + 1) % this.roles.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// === SMOOTH SCROLL REVEAL ===
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.skill-card, .project-card, .cert-card, .highlight-card');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }
}

// === PERFORMANCE MONITOR ===
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        // Lazy loading de imágenes
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        // Log de performance
        if (window.performance && window.performance.timing) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = window.performance.timing;
                    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                    console.log(`⚡ Página cargada en ${pageLoadTime}ms`);
                }, 0);
            });
        }
    }
}

// === INICIALIZACIÓN ===
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🚀 Portfolio Épico Iniciado!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
    console.log('%c💡 Tip: Presiona Ctrl+Shift+I para ver la consola', 'color: #10b981; font-size: 12px;');
    console.log('%c🥚 Hay Easter Eggs escondidos... ¿Puedes encontrarlos todos?', 'color: #f59e0b; font-size: 12px;');

    // Inicializar todos los componentes
    new CustomCursor();
    window.matrixRain = new MatrixRain();
    new Navigation();
    new ThemeToggle();
    new HeroParticles();
    new ContributionGraph();
    new StatsCounter();
    new SkillsFilter();
    new ProjectsFilter();
    new ContactForm();
    new ScrollToTop();
    new InteractiveTerminal();
    new EasterEggs();
    new ViewCounter();
    new TypingEffect();
    new ScrollReveal();
    new PerformanceMonitor();

    console.log('%c✅ Todos los componentes cargados exitosamente!', 'color: #10b981; font-size: 14px; font-weight: bold;');
});

// === WINDOW LOAD ===
window.addEventListener('load', () => {
    // Ocultar preloader si existe
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }

    // Iniciar animaciones
    document.body.classList.add('loaded');
});

// === PREVENIR COMPORTAMIENTOS NO DESEADOS ===
// Deshabilitar click derecho en producción (opcional)
// document.addEventListener('contextmenu', e => e.preventDefault());

// Deshabilitar ciertas combinaciones de teclas (opcional)
// document.addEventListener('keydown', (e) => {
//     if (e.ctrlKey && (e.key === 'u' || e.key === 's')) {
//         e.preventDefault();
//     }
// });

// === HELPER PARA DEBUGGING ===
window.portfolioDebug = {
    state: () => console.table(state),
    resetEasterEggs: () => {
        state.easterEggsFound = 0;
        console.log('Easter eggs reset!');
    },
    toggleMatrix: () => {
        if (window.matrixRain) {
            window.matrixRain.toggle();
        }
    },
    getViewCount: () => state.viewCount,
    version: '2.0.0 Ultra'
};

console.log('%c🔧 Debug helpers disponibles en window.portfolioDebug', 'color: #8b5cf6; font-size: 12px;');
