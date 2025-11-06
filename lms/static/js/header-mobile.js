document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header.global-header');
  if (!header) return;

  const btn   = header.querySelector('.hamburger-menu-mobile');
  const panel = header.querySelector('#mobile-menu-custom');
  if (!btn || !panel) return;

  // ===== Build mobile menu (once) =====
  if (!panel.dataset.built) {
    const items = [];

    // Lấy link điều hướng chính (bên cạnh logo)
    header.querySelectorAll('.nav-links a, .header-logo a.nav-discover, .header-logo .cusc-hover-dd .cusc-hover-dd-item')
      .forEach(a => {
        const href = a.getAttribute('href') || '#';
        const text = (a.textContent || '').trim();
        if (text && !/^#/.test(href)) items.push({ text, href });
      });

    // Lấy link cụm phải (guest: đăng nhập/đăng ký; auth: dashboard, account, sign-out…)
    header.querySelectorAll('.nav-right a, .user-dropdown a, .dropdown-menu a')
      .forEach(a => {
        const href = a.getAttribute('href') || '#';
        const text = (a.textContent || '').trim();
        if (text && !/^#/.test(href)) items.push({ text, href });
      });

    // Fallback tối thiểu
    if (items.length === 0) {
      items.push(
        { text: 'Trang chủ', href: '/' },
        { text: 'Khóa học',  href: '/courses' },
        { text: 'Bảng điều khiển', href: '/dashboard' },
        { text: 'Tài khoản', href: '/account' }
      );
    }

    // Render
    panel.innerHTML = items
      .map(i => `<div class="mobile-nav-link"><a role="menuitem" tabindex="-1" href="${i.href}">${i.text}</a></div>`)
      .join('');
    panel.dataset.built = '1';
  }

  // ===== Toggle =====
  const open = () => {
    panel.classList.remove('hidden');
    btn.setAttribute('aria-expanded', 'true'); // đổi màu vạch bằng CSS
    document.body.classList.add('lock-scroll');
  };
  const close = () => {
    panel.classList.add('hidden');
    btn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('lock-scroll');
  };

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    (btn.getAttribute('aria-expanded') === 'true') ? close() : open();
  });

  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && !btn.contains(e.target)) close();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 992) close();
  });

  // A11y
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      btn.click();
    }
  });
  panel.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { close(); btn.focus(); }
  });
});


// === Không cho header che nội dung (mobile) ===
const headerEl = document.querySelector('header.global-header');
function setBodyTopPadding() {
  const h = headerEl ? headerEl.offsetHeight : 56;
  document.documentElement.style.setProperty('--cusc-header-h', `${h}px`);
  document.body.classList.add('cusc-has-fixed-header');
}
setBodyTopPadding();
window.addEventListener('resize', setBodyTopPadding);
