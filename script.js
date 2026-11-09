document.addEventListener('DOMContentLoaded', () => {
    // Set dynamic current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // 1. Typing Animation Effect in Hero
    const roles = ["Frontend Web Developer", "UI/UX Code Enthusiast", "Web Solutions Creator"];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    const typedTextSpan = document.getElementById("typed-text");

    function typeEffect() {
        const currentRole = roles[roleIdx];
        if (isDeleting) {
            typedTextSpan.textContent = currentRole.substring(0, charIdx - 1);
            charIdx--;
        } else {
            typedTextSpan.textContent = currentRole.substring(0, charIdx + 1);
            charIdx++;
        }

        let speed = isDeleting ? 40 : 80;

        if (!isDeleting && charIdx === currentRole.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            speed = 500;
        }

        setTimeout(typeEffect, speed);
    }
    typeEffect();

    // 2. Mobile Drawer Navigation Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // 3. Theme Toggle (Dark/Light Mode)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const themeIcon = document.getElementById('theme-icon');
    const themeIconMobile = themeToggleMobile.querySelector('i');

    function toggleTheme() {
        document.documentElement.classList.toggle('dark');
        document.documentElement.classList.toggle('light');
        const isDark = document.documentElement.classList.contains('dark');
        const iconClass = isDark ? 'fas fa-moon' : 'fas fa-sun text-yellow-400';
        themeIcon.className = iconClass;
        themeIconMobile.className = iconClass;
    }

    themeToggleBtn.addEventListener('click', toggleTheme);
    themeToggleMobile.addEventListener('click', toggleTheme);

    // 4. Scroll Progress Indicator & Back-to-Top Button Visibility
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        scrollProgress.style.width = `${progress}%`;

        if (window.scrollY > 300) {
            backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        } else {
            backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 5. Skills Filtering Logic
    const skillTabs = document.querySelectorAll('.skill-tab-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            skillTabs.forEach(t => t.classList.remove('active', 'bg-primaryBlue', 'text-white'));
            skillTabs.forEach(t => t.classList.add('bg-secondaryBg', 'text-customGray'));
            tab.classList.add('active', 'bg-primaryBlue', 'text-white');
            tab.classList.remove('bg-secondaryBg', 'text-customGray');

            const category = tab.getAttribute('data-category');
            skillCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 6. Projects Filtering & Realtime Search
    const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectSearchInput = document.getElementById('project-search-input');

    function filterProjects() {
        const activeFilter = document.querySelector('.project-filter-btn.active').getAttribute('data-filter');
        const searchQuery = projectSearchInput.value.toLowerCase().trim();

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const title = card.getAttribute('data-title').toLowerCase();
            const matchesCategory = activeFilter === 'all' || category === activeFilter;
            const matchesSearch = title.includes(searchQuery);

            if (matchesCategory && matchesSearch) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    projectFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            projectFilterBtns.forEach(b => b.classList.remove('active', 'bg-primaryBlue', 'text-white'));
            projectFilterBtns.forEach(b => b.classList.add('bg-secondaryBg', 'text-customGray'));
            btn.classList.add('active', 'bg-primaryBlue', 'text-white');
            btn.classList.remove('bg-secondaryBg', 'text-customGray');
            filterProjects();
        });
    });

    projectSearchInput.addEventListener('input', filterProjects);

    // 7. Contact Form Handling & Validation
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contact-name').value;
        openModal('Message Received!', `<p>Thank you, <strong>${name}</strong>. Your message has been received on the client interface.</p><p class="text-xs text-orangeAccent">Note: Connect a backend or service like Formspree to handle live email routing.</p>`);
        contactForm.reset();
    });
});

// Modal Handlers
const detailModal = document.getElementById('detail-modal');
const modalBox = document.getElementById('modal-box');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');

function openModal(title, contentHtml) {
    modalTitle.textContent = title;
    modalBody.innerHTML = contentHtml;
    detailModal.classList.remove('opacity-0', 'pointer-events-none');
    modalBox.classList.remove('scale-95');
}

function closeModal() {
    detailModal.classList.add('opacity-0', 'pointer-events-none');
    modalBox.classList.add('scale-95');
}

function openServiceModal(serviceName, description) {
    openModal(serviceName, `<p>${description}</p><div class="mt-4 p-4 rounded-xl bg-secondaryBg border border-gray-800 text-xs font-mono text-primaryBlue">Included: Clean Code, Responsive Testing, Performance Polish</div>`);
}

function openProjectDetail(title, overview, techStack, github, demo) {
    openModal(title, `
        <div>
            <h4 class="font-bold text-white mb-1">Project Overview</h4>
            <p class="text-xs text-customGray leading-relaxed">${overview}</p>
        </div>
        <div class="mt-3">
            <h4 class="font-bold text-white mb-1">Tech Stack</h4>
            <span class="text-xs font-mono text-orangeAccent">${techStack}</span>
        </div>
        <div class="mt-4 flex space-x-4">
            <a href="${github}" target="_blank" class="px-4 py-2 rounded-xl bg-secondaryBg text-white text-xs font-semibold hover:bg-gray-800"><i class="fab fa-github mr-1"></i> Source Code</a>
            <a href="${demo}" target="_blank" class="px-4 py-2 rounded-xl bg-primaryBlue text-white text-xs font-semibold hover:bg-blue-600"><i class="fas fa-globe mr-1"></i> Live Demo</a>
        </div>
    `);
}

function openCertModal(certTitle, certDetails) {
    openModal(certTitle, `<p class="text-sm">${certDetails}</p><div class="mt-3 text-xs font-mono text-green-400"><i class="fas fa-check-circle mr-1"></i> Verified Developer Certificate</div>`);
}

function openBlogModal(blogTitle, summary) {
    openModal(blogTitle, `<p class="text-sm leading-relaxed">${summary}</p>`);
}

document.addEventListener('click', event => {
    if (!(event.target instanceof Element)) {
        return;
    }

    const trigger = event.target.closest('[data-action]');
    if (!trigger) {
        return;
    }

    const { action, title, description, overview, techStack, github, demo, summary } = trigger.dataset;
    switch (action) {
        case 'print-cv':
            window.printCV();
            break;
        case 'close-modal':
            closeModal();
            break;
        case 'service-modal':
            openServiceModal(title, description);
            break;
        case 'project-modal':
            openProjectDetail(title, overview, techStack, github, demo);
            break;
        case 'certificate-modal':
            openCertModal(title, description);
            break;
        case 'blog-modal':
            openBlogModal(title, summary);
            break;
    }
});

// Print CV helper
window.printCV = function() {
    window.print();
};
