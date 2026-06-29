const renderNav = (brand, nav) => `
    <nav id="navbar">
        <div class="nav-container container">
            <a href="#home" class="logo">
                <div class="logo-circle">
                    <img src="image/logo.JPG" alt="${brand.name} logo" class="logo-img">
                </div>
                <div class="logo-text">
                    <span class="logo-name">${brand.name}</span>
                    <span class="logo-sub">${brand.subtitle}</span>
                </div>
            </a>

            <button class="hamburger" id="hamburger" aria-label="Mở menu">
                <span></span><span></span><span></span>
            </button>

            <ul class="nav-links" id="navLinks">
                ${nav.map(item => `<li><a href="${item.href}">${item.label}</a></li>`).join('')}
            </ul>

            <a href="#booking" class="btn-book-nav">Đặt lịch ngay</a>
        </div>
    </nav>
`;

const renderHero = (heroSlides) => `
    <section id="home" class="hero">
        <div class="hero-slideshow">
            ${heroSlides.map((img, index) => `
                <div class="slide ${index === 0 ? 'active' : ''}" style="background-image:url('${img}')"></div>
            `).join('')}
        </div>
        <div class="hero-overlay"></div>
        <div class="hero-content container">
            <div class="hero-logo">
                <div class="hero-logo-circle">
                    <img src="image/logo.JPG" alt="${brand.name} logo" class="logo-img">
                </div>
            </div>
            <h1>Gội Đầu Dưỡng Sinh</h1>
            <p class="hero-subtitle">Chăm sóc tóc – Thư giãn cơ thể – Phục hồi năng lượng</p>
            <div class="hero-buttons">
                <a href="#booking" class="btn btn-primary"><i class="fa-solid fa-calendar-check"></i> Đặt lịch ngay</a>
                <a href="tel:0786766382" class="btn btn-secondary"><i class="fa-solid fa-phone"></i> Gọi tư vấn</a>
            </div>
        </div>
        <div class="scroll-indicator">
            <div class="mouse"><div class="wheel"></div></div>
            <p>CUỘN XUỐNG</p>
        </div>
    </section>
`;

const renderAbout = (about) => `
    <section id="about" class="section">
        <div class="container">
            <div class="section-header">
                <span class="section-tag">🌿 Giới Thiệu</span>
                <h2>Chúng tôi mang đến sự thư giãn tuyệt vời</h2>
                <p class="section-desc">Trải nghiệm gội đầu dưỡng sinh cao cấp, chăm sóc toàn diện cho mái tóc và tinh thần của bạn</p>
            </div>
            <div class="about-grid">
                ${about.map(item => `
                    <article class="about-card">
                        <div class="about-icon"><i class="fa-solid ${item.icon}"></i></div>
                        <h3>${item.title}</h3>
                        <p>${item.desc}</p>
                    </article>
                `).join('')}
            </div>
        </div>
    </section>
`;

const renderProcess = (process) => `
    <section id="process" class="section">
        <div class="container">
            <div class="section-header">
                <span class="section-tag">📋 Quy Trình</span>
                <h2>Quy trình gội đầu dưỡng sinh</h2>
                <p class="section-desc">6 bước chăm sóc chuyên nghiệp mang đến trải nghiệm tuyệt vời nhất</p>
            </div>
            <div class="timeline">
                ${process.map((step, index) => `
                    <div class="timeline-item ${index % 2 === 0 ? 'left' : 'right'}">
                        <div class="timeline-content">
                            <div class="timeline-number">${step.no}</div>
                            <h3>${step.title}</h3>
                            <p>${step.desc}</p>
                        </div>
                        <div class="timeline-icon"><i class="fa-solid ${step.icon}"></i></div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
