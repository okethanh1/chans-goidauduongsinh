function initApp() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
    }

    if (slides.length > 1) {
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 4500);
    }

    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => navLinks.classList.toggle('show'));
        navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('show')));
    }

    const navbar = document.getElementById('navbar');
    let ticking = false;
    function updateNavbarState() {
        if (window.scrollY > 20) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
        ticking = false;
    }
    if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
        window.addEventListener('scroll', () => {
            if (!ticking) {
                const raf = typeof window.requestAnimationFrame === 'function'
                    ? window.requestAnimationFrame.bind(window)
                    : (cb) => setTimeout(cb, 16);

                raf(updateNavbarState);
                ticking = true;
            }
        }, { passive: true });
    }

    const revealTargets = document.querySelectorAll(
        '.about-card, .timeline-item, .price-card, .benefit-card, .review-card, .booking-info, .booking-form-box, .contact-card'
    );
    revealTargets.forEach(item => item.classList.add('reveal-on-scroll'));

    const revealObserver = typeof window !== 'undefined' && 'IntersectionObserver' in window
        ? new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
        : null;

    if (revealObserver) {
        revealTargets.forEach(item => revealObserver.observe(item));
    } else {
        revealTargets.forEach(item => item.classList.add('is-visible'));
    }

    const bookingForm = document.getElementById('bookingForm');
    const popupOverlay = document.getElementById('popupOverlay');
    const closePopupBtn = document.getElementById('closePopupBtn');
    const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbw7aSHgsyAjOyisu2gBPmipP2wbMr5OqIeIbVXaaweDV3g-hDxnUWXwS8K0znehFdwZ/exec?v=1';
    
    function openPopup() { popupOverlay?.classList.add('show'); }
    function closePopup() { popupOverlay?.classList.remove('show'); }

    bookingForm?.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = bookingForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn?.innerHTML || '';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Đang gửi...';
        }

        const formData = {
            name: document.getElementById('name')?.value?.trim() || '',
            phone: document.getElementById('phone')?.value?.trim() || '',
            email: document.getElementById('email')?.value?.trim() || '',
            gender: document.querySelector('input[name="gender"]:checked')?.value || '',
            age: document.getElementById('age')?.value?.trim() || '',
            service: document.getElementById('service')?.value || '',
            date: document.getElementById('date')?.value || '',
            time: document.getElementById('time')?.value || '',
            note: document.getElementById('note')?.value?.trim() || ''
        };

        try {
            await fetch(googleScriptUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8'
                },
                body: JSON.stringify(formData)
            });

            bookingForm.reset();
            openPopup();
        } catch (error) {
            console.error('Booking submission error:', error);
            alert('Không thể gửi thông tin đặt lịch. Vui lòng thử lại sau.');
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        }
    });
    closePopupBtn?.addEventListener('click', closePopup);
    popupOverlay?.addEventListener('click', (e) => {
        if (e.target === popupOverlay) closePopup();
    });
    window.closePopup = closePopup;
}
