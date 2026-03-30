const revealItems = document.querySelectorAll(".reveal-up");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const delay = entry.target.dataset.delay || "0";
      entry.target.style.transitionDelay = `${delay}ms`;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.18,
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const tiltCards = document.querySelectorAll(".tilt-card");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    if (window.innerWidth < 992) {
      return;
    }

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 12;
    const rotateX = (0.5 - (y / rect.height)) * 12;

    card.style.setProperty("--tilt-x", `${rotateX.toFixed(2)}deg`);
    card.style.setProperty("--tilt-y", `${rotateY.toFixed(2)}deg`);
    card.style.setProperty("--glow-x", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--glow-y", `${(y / rect.height) * 100}%`);
  });

  card.addEventListener("mouseleave", () => {
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
    card.style.setProperty("--glow-x", "50%");
    card.style.setProperty("--glow-y", "50%");
  });
});

const hero = document.querySelector(".hero-section");
const nav = document.querySelector(".portfolio-nav");

window.addEventListener("scroll", () => {
  const offset = window.scrollY;

  if (hero) {
    hero.style.setProperty("--parallax-shift", `${offset * 0.18}px`);
  }

  if (nav) {
    nav.classList.toggle("nav-scrolled", offset > 24);
  }
});
