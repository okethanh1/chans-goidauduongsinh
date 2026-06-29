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

    // Ưu tiên lấy endpoint từ config riêng để repo sạch hơn khi public.
    const bookingEndpoint =
        window.APP_CONFIG?.BOOKING_WEB_APP_URL
        || window.BOOKING_WEB_APP_URL
        || 'https://script.google.com/macros/s/AKfycbzXT4RwucXl62YKGyjD58QeTI9skwoPhkCVm2eLdO4WAPlShuWgcsFZJFKw5AaGT73s/exec';

    function openPopup() { popupOverlay?.classList.add('show'); }
    function closePopup() { popupOverlay?.classList.remove('show'); }

    function getBookingPayload() {
        return {
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
    }

    bookingForm?.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = bookingForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn?.innerHTML || '';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Đang gửi...';
        }

        const formData = getBookingPayload();

        // Kiểm tra tối thiểu trước khi gửi
        if (!formData.name || !formData.phone || !formData.service || !formData.date || !formData.time) {
            alert('Vui lòng nhập đầy đủ các trường bắt buộc.');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
            return;
        }

        try {
            await fetch(bookingEndpoint, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8'
                },
                body: JSON.stringify(formData)
            });

            // Với no-cors, không đọc được response; nếu request không throw thì coi như gửi xong.
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

    // Xử lý nút đặt lịch để cuộn và chọn dịch vụ
    document.querySelectorAll('.btn[href="#booking"]').forEach(button => {
        button.addEventListener('click', (e) => {
            // Lấy serviceId từ data-attribute
            const serviceId = e.currentTarget.dataset.serviceId;
            if (serviceId) {
                const serviceSelect = document.getElementById('service');
                if (serviceSelect) {
                    serviceSelect.value = serviceId; // Tự động chọn dịch vụ
                }
            }

            // Cuộn mượt đến phần đặt lịch
            const bookingSection = document.getElementById('booking');
            if (bookingSection) {
                e.preventDefault(); // Ngăn hành vi anchor mặc định
                bookingSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Tự động chọn dịch vụ nếu có serviceId trong URL ban đầu (cho trường hợp reload)
    // Giữ lại logic này nếu người dùng refresh trang với hash parameter
    const hash = window.location.hash;
    if (hash.startsWith('#booking?service=')) {
        const serviceIdFromUrl = hash.split('=')[1];
        const serviceSelect = document.getElementById('service');
        if (serviceSelect) {
            serviceSelect.value = serviceIdFromUrl;
        }
    }
}
