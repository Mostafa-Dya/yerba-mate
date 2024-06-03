async function fetchTranslations() {
    const response = await fetch('i18n.json');
    const translations = await response.json();
    return translations;
}

async function setLanguage(lang) {
    const translations = await fetchTranslations();
    var links = document.querySelectorAll('.dropdown-content a');
    links.forEach(function(link) {
      link.classList.remove('active');
    });

    // Add active class to the clicked link
    document.getElementById(lang).classList.add('active');
    document.body.classList.remove('rtl');
      
    if (lang === 'ar') {
      // Add RTL class to body
      document.body.classList.add('rtl');
    }
    // Add fade-out class to all elements with data-key attribute
    document.querySelectorAll('[data-key]').forEach(element => {
        element.classList.add('fade-out');
    });

    // Wait for the fade-out animation to complete
    setTimeout(() => {
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            element.textContent = translations[key][lang];
            element.classList.remove('fade-out');
            element.classList.add('fade-in');
        });

        // Remove the fade-in class after animation completes
        setTimeout(() => {
            document.querySelectorAll('[data-key]').forEach(element => {
                element.classList.remove('fade-in');
            });
        }, 500);

        // Store the selected language in local storage
        localStorage.setItem('i18n', lang);

    }, 500);
}

function getStoredLanguage() {
    return localStorage.getItem('i18n') || 'en';
}

document.addEventListener('DOMContentLoaded', () => {
    const preferredLanguage = getStoredLanguage();
    setLanguage(preferredLanguage);
});
