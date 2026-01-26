document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("lang-toggle");
  const knob = document.getElementById("lang-knob");
  const labels = toggle.querySelectorAll("[data-lang]");

  const currentLang = window.location.pathname.startsWith("/en")
    ? "en"
    : "ru";

  setActiveLang(currentLang);

  toggle.addEventListener("click", () => {
    const newLang = currentLang === "ru" ? "en" : "ru";
    switchLang(newLang);
  });

  function switchLang(lang) {
    const path = window.location.pathname.replace(/^\/(ru|en)/, "");
    window.location.href = `/${lang}${path}`;
  }

  function setActiveLang(lang) {
    if (lang === "en") {
      knob.style.left = "calc(100% - 2.75rem)";
    } else {
      knob.style.left = "0.25rem";
    }

    labels.forEach(label => {
      label.classList.toggle(
        "text-[#FFF9F6]",
        label.dataset.lang === lang
      );
      label.classList.toggle(
        "text-[#6B7280]",
        label.dataset.lang !== lang
      );
    });
  }
});