`;

const renderPricing = (pricing) => {
    const basic = pricing[0];
    const pro = pricing[1];
    const vip = pricing[2];

    return `
    <section id="pricing" class="section">
        <div class="container">
            <div class="section-header">
                <span class="section-tag">💰 Bảng Giá</span>
                <h2>BẢNG GIÁ DỊCH VỤ</h2>
                <p class="section-desc">Thư giãn & Chăm sóc tận tâm</p>
            </div>

            <div class="pricing-grid">
                <article class="price-card ${basic.type}">
                    <div class="price-badge">${basic.name}</div>
                    <div class="price-icon"><i class="fa-solid ${basic.icon}"></i></div>
                    <div class="price-amount">${basic.price}</div>
                    <div class="price-time"><i class="fa-regular fa-clock"></i> ${basic.time}</div>
                    <ul class="price-list">
                        ${basic.items.map(item => `<li><i class="fa-solid fa-check"></i> ${item}</li>`).join('')}
                    </ul>
                    <a href="#booking" class="btn btn-price" data-service-id="co-ban">Đặt lịch ngay</a>
                </article>

                <article class="price-card ${pro.type}">
                    <div class="price-ribbon">Phổ Biến</div>
                    <div class="price-badge">${pro.name}</div>
                    <div class="price-icon"><i class="fa-solid ${pro.icon}"></i></div>
                    <div class="price-amount">${pro.price}</div>
                    <div class="price-time"><i class="fa-regular fa-clock"></i> ${pro.time}</div>
                    <ul class="price-list">
                        ${pro.items.map(item => `<li><i class="fa-solid fa-check"></i> ${item}</li>`).join('')}
                    </ul>
                    <a href="#booking" class="btn btn-price-featured" data-service-id="chuyen-dung">Đặt lịch ngay</a>
                </article>

                <article class="price-card ${vip.type}">
                    <div class="price-badge">${vip.name}</div>
                    <div class="price-icon"><i class="fa-solid ${vip.icon}"></i></div>
                    <div class="price-amount">${vip.price}</div>
                    <div class="price-time"><i class="fa-regular fa-clock"></i> ${vip.time}</div>
                    <div class="price-split">
                        ${vip.split.map(group => `
                            <div class="split-col">
                                <h4>${group[0]}</h4>
                                <ul class="price-list">
                                    ${group[1].map(item => `<li><i class="fa-solid fa-check"></i> ${item}</li>`).join('')}
                                </ul>
                            </div>
                        `).join('')}
                    </div>
                    <a href="#booking" class="btn btn-price" data-service-id="${vip.type}">Đặt lịch ngay</a>
                </article>
            </div>
        </div>
    </section>
`;
}

const renderBenefits = (benefits) => `
    <section id="benefits" class="section">
        <div class="container">
            <div class="section-header">
                <span class="section-tag">✨ Lợi Ích</span>
                <h2>Lợi ích khi gội đầu dưỡng sinh</h2>
                <p class="section-desc">Trải nghiệm và cảm nhận sự thay đổi tích cực từ cơ thể đến tinh thần</p>
            </div>
            <div class="benefits-grid">
                ${benefits.map(item => `
                    <article class="benefit-card">
                        <div class="benefit-icon">${item[0]}</div>
                        <h3>${item[1]}</h3>
                        <p>${item[2]}</p>
                    </article>
                `).join('')}
            </div>
        </div>
    </section>
`;

const renderReviews = (reviews) => `
    <section class="section">
        <div class="container">
            <div class="section-header">
                <span class="section-tag">⭐ Đánh Giá</span>
                <h2>Khách hàng nói gì về chúng tôi</h2>
            </div>
            <div class="reviews-grid">
                ${reviews.map(item => `
                    <article class="review-card">
                        <div class="review-stars">${item[0]}</div>
                        <p>"${item[1]}"</p>
                        <div class="review-author">
                            <div class="author-avatar">${item[4]}</div>
                            <div>
                                <strong>${item[2]}</strong>
                                <span>${item[3]}</span>
                            </div>
                        </div>
                    </article>
                `).join('')}
            </div>
        </div>
    </section>
