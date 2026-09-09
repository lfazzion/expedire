/* Defina o canal confirmado: mailto:EMAIL ou https://wa.me/55DDDNUMERO. */
const EXPEDIRE_CONTACT_URL = '';

document.documentElement.classList.add('js');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    toggle.textContent = 'Menu';
  };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    toggle.textContent = open ? 'Fechar' : 'Menu';
  });
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      toggle.focus();
    }
  });
  matchMedia('(min-width: 701px)').addEventListener('change', closeMenu);
}
if (/^(mailto:|https:\/\/wa\.me\/)/.test(EXPEDIRE_CONTACT_URL)) {
  document.querySelectorAll('[data-contact-link]').forEach(link => { link.href = EXPEDIRE_CONTACT_URL; });
  document.querySelectorAll('.contact-live').forEach(element => { element.hidden = false; });
  document.querySelectorAll('.contact-pending').forEach(element => { element.hidden = true; });
}
document.querySelectorAll('.contact-form').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const field = form.querySelector('textarea');
    const status = form.querySelector('.form-status');
    const briefing = field.value.trim();
    if (!briefing) {
      status.textContent = 'Descreva sua ideia para salvar o resumo.';
      field.focus();
      return;
    }
    const file = new Blob(['Meu projeto de automação — Expedire\n\n' + briefing + '\n'], {type: 'text/plain;charset=utf-8'});
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'meu-projeto-expedire.txt';
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    status.textContent = 'Resumo preparado para download. Nenhuma mensagem foi enviada.';
  });
  form.querySelector('textarea').disabled = false;
  form.querySelector('button').disabled = false;
});

// Motion is progressive enhancement: all content remains visible without it.
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const progress = document.createElement('div');
progress.className = 'reading-progress';
progress.setAttribute('aria-hidden', 'true');
document.body.append(progress);
let progressFrame = 0;
const updateProgress = () => {
  progressFrame = 0;
  if (motionPreference.matches) return;
  const distance = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0})`;
};
const requestProgress = () => {
  if (!progressFrame && !motionPreference.matches) progressFrame = requestAnimationFrame(updateProgress);
};
addEventListener('scroll', requestProgress, { passive: true });
addEventListener('resize', requestProgress);
motionPreference.addEventListener('change', () => {
  if (motionPreference.matches) {
    document.getAnimations().forEach(animation => animation.cancel());
    document.querySelectorAll('.reveal').forEach(element => element.classList.add('is-visible'));
  }
  requestProgress();
});
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add(entry.target.matches('.conversation-demo') ? 'is-playing' : 'is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.section-head, .product-grid, .method-copy, .contact > div:first-child').forEach(element => {
    element.classList.add('reveal');
    observer.observe(element);
  });
  document.querySelectorAll('.conversation-demo').forEach(demo => {
    let delay = 0;
    demo.querySelectorAll('.bubble').forEach(bubble => {
      if (bubble.classList.contains('appointment')) {
        bubble.style.setProperty('--message-delay', `${delay - 0.55}s`);
        return;
      }
      bubble.parentElement.style.setProperty('--typing-delay', `${delay}s`);
      bubble.style.setProperty('--message-delay', `${delay + 0.75}s`);
      delay += 1.3;
    });
    observer.observe(demo);
  });
}
requestProgress();
