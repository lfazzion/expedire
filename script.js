(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    const closeMenu = () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.querySelector('span').textContent = 'Menu';
      nav.classList.remove('is-open');
    };
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      toggle.querySelector('span').textContent = open ? 'Fechar' : 'Menu';
      nav.classList.toggle('is-open', open);
    });
    nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        toggle.focus();
      }
    });
    document.addEventListener('click', event => {
      if (!event.target.closest('.site-header')) closeMenu();
    });
    matchMedia('(min-width: 721px)').addEventListener('change', closeMenu);
  }

  // Contact actions open the visitor's own email/WhatsApp composer; no backend submission.
  const config = window.EXPEDIRE_CONTACT || {};
  const email = typeof config.email === 'string' && /^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(config.email) ? config.email : '';
  const whatsapp = typeof config.whatsapp === 'string' && /^\d{10,15}$/.test(config.whatsapp) ? config.whatsapp : '';
  const x = typeof config.x === 'string' && /^https:\/\/x\.com\/[A-Za-z0-9_]{1,15}\/?$/.test(config.x) ? config.x : '';
  const channels = { email: email ? `mailto:${email}` : '', whatsapp: whatsapp ? `https://wa.me/${whatsapp}` : '', x };
  document.querySelectorAll('[data-channel]').forEach(link => {
    const channel = link.dataset.channel;
    const href = channels[channel];
    link.hidden = !href;
    if (!href) { link.removeAttribute('href'); return; }
    link.href = href;
    if (channel === 'x') { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
  });
  document.querySelectorAll('[data-email-label]').forEach(label => { label.textContent = email || 'E-mail'; });
  const canContact = Boolean(email || whatsapp);
  document.querySelectorAll('[data-contact-pending]').forEach(el => { el.hidden = canContact; });
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = String(new Date().getFullYear()); });

  document.querySelectorAll('.contact-form').forEach(form => {
    const submit = form.querySelector('[type="submit"]');
    const download = form.querySelector('[data-download]');
    const status = form.querySelector('.form-status');
    const briefing = form.querySelector('[name="briefing"]');
    submit.disabled = false;
    download.hidden = !canContact;
    form.querySelector('[data-submit-label]').textContent = whatsapp ? 'Continuar no WhatsApp' : email ? 'Preparar e-mail' : 'Baixar meu briefing';
    form.querySelector('[data-form-note]').textContent = canContact
      ? 'Seu briefing será aberto no seu aplicativo de ' + (whatsapp ? 'WhatsApp' : 'e-mail') + '. Você revisa a mensagem antes de enviar. Os dados não são armazenados neste site.'
      : 'Um arquivo de texto será salvo no seu dispositivo. Nenhuma informação será enviada.';
    const getBrief = () => {
      if (!form.reportValidity()) return null;
      if (!briefing.value.trim()) {
        status.textContent = 'Conte um pouco sobre o projeto antes de continuar.';
        briefing.focus();
        return null;
      }
      const values = new FormData(form);
      return ['Olá, Expedire! Quero conversar sobre um projeto de automação.', '',
        `Nome: ${String(values.get('nome') || '').trim() || 'Não informado'}`,
        `Empresa: ${String(values.get('empresa') || '').trim() || 'Não informada'}`,
        `Interesse: ${values.get('interesse')}`, '', briefing.value.trim()].join('\n');
    };
    const saveBrief = text => {
      const url = URL.createObjectURL(new Blob([text + '\n'], { type: 'text/plain;charset=utf-8' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = 'meu-projeto-expedire.txt';
      document.body.append(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      status.textContent = 'Briefing preparado para download. Nenhuma mensagem foi enviada.';
    };
    download.addEventListener('click', () => { const text = getBrief(); if (text) saveBrief(text); });
    form.addEventListener('submit', event => {
      event.preventDefault();
      const text = getBrief();
      if (!text) return;
      if (!canContact) { saveBrief(text); return; }
      const href = whatsapp
        ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`
        : `mailto:${email}?subject=${encodeURIComponent('Novo projeto — Expedire')}&body=${encodeURIComponent(text)}`;
      // Long mailto links are not supported by all clients. Keep the local download available.
      status.textContent = 'Abra a mensagem no seu aplicativo para revisar e enviar. Se ele não abrir, baixe o briefing ou use o contato direto ao lado.';
      window.location.assign(href);
    });
  });
})();
