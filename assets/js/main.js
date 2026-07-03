
(() => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const body = document.body;
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = body.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', (ev) => {
      if (ev.target.matches('a')) {
        body.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const current = document.body.dataset.page || 'inicio';
  document.querySelectorAll('[data-nav]').forEach(a => {
    if (a.dataset.nav === current) a.classList.add('active');
  });

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  document.querySelectorAll('.counter').forEach(counter => {
    const target = Number(counter.dataset.target || 0);
    let started = false;
    const animate = () => {
      if (started) return; started = true;
      const duration = 950;
      const start = performance.now();
      const from = 0;
      const tick = (now) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        counter.textContent = Math.round(from + (target - from) * eased).toLocaleString('es-ES');
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) { animate(); io.disconnect(); }
      }, { threshold: .6 });
      io.observe(counter);
    } else animate();
  });

  // Event/news filtering
  const filterButtons = document.querySelectorAll('[data-filter]');
  const filterItems = document.querySelectorAll('[data-category]');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterItems.forEach(item => {
        const show = filter === 'todos' || item.dataset.category === filter;
        item.style.display = show ? '' : 'none';
      });
    });
  });

  // FAQ accordion
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const open = item.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
    });
  });

  // Static form handler: validates and opens a pre-composed email.
  const forms = document.querySelectorAll('[data-mail-form]');
  forms.forEach(form => {
    const note = form.querySelector('.form-note');
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        if (note) {
          note.className = 'form-note error show';
          note.textContent = 'Revisa los campos obligatorios antes de enviar.';
        }
        return;
      }
      const data = new FormData(form);
      const subject = encodeURIComponent(data.get('asunto') || form.dataset.subject || 'Contacto desde la web AME Ourense');
      const lines = [];
      for (const [key, value] of data.entries()) {
        if (key === 'consent') continue;
        lines.push(`${key}: ${value}`);
      }
      const body = encodeURIComponent(lines.join('\n'));
      const to = form.dataset.to || 'info@asoc-ame.es';
      if (note) {
        note.className = 'form-note success show';
        note.textContent = 'Perfecto. Se abrirá tu correo para enviar el mensaje a AME.';
      }
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    });
  });

  // Newsletter demo
  document.querySelectorAll('[data-newsletter]').forEach(form => {
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!input || !input.value) return;
      alert('Gracias. En producción se conectaría a Mailchimp, Brevo, Acumbamail o el CRM que elija AME.');
      input.value = '';
    });
  });

  // Cookie banner
  const cookieBanner = document.querySelector('.cookie-banner');
  const consentKey = 'ame-cookie-consent-v1';
  if (cookieBanner && !localStorage.getItem(consentKey)) {
    setTimeout(() => cookieBanner.classList.add('show'), 600);
  }
  document.querySelectorAll('[data-cookie-choice]').forEach(button => {
    button.addEventListener('click', () => {
      localStorage.setItem(consentKey, button.dataset.cookieChoice);
      cookieBanner?.classList.remove('show');
    });
  });
})();
