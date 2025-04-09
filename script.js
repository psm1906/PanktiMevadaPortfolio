document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const smoothScroll = (target) => {
        const element = document.querySelector(target);
        window.scrollTo({
            top: element.offsetTop - 80, 
            behavior: 'smooth'
        });
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            smoothScroll(this.getAttribute('href'));
        });
    });

    // Advanced Hero Text Animation
    const heroSection = document.querySelector('#hero');
    const nameElement = document.querySelector('#pankti-mevada');
    const subtitleElement = document.querySelector('.typed-out');

    // Create a background text element for depth effect
    const createBackgroundText = () => {
        const backgroundText = document.createElement('div');
        backgroundText.classList.add('hero-background-text');
        heroSection.appendChild(backgroundText);

        // Parallax effect
        window.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            const moveX = (clientX - centerX) / 50;
            const moveY = (clientY - centerY) / 50;

            backgroundText.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
        });
    };

    // Staggered Letter Reveal
    const revealLettersWithDelay = (element) => {
        const text = element.textContent;
        element.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.opacity = '0';
            span.style.display = 'inline-block';
            span.style.transition = 'opacity 7s ease';
            
            setTimeout(() => {
                span.style.opacity = '1';
            }, 100 * index);
            
            element.appendChild(span);
        });
    };

    // Glitch Effect for Name
    const createGlitchEffect = (element) => {
        const originalText = element.textContent;
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        
        const glitchAnimation = () => {
            let iterations = 0;
            const interval = setInterval(() => {
                element.innerText = element.innerText
                    .split("")
                    .map((letter, index) => {
                        if(index < iterations) {
                            return originalText[index];
                        }
                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("");

                if(iterations >= originalText.length) {
                    clearInterval(interval);
                }

                iterations += 1/3;
            }, 30);
        };

        element.addEventListener('mouseenter', glitchAnimation);
    };

    // Initialize Hero Animations
    const initHeroAnimations = () => {
        createBackgroundText();
        revealLettersWithDelay(nameElement);
        createGlitchEffect(nameElement);

        // Typing effect for subtitle
        const subtitleText = "Software Engineer | Innovator | Tech Enthusiast";
        let subtitleIndex = 0;
        
        const typeSubtitle = () => {
            if (subtitleIndex < subtitleText.length) {
                subtitleElement.textContent += subtitleText.charAt(subtitleIndex);
                subtitleIndex++;
                setTimeout(typeSubtitle, 80);
            }
        };

        typeSubtitle();
    };

    // Skills Animation
    const animateSkills = () => {
        const skillItems = document.querySelectorAll('.skill-category ul li');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('skill-animate');
                }
            });
        }, { threshold: 0.1 });

        skillItems.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(item);
        });
    };

    // Project Hover Effects
    const projectHoverEffects = () => {
        const projects = document.querySelectorAll('.project');
        
        projects.forEach(project => {
            project.addEventListener('mouseenter', () => {
                project.style.transform = 'scale(1.05)';
                project.style.boxShadow = '0 10px 20px rgba(100, 255, 218, 0.2)';
            });

            project.addEventListener('mouseleave', () => {
                project.style.transform = 'scale(1)';
                project.style.boxShadow = 'none';
            });
        });
    };

    // Scroll to Top Button
    const createScrollTopButton = () => {
        const scrollTopBtn = document.createElement('button');
        scrollTopBtn.innerHTML = '↑';
        scrollTopBtn.classList.add('scroll-top-btn');
        document.body.appendChild(scrollTopBtn);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    };

    // Mobile Menu Toggle
    const mobilMenuSetup = () => {
        const menuToggle = document.querySelector('.menu-toggle');
        const navUl = document.querySelector('nav ul');

        menuToggle.addEventListener('click', () => {
            navUl.classList.toggle('show');
        });

        document.querySelectorAll('nav ul li a').forEach(link => {
            link.addEventListener('click', () => {
                navUl.classList.remove('show');
            });
        });
    };

    // Section Fade-In Animation
    const sectionFadeIn = () => {
        const sections = document.querySelectorAll('section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, { threshold: 0.1 });

        sections.forEach(section => observer.observe(section));
    };

    // Initialize All Animations
    initHeroAnimations();
    animateSkills();
    projectHoverEffects();
    createScrollTopButton();
    mobilMenuSetup();
    sectionFadeIn();

    // Dynamic copyright year
    const currentYear = new Date().getFullYear();
    document.querySelector('footer p').innerHTML = `&copy; ${currentYear} Pankti Mevada. All rights reserved.`;
});