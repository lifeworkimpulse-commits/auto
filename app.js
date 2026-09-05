'use strict';
// Plain JavaScript, no dependencies. No form data is sent to a server.
(() => {
  document.documentElement.classList.add('js');
  const allowedDirections = ['workshop', 'technical', 'neighbourhood'];
  const applyDirection = (direction, save = true) => {
    if (!allowedDirections.includes(direction)) return;
    document.documentElement.dataset.direction = direction;
    document.querySelectorAll('[data-direction]').forEach(button => {
      if (button.tagName === 'BUTTON') button.setAttribute('aria-pressed', String(button.dataset.direction === direction));
    });
    if (save) { try { localStorage.setItem('brockley-design-direction', direction); } catch (_) { /* Storage can be disabled. */ } }
  };
  try { applyDirection(localStorage.getItem('brockley-design-direction') || 'workshop', false); } catch (_) { applyDirection('workshop', false); }
  document.querySelectorAll('button[data-direction]').forEach(button => button.addEventListener('click', () => applyDirection(button.dataset.direction)));

  const menu = document.querySelector('.menu-toggle');
  const nav = document.getElementById('primary-nav');
  const closeMenu = () => {
    if (!menu || !nav) return;
    menu.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  };
  menu?.addEventListener('click', () => {
    const expanded = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('is-open', !expanded);
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); }
  });
  window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);

  const motCopy = {
    '4': { price: '45', description: 'For cars and other eligible Class 4 vehicles.', service: 'class4' },
    '7': { price: '50', description: 'For goods vehicles over 3,000kg and up to 3,500kg design gross weight.', service: 'class7' }
  };
  document.querySelectorAll('[data-mot-class]').forEach(button => button.addEventListener('click', () => {
    const value = button.dataset.motClass;
    const selected = motCopy[value];
    if (!selected) return;
    document.querySelectorAll('[data-mot-class]').forEach(item => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    document.getElementById('mot-price').textContent = selected.price;
    document.getElementById('mot-label').textContent = `Class ${value}`;
    document.getElementById('mot-description').textContent = selected.description;
    document.getElementById('mot-enquiry').href = `contact.html?service=${selected.service}#enquiry`;
  }));

  const form = document.getElementById('enquiry-form');
  if (!form) return;
  form.hidden = false;
  const services = {
    class4: 'Class 4 MOT', class7: 'Class 7 MOT', basic: 'Basic service', full: 'Full service',
    service: 'Servicing advice', repair: 'Repairs / diagnostics', aircon: 'Air conditioning (R134a)', other: 'Something else'
  };
  const queryService = new URLSearchParams(window.location.search).get('service');
  if (Object.hasOwn(services, queryService)) form.elements.service.value = queryService;
  const now = new Date();
  form.elements.date.min = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const registration = form.elements.registration;
  registration.addEventListener('input', () => {
    const start = registration.selectionStart;
    const end = registration.selectionEnd;
    registration.value = registration.value.toUpperCase();
    registration.setSelectionRange(start, end);
    registration.setCustomValidity('');
  });
  form.elements.name.addEventListener('input', () => form.elements.name.setCustomValidity(''));
  const result = document.getElementById('enquiry-result');
  form.addEventListener('input', () => { result.hidden = true; });
  form.addEventListener('submit', event => {
    event.preventDefault();
    registration.setCustomValidity(registration.value.trim() ? '' : 'Please enter the vehicle registration.');
    form.elements.name.setCustomValidity(form.elements.name.value.trim() ? '' : 'Please enter your name.');
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const get = name => String(data.get(name) || '').trim();
    const service = services[get('service')];
    if (!service) return;
    const subject = `Website enquiry: ${service} — ${get('registration').toUpperCase()}`;
    const body = [
      'Hello Brockley Rise MOT team,', '', `I would like to enquire about: ${service}.`, '',
      `Name: ${get('name')}`, `Email: ${get('email')}`, `Phone: ${get('phone') || 'Not supplied'}`,
      `Vehicle registration: ${get('registration').toUpperCase()}`,
      `Preferred date: ${get('date') || 'Please advise availability'}`, '',
      'Additional information:', get('message') || 'None supplied.', '',
      'Please confirm availability, the price and any requirements. I understand this is not a confirmed booking.', '',
      'Thank you.'
    ].join('\n');
    document.getElementById('email-preview').value = `Subject: ${subject}\nTo: brockleyrisemot@gmail.com\n\n${body}`;
    document.getElementById('open-email').href = `mailto:brockleyrisemot@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    document.getElementById('copy-status').textContent = '';
    result.hidden = false;
    result.focus({ preventScroll: true });
    result.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  });
  document.getElementById('copy-enquiry').addEventListener('click', async () => {
    const preview = document.getElementById('email-preview');
    const status = document.getElementById('copy-status');
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard not available');
      await navigator.clipboard.writeText(preview.value);
      status.textContent = 'Copied. Paste this into an email and send it to the workshop.';
    } catch (_) {
      preview.focus(); preview.select();
      status.textContent = 'Message selected. Use your device’s Copy command, then paste it into your email app.';
    }
  });
})();
