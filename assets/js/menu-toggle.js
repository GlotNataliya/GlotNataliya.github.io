document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (toggleButton && mobileMenu) {
    toggleButton.addEventListener('click', function () {
      mobileMenu.classList.toggle('hidden');
    });
  }
});