`;

const renderBooking = () => `
    <section id="booking" class="section">
        <div class="container">
            <div class="booking-wrapper">
                <div class="booking-info">
                    <span class="section-tag">🌿 ĐẶT LỊCH HẸN</span>
                    <h2>Đặt Lịch Trải Nghiệm Gội Đầu Dưỡng Sinh</h2>
                    <p>Chỉ mất khoảng 30 giây để đặt lịch. Chúng tôi sẽ liên hệ xác nhận và tư vấn gói dịch vụ phù hợp với bạn.</p>
                    <div class="booking-highlights">
                        <div class="bh-item"><i class="fa-solid fa-clock"></i><span>Thời gian linh hoạt từ 07:00 - 22:00</span></div>
                        <div class="bh-item"><i class="fa-solid fa-shield-halved"></i><span>Xác nhận qua Zalo & điện thoại</span></div>
                        <div class="bh-item"><i class="fa-solid fa-gift"></i><span>Tư vấn gói dịch vụ phù hợp</span></div>
                    </div>
                </div>

                <div class="booking-form-box">
                    <form id="bookingForm">
                        <h3>📝 Thông tin khách hàng</h3>
                        <div class="form-group">
                            <label><i class="fa-solid fa-user"></i> Họ và tên <span class="required">*</span></label>
                            <input type="text" id="name" placeholder="Nguyễn Văn A" required>
                        </div>
                        <div class="form-group">
                            <label><i class="fa-solid fa-phone"></i> Số điện thoại <span class="required">*</span></label>
                            <input type="tel" id="phone" placeholder="09xxxxxxxx" required>
                        </div>
                        <div class="form-group">
                            <label><i class="fa-solid fa-envelope"></i> Email (Không bắt buộc)</label>
                            <input type="email" id="email" placeholder="example@gmail.com">
                        </div>
                        <div class="form-group">
                            <label><i class="fa-solid fa-venus-mars"></i> Giới tính</label>
                            <div class="radio-group">
                                <label class="radio-label"><input type="radio" name="gender" value="nam"> Nam</label>
                                <label class="radio-label"><input type="radio" name="gender" value="nu" checked> Nữ</label>
                                <label class="radio-label"><input type="radio" name="gender" value="khac"> Khác</label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label><i class="fa-solid fa-cake-candles"></i> Tuổi (Không bắt buộc)</label>
                            <input type="number" id="age" placeholder="25" min="10" max="100">
                        </div>
                        <div class="form-group">
                            <label><i class="fa-solid fa-spa"></i> Dịch vụ <span class="required">*</span></label>
                            <select id="service" required>
                                <option value="">-- Chọn dịch vụ --</option>
                                <option value="co-ban">Gói Cơ Bản - 39.000đ</option>
                                <option value="chuyen-dung">Gói Chuyên Dùng - 79.000đ</option>
                                <option value="vip">Gói VIP - 199.000đ</option>
                            </select>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label><i class="fa-solid fa-calendar"></i> Chọn ngày <span class="required">*</span></label>
                                <input type="date" id="date" required>
                            </div>
                            <div class="form-group">
                                <label><i class="fa-solid fa-clock"></i> Chọn giờ <span class="required">*</span></label>
                                <select id="time" required>
                                    <option value="">-- Chọn giờ --</option>
                                    <option value="07:00">07:00</option><option value="08:00">08:00</option><option value="09:00">09:00</option>
                                    <option value="10:00">10:00</option><option value="11:00">11:00</option><option value="13:00">13:00</option>
                                    <option value="14:00">14:00</option><option value="15:00">15:00</option><option value="16:00">16:00</option>
                                    <option value="17:00">17:00</option><option value="18:00">18:00</option><option value="19:00">19:00</option>
                                    <option value="20:00">20:00</option><option value="21:00">21:00</option><option value="22:00">22:00</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label><i class="fa-solid fa-comment-dots"></i> Ghi chú (Không bắt buộc)</label>
                            <textarea id="note" placeholder="Nhập ghi chú nếu có..." rows="3"></textarea>
                        </div>
                        <button type="submit" class="btn btn-submit"><i class="fa-solid fa-calendar-check"></i> ĐẶT LỊCH NGAY</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
