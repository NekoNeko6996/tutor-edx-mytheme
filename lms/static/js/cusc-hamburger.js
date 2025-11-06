/* CUSC Mobile Hamburger - Guest Only */
(() => {
  const root = document.querySelector('[data-cusc-nav]');
  if (!root) return;

  // Kill legacy hamburger if present
  const legacyHamburger = document.querySelector('.hamburger-menu');
  const legacyMobileMenu = document.querySelector('.mobile-menu');
  if (legacyHamburger) legacyHamburger.remove();
  if (legacyMobileMenu) legacyMobileMenu.remove();

  const btn = root.querySelector('#cusc-nav-toggle');
  const drawer = root.querySelector('#cusc-nav-drawer');
  const overlay = root.querySelector('#cusc-nav-overlay');

  // guard
  if (!btn || !drawer || !overlay) return;

  const open = () => {
    root.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    drawer.hidden = false;
    overlay.hidden = false;
    document.documentElement.style.overflow = 'hidden';
  };

  const close = () => {
    root.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
    // dùng timeout để tránh nháy khi đóng (đợi transition)
    setTimeout(() => {
      if (!root.classList.contains('is-open')) {
        drawer.hidden = true;
        overlay.hidden = true;
      }
    }, 240);
  };

  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    expanded ? close() : open();
  });

  overlay.addEventListener('click', close);

  // Đóng bằng ESC
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  // Đóng khi click link trong drawer
  drawer.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (a) close();
  });

  // Đóng khi viewport > breakpoint (đề phòng resize)
  const mq = window.matchMedia('(min-width: 992px)');
  const onMQ = () => { if (mq.matches) close(); };
  mq.addEventListener ? mq.addEventListener('change', onMQ) : mq.addListener(onMQ);
})();
