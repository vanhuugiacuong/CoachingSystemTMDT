// main.js
// Handles smooth scrolling, fade-in on scroll, mobile nav toggle, and footer year.

(function () {
  document.addEventListener("DOMContentLoaded", function () {
    setupSmoothScroll();
    setupRevealOnScroll();
    setupMobileNavToggle();
    setFooterYear();
  });

  function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function (link) {
      link.addEventListener("click", function (event) {
        const targetId = link.getAttribute("href");
        if (!targetId || targetId === "#") return;

        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        event.preventDefault();
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function setupRevealOnScroll() {
    const elements = document.querySelectorAll(".reveal-on-scroll");
    if (!("IntersectionObserver" in window) || elements.length === 0) {
      elements.forEach(function (el) {
        el.classList.add("visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18
      }
    );

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  function setupMobileNavToggle() {
    const toggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (!toggle || !navLinks) return;

    toggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });

    navLinks.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        navLinks.classList.remove("open");
      }
    });
  }

  function setFooterYear() {
    const yearElement = document.getElementById("year");
    if (!yearElement) return;
    yearElement.textContent = new Date().getFullYear();
  }
})();

