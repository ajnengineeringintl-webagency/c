document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Menu Toggle
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.getElementById('navLinks');

    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('active'));
    });

    // 2. Project Portfolio Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 3. Stats Counter Animation
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    const startCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const increment = target / 100;
            let current = 0;

            const updateCount = () => {
                if (current < target) {
                    current += increment;
                    counter.innerText = Math.ceil(current);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCount();
        });
    };

    window.addEventListener('scroll', () => {
        const statsSection = document.getElementById('stats');
        const sectionPos = statsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight;

        if (sectionPos < screenPos && !hasCounted) {
            startCounters();
            hasCounted = true;
        }
    });

    // 4. Testimonial Carousel
    const testimonials = [
        {
            text: '"Oasis Kings Engineering delivered our commercial development ahead of schedule without sacrificing structural integrity. Highly recommended."',
            author: 'David Miller',
            role: 'Director, Urban Infra Group'
        },
        {
            text: '"Their MEP engineering work on our industrial facility reduced our projected energy costs by over 20%. Professional and rigorous execution."',
            author: 'Sarah Jenkins',
            role: 'VP Operations, Apex Manufacturing'
        }
    ];

    let currentTestimonial = 0;
    const textEl = document.getElementById('testimonialText');
    const authorEl = document.getElementById('testimonialAuthor');
    const roleEl = document.getElementById('testimonialRole');

    const updateTestimonial = (index) => {
        textEl.innerText = testimonials[index].text;
        authorEl.innerText = testimonials[index].author;
        roleEl.innerText = testimonials[index].role;
    };

    document.getElementById('nextBtn').addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonial(currentTestimonial);
    });

    document.getElementById('prevBtn').addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        updateTestimonial(currentTestimonial);
    });

    // 5. Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        formStatus.style.color = 'green';
        formStatus.textContent = 'Thank you! Your request has been sent successfully.';
        contactForm.reset();
    });
});