`;

const renderContact = (contacts) => `
    <section id="contact" class="section">
        <div class="container">
            <div class="section-header">
                <span class="section-tag">📍 Liên Hệ</span>
                <h2>Thông tin liên hệ</h2>
                <p class="section-desc">Chúng tôi luôn sẵn sàng phục vụ bạn</p>
            </div>
            <div class="contact-grid">
                <div class="contact-map">
                    <iframe src="https://www.google.com/maps?q=${encodeURIComponent('51B Cao Thắng Phường Langbiang - Đà Lạt, Lâm Đồng')}&output=embed" width="100%" height="400" style="border:0; border-radius: 16px;" allowfullscreen="" loading="lazy"></iframe>
                </div>
                <div class="contact-info-grid">
                    <div class="contact-card">
                        <div class="contact-icon"><i class="fa-solid fa-location-dot"></i></div>
                        <h4>Địa chỉ</h4>
                        <p>${contacts.address}</p>
                    </div>
                    <div class="contact-card">
                        <div class="contact-icon"><i class="fa-solid fa-phone"></i></div>
                        <h4>Điện thoại</h4>
                        ${contacts.phones.map(phone => `<a href="tel:${phone.replace(/\s/g, '')}">${phone}</a>`).join('')}
                    </div>
                    <div class="contact-card">
                        <div class="contact-icon"><i class="fa-solid fa-envelope"></i></div>
                        <h4>Email</h4>
                        <a href="mailto:${contacts.email}">${contacts.email}</a>
                    </div>
                    <div class="contact-card">
                        <div class="contact-icon"><i class="fa-brands fa-facebook"></i></div>
                        <h4>Facebook</h4>
                        <a href="${contacts.facebook}" target="_blank">Fanpage Chans</a>
                    </div>
                    <div class="contact-card">
                        <div class="contact-icon"><i class="fa-solid fa-comment-dots"></i></div>
                        <h4>Zalo</h4>
                        <a href="${contacts.zalo}" target="_blank">${contacts.phones[0]}</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
`;

const renderFooter = (brand, contacts) => `
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <div class="footer-logo">
                        <div class="logo-circle">
                            <img src="image/logo.JPG" alt="${brand.name} logo" class="logo-img">
                        </div>
                        <div class="logo-text">
                            <span class="logo-name">${brand.name}</span>
                            <span class="logo-sub">${brand.subtitle}</span>
                        </div>
                    </div>
                    <p>Chăm sóc tóc – Thư giãn cơ thể – Phục hồi năng lượng</p>
                </div>
                <div class="footer-col">
                    <h4>Dịch vụ</h4>
                    <ul>
                        <li>Gói Cơ Bản - 39.000đ</li>
                        <li>Gói Chuyên Dùng - 79.000đ</li>
                        <li>Gói VIP - 199.000đ</li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Liên hệ nhanh</h4>
                    <ul>
                        <li><i class="fa-solid fa-phone"></i> ${contacts.phones[0]}</li>
                        <li><i class="fa-solid fa-phone"></i> ${contacts.phones[1]}</li>
                        <li><i class="fa-solid fa-envelope"></i> ${contacts.email}</li>
                        <li><i class="fa-solid fa-location-dot"></i> ${contacts.address}</li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>© 2026 Chans - Gội Đầu Dưỡng Sinh. All rights reserved. 🌿</p>
            </div>
        </div>
    </footer>
`;

const renderPopup = () => `
    <div class="popup-overlay" id="popupOverlay">
        <div class="popup">
            <div class="popup-confetti">🎉</div>
            <h2>Đặt lịch thành công!</h2>
            <p>Cảm ơn bạn đã tin tưởng.</p>
            <p>Spa sẽ liên hệ xác nhận trong vài phút.</p>
            <div class="popup-heart">❤️ Hẹn gặp bạn!</div>
            <button class="btn btn-close-popup" id="closePopupBtn">Đóng</button>
        </div>
    </div>
`;

const renderFloatingButton = () => `<a href="#booking" class="float-btn"><i class="fa-solid fa-calendar-check"></i></a>`;

window.renderNav = renderNav;
window.renderHero = renderHero;
window.renderAbout = renderAbout;
window.renderProcess = renderProcess;
window.renderPricing = renderPricing;
window.renderBenefits = renderBenefits;
window.renderReviews = renderReviews;
window.renderBooking = renderBooking;
window.renderContact = renderContact;
window.renderFooter = renderFooter;
window.renderPopup = renderPopup;
window.renderFloatingButton = renderFloatingButton;
