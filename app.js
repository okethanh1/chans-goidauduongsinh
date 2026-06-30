(() => {
    const siteData = window.getSiteData ? window.getSiteData() : null;
    if (!siteData) {
        console.error('Site data is unavailable');
        return;
    }

    const {
        brand,
        nav,
        heroSlides,
        about,
        process,
        pricing,
        benefits,
        reviews,
        contacts
    } = siteData;

    const app = document.getElementById('app');

    if (!app) {
        console.error('#app container not found');
        return;
    }

    app.innerHTML = `
        ${window.renderNav(brand, nav)}
        ${window.renderHero(brand, heroSlides)}
        ${window.renderAbout(about)}
        ${window.renderProcess(process)}
        ${window.renderPricing(pricing)}
        ${window.renderBenefits(benefits)}
        ${window.renderReviews(reviews)}
        ${window.renderBooking()}
        ${window.renderContact(contacts)}
        ${window.renderFooter(brand, contacts)}
        ${window.renderPopup()}
        ${window.renderFloatingButton()}
    `;

    initApp();
})();
