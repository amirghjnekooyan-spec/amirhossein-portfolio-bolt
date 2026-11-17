const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");
const navLinks = siteNav.querySelectorAll(".nav-link");

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) =>
  link.addEventListener("click", () => {
    siteNav.classList.remove("is-open");
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  })
);

document.addEventListener("click", (event) => {
  if (
    siteNav.classList.contains("is-open") &&
    !siteNav.contains(event.target) &&
    !navToggle.contains(event.target)
  ) {
    siteNav.classList.remove("is-open");
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

const sections = document.querySelectorAll("main section[id]");
const highlightNav = () => {
  const scrollPosition = window.scrollY + 100;
  let currentId = sections[0]?.id;

  sections.forEach((section) => {
    if (scrollPosition >= section.offsetTop) currentId = section.id;
  });

  navLinks.forEach((link) =>
    link.classList.toggle("is-active", link.getAttribute("href") === `#${currentId}`)
  );
};
window.addEventListener("scroll", highlightNav, { passive: true });
highlightNav();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

const showStatus = (message, type) => {
  formStatus.textContent = message;
  formStatus.classList.remove("is-success", "is-error");
  formStatus.classList.add(`is-${type}`);
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !email || !message) {
    showStatus("Please fill in all fields before sending.", "error");
    return;
  }
  if (!emailValid) {
    showStatus("Please enter a valid email address.", "error");
    return;
  }

  showStatus(`Thanks, ${name}! Your message has been sent.`, "success");
  form.reset();
});
