const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 60, 360)}ms`;
  observer.observe(item);
});

const navs = Array.from(document.querySelectorAll(".nav"));
const mobileQuery = window.matchMedia("(max-width: 820px)");

navs.forEach((nav) => {
  const toggle = nav.querySelector(".nav-toggle");
  const links = nav.querySelector(".nav-links");

  if (!toggle || !links) {
    return;
  }

  const setOpen = (open) => {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute(
      "aria-label",
      open ? "Fermer le menu" : "Ouvrir le menu"
    );
  };

  const syncMenu = () => {
    if (mobileQuery.matches) {
      if (!nav.classList.contains("is-open")) {
        links.setAttribute("hidden", "");
      }
    } else {
      links.removeAttribute("hidden");
      setOpen(false);
    }
  };

  const closeMenu = () => {
    setOpen(false);
    if (mobileQuery.matches) {
      links.setAttribute("hidden", "");
    }
  };

  const openMenu = () => {
    links.removeAttribute("hidden");
    setOpen(true);
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.contains("is-open");
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (!mobileQuery.matches) {
      return;
    }
    if (!nav.contains(event.target) && nav.classList.contains("is-open")) {
      closeMenu();
    }
  });

  mobileQuery.addEventListener("change", syncMenu);
  syncMenu();
});









