const APP_LINKS = {
  google: "https://play.google.com/store/apps/details?id=wm.randomchat.chat&hl=ko",
  apple: "https://apps.apple.com/kr/app/%EC%83%81%EC%B6%94-%EB%9E%9C%EC%B1%97%EC%9C%BC%EB%A1%9C-%EC%8B%9C%EC%9E%91%ED%95%98%EB%8A%94-%EC%97%B0%EA%B2%B0/id6744034317",
};

const revealElements = document.querySelectorAll(".reveal");
const storeButtons = document.querySelectorAll("[data-store-link]");
const parallaxPanels = document.querySelectorAll(".journey-panel");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.18,
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

storeButtons.forEach((button) => {
  const store = button.getAttribute("data-store-link");
  const link = APP_LINKS[store];

  if (!link) {
    button.setAttribute("aria-disabled", "true");
    button.addEventListener("click", (event) => event.preventDefault());
    return;
  }

  button.href = link;
  button.target = "_blank";
  button.rel = "noreferrer";
});

const updateParallax = () => {
  const viewportHeight = window.innerHeight;

  parallaxPanels.forEach((panel) => {
    const rect = panel.getBoundingClientRect();
    const depth = Number(panel.dataset.depth || 0);
    const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
    const shift = (progress - 0.5) * depth * 220;

    panel.style.transform = `translate3d(0, ${shift}px, 0)`;
  });
};

let ticking = false;

const onScroll = () => {
  if (ticking) {
    return;
  }

  window.requestAnimationFrame(() => {
    updateParallax();
    ticking = false;
  });

  ticking = true;
};

updateParallax();
window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", updateParallax);