/* ============================================================
   СЕПТИК·ДИЛЕР — анимации сайта
   Плавное появление при прокрутке + анимированные счётчики.
   Уважает prefers-reduced-motion: при запросе системы
   анимации не запускаются.
   ============================================================ */
(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var hasIO = 'IntersectionObserver' in window;

  /* ---------- 1. Появление блоков при прокрутке ---------- */
  var targets = document.querySelectorAll(
    '.section-title, .section-subtitle, ' +
    '.advantages__grid > *, ' +
    '.product-card, .catalog__more, ' +
    '.install-step, .install__includes, .price-table, ' +
    '.review-card, .case-card, .certificate-card, ' +
    '.faq-item, .calc__box, .stats__item, ' +
    '.contacts__info, .contacts__form'
  );

  function revealAll() {
    targets.forEach(function (el) { el.classList.add('visible'); });
  }

  if (!hasIO) { revealAll(); return; }

  targets.forEach(function (el) {
    el.classList.add('reveal');
    /* лёгкий каскад внутри группы (задержка 0–270 мс) */
    var idx = Array.prototype.indexOf.call(el.parentElement.children, el);
    el.style.transitionDelay = Math.min(idx, 3) * 90 + 'ms';
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(function (el) { io.observe(el); });

  /* ---------- 2. Анимированные счётчики статистики ---------- */
  var counters = document.querySelectorAll('.stats__num');

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count') || '0', 10);
    var duration = 1300;
    var start = null;

    function tick(now) {
      if (!start) start = now;
      var p = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3); /* easeOutCubic */
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
  }

  if (hasIO) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { cio.observe(c); });
  } else {
    counters.forEach(function (c) { c.textContent = c.getAttribute('data-count'); });
  }
})();
