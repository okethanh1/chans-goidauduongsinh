export const renderNav = (brand, nav) => `
    <nav id="navbar">
        <div class="nav-container container">
            <a href="#home" class="logo">
                <div class="logo-circle">🌿</div>
                <div class="logo-text">
                    <span class="logo-name">${brand.name}</span>
                    <span class="logo-sub">${brand.subtitle}</span>
                </div>
            </a>

            <button class="hamburger" id="hamburger" aria-label="Mở menu">
                <span></span><span></span><span></span>
            </button>

            <ul class="nav-links" id="navLinks">
                ${nav.map(item => `<li><a href="${item.href}">${item.label}</a></li>`).join("")}
            </ul>

            <a href="#booking" class="btn-book-nav">Đặt lịch ngay</a>
        </div>
    </nav>
`;