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

app.innerHTML = `
    ${window.renderNav(brand, nav)}
    ${window.renderHero(heroSlides)}
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
