document.addEventListener('DOMContentLoaded', function() {
  /*=============== SHOW MENU ===============*/
  const navMenu = document.getElementById("nav-menu"),
      navToggle = document.getElementById("nav-toggle"),
      navClose = document.getElementById("nav-close");

  // Menu Show
  if (navToggle && navMenu) {
      navToggle.addEventListener("click", () => {
          navMenu.classList.add("show-menu");
      });
  }

  // Menu Hide
  if (navClose && navMenu) {
      navClose.addEventListener("click", () => {
          navMenu.classList.remove("show-menu");
      });
  }

  /*=============== REMOVE MENU MOBILE ===============*/
  const navLink = document.querySelectorAll(".nav__link");

  if (navMenu) { // Ensure navMenu is not null before defining the function
      const linkAction = () => {
          navMenu.classList.remove("show-menu");
      };

      navLink.forEach((n) => n.addEventListener("click", linkAction));
  }

  /*=============== SHADOW HEADER ===============*/
  const shadowHeader = () => {
      const header = document.getElementById("header");
      if (header) {
          this.scrollY >= 50
              ? header.classList.add("shadow-header")
              : header.classList.remove("shadow-header");
      }
  };
  window.addEventListener("scroll", shadowHeader);

  /*=============== SHOW SCROLL UP ===============*/ 
  const scrollUp = () => {
      const scrollUp = document.getElementById('scroll-up');
      if (scrollUp) {
          this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                              : scrollUp.classList.remove('show-scroll');
      }
  };
  window.addEventListener('scroll', scrollUp);

  /*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
  const sections = document.querySelectorAll("section[id]");

  function scrollActive() {
      const scrollY = window.pageYOffset;

      sections.forEach((current) => {
          const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute("id");

          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
              const activeLink = document.querySelector(".nav__menu a[href*=" + sectionId + "]");
              if (activeLink) {
                  activeLink.classList.add("active-link");
              }
          } else {
              const activeLink = document.querySelector(".nav__menu a[href*=" + sectionId + "]");
              if (activeLink) {
                  activeLink.classList.remove("active-link");
              }
          }
      });
  }
  window.addEventListener("scroll", scrollActive);

  /*=============== DARK LIGHT THEME ===============*/ 
  const themeButton = document.getElementById("theme-button");
  const darkTheme = "dark-theme";
  const iconTheme = "ri-sun-line";

  if (themeButton) {
      // Previously selected topic (if user selected)
      const selectedTheme = localStorage.getItem("selected-theme");
      const selectedIcon = localStorage.getItem("selected-icon");

      // We obtain the current theme that the interface has by validating the dark-theme class
      const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? "dark" : "light";
      const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? "ri-moon-line" : "ri-sun-line";

      // We validate if the user previously chose a topic
      if (selectedTheme) {
          document.body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme);
          themeButton.classList[selectedIcon === "ri-moon-line" ? "add" : "remove"](iconTheme);
      }

      // Active / deactive the theme manually with the button
      themeButton.addEventListener("click", () => {
          document.body.classList.toggle(darkTheme);
          themeButton.classList.toggle(iconTheme);
          // We save the theme and the current icon that the user chooses
          localStorage.setItem("selected-theme", getCurrentTheme());
          localStorage.setItem("selected-icon", getCurrentIcon());
      });
  }

  /*=============== SCROLL REVEAL ANIMATION ===============*/
  // Please ensure that ScrollReveal script is included in your HTML or this section won't work.
  const sr = ScrollReveal({
      origin: 'top',
      distance: '60px',
      duration: 2500,
      delay: 400,
      // reset: true, // Uncomment to allow animation repeat
  });

  sr.reveal(`.home__data, .join__container, .footer`);
  sr.reveal(`.home__img`, {origin: 'bottom'});
  sr.reveal(`.enjoy__card, .popular__card`, {interval: 100});
  sr.reveal(`.about__data`, {origin: 'right'});
  sr.reveal(`.about__img`, {origin: 'left'});

  sr.reveal(`#products_title`, {origin: 'bottom'});

  sr.reveal(`#benefits_title`, {origin: 'top'});
  sr.reveal(`#benefits_data`, {origin: 'bottom'});

  sr.reveal(`#process_title`, {origin: 'top'});
  sr.reveal(`#process_1`, {origin: 'left'});
  sr.reveal(`#img_process_1`, {origin: 'right'});
  sr.reveal(`#process_2`, {origin: 'right'});
  sr.reveal(`#img_process_2`, {origin: 'left'});
  sr.reveal(`#process_3`, {origin: 'left'});
  sr.reveal(`#img_process_3`, {origin: 'right'});
  sr.reveal(`#process_4`, {origin: 'right'});
  sr.reveal(`#img_process_4`, {origin: 'left'});

  sr.reveal(`#blog_title`, {origin: 'top'});
  sr.reveal(`#blog_card_1`, {origin: 'left'});
  sr.reveal(`#blog_card_2`, {origin: 'bottom'});
  sr.reveal(`#blog_card_3`, {origin: 'right'});
  sr.reveal(`#faq_title`, {origin: 'top'});
  sr.reveal(`.faq__item`, {origin: 'bottom'});

  


  /* Carousel functionality */
  const carouselContainer = document.querySelector('.carousel__container');
  const carouselImages = document.querySelectorAll('.carousel__img');
  const leftButton = document.querySelector('.carousel__button__left');
  const rightButton = document.querySelector('.carousel__button__right');

  let currentIndex = 0; // Track the current index

  function updateCarousel(newIndex) {
      // Ensure newIndex wraps around if it goes out of bounds
      if (newIndex < 0) {
          newIndex = carouselImages.length - 1; // Wrap to last image
      } else if (newIndex >= carouselImages.length) {
          newIndex = 0; // Wrap to first image
      }
      const translateAmount = -100 * newIndex;
      carouselContainer.style.transform = `translateX(${translateAmount}%)`;
      currentIndex = newIndex;
  }

  leftButton.addEventListener('click', () => {
      updateCarousel(currentIndex - 1); // Move to the previous image, wraps around to last if at first
  });

  rightButton.addEventListener('click', () => {
      updateCarousel(currentIndex + 1); // Move to the next image, wraps around to first if at last
  });

  document.querySelectorAll('.faq__question').forEach(button => {
    button.addEventListener('click', () => {
      const faqAnswer = button.nextElementSibling;
      if (faqAnswer.style.maxHeight) {
        faqAnswer.style.maxHeight = null;
        faqAnswer.style.paddingTop = null;
        faqAnswer.style.paddingBottom = null;
      } else {
        document.querySelectorAll('.faq__answer').forEach(answer => {
          answer.style.maxHeight = null;
          answer.style.paddingTop = null;
          answer.style.paddingBottom = null;
        });
        faqAnswer.style.maxHeight = faqAnswer.scrollHeight+30 + "px";
        faqAnswer.style.paddingTop = "1rem";
        faqAnswer.style.paddingBottom = "1rem";
      }
    });
  });
  
  

});

