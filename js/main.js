/* ============================================================
   СЕПТИК ПРОФИ — интерактив сайта
   ============================================================ */

/* ====== КОНТАКТНЫЕ ДАННЫЕ (ЗАМЕНИТЕ НА СВОИ) ====== */
const CONTACTS = {
  // Номер WhatsApp в международном формате, без + и пробелов:
  whatsapp: '79107850007',
  // Телефон для tel: ссылок:
  phoneLink: '+79107850007',
  // Город / регион работы (подставляется в тексты):
  city: 'Смоленская, Брянская и Калужская области',
  // Telegram: username без @, напр. 'ZHARA869' → заявка откроется в t.me/ZHARA869
  telegram: 'ZHARA869',
  // Чат-бот МАКС: ссылка вида https://max.ru/join/... (ваш бот в мессенджере MAX)
  max: '',
  // E-mail (домен septikprofi.ru зарегистрирован — заведите почтовый ящик):
  email: 'info@septikprofi.ru'
};

/* ====== БАЗА МОДЕЛЕЙ ДЛЯ ПОДБОРА ======
   people: 2 (2-3 чел), 5 (4-5 чел), 8 (6-8 чел), 12 (10-15 чел)
   modes: permanent (постоянное), seasonal (сезонное)            */
const MODELS = {
  2: [
    { name: 'Евролос ЭКО 3', brand: 'Евролос', price: '100 100 ₽', note: 'Энергонезависимый, для дачи' },
    { name: 'КИТ «БИО»', brand: 'КИТ', price: 'от 98 000 ₽', note: 'Оптимальная цена для сезонного проживания' },
    { name: 'МАЛАХИТ АИР 3', brand: 'Малахит', price: '113 000 ₽', note: 'Компрессорная станция для небольшой семьи' },
    { name: 'МАЛАХИТ 4', brand: 'Малахит', price: '134 000 ₽', note: 'Для круглогодичного проживания' },
    { name: 'ТВЕРЬ Classic 0,35', brand: 'ТВЕРЬ', price: '135 900 ₽', note: 'Очистка 98%, не засоряется' },
    { name: 'Евролос БИО 3', brand: 'Евролос', price: '144 100 ₽', note: 'Станция биологической очистки' }
  ],
  5: [
    { name: 'Евролос ЭКО 5', brand: 'Евролос', price: '118 800 ₽', note: 'Энергонезависимый, для дачи' },
    { name: 'МАЛАХИТ 4', brand: 'Малахит', price: '134 000 ₽', note: 'Для круглогодичного проживания' },
    { name: 'ТВЕРЬ Classic 0,35', brand: 'ТВЕРЬ', price: '135 900 ₽', note: 'Очистка 98%, редкое обслуживание' },
    { name: 'КИТ «КИТ»', brand: 'КИТ', price: 'от 132 000 ₽', note: 'Аэробная очистка, гарантия 25 лет' },
    { name: 'Евролос БИО 5', brand: 'Евролос', price: '157 700 ₽', note: 'Станция биологической очистки' },
    { name: 'МАЛАХИТ 5', brand: 'Малахит', price: '147 000 ₽', note: 'Компрессорная АОС, срок службы 50 лет' },
    { name: 'ТВЕРЬ Classic 0,8', brand: 'ТВЕРЬ', price: '169 800 ₽', note: 'Очистка 98%, редкое обслуживание' }
  ],
  8: [
    { name: 'МАЛАХИТ 6', brand: 'Малахит', price: '165 000 ₽', note: 'Для дома и гостей' },
    { name: 'КИТ «КИТ ПРО»', brand: 'КИТ', price: 'от 149 000 ₽', note: 'Схема A2/O, денитрификация' },
    { name: 'Евролос БИО 8', brand: 'Евролос', price: '200 600 ₽', note: 'Станция биологической очистки' },
    { name: 'МАЛАХИТ 8', brand: 'Малахит', price: '200 000 ₽', note: 'Для постоянного проживания' },
    { name: 'Евролос ГРУНТ 8', brand: 'Евролос', price: '308 600 ₽', note: 'Для высокого УГВ' },
    { name: 'ТВЕРЬ Pro 1,1', brand: 'ТВЕРЬ', price: '193 500 ₽', note: 'Вертикальное исполнение, до 7 человек' }
  ],
  12: [
    { name: 'МАЛАХИТ 10', brand: 'Малахит', price: '243 000 ₽', note: 'До 10 человек, несколько объектов' },
    { name: 'Евролос ПРО 10', brand: 'Евролос', price: '263 400 ₽', note: 'Аэрационная установка' },
    { name: 'Евролос ГРУНТ 10', brand: 'Евролос', price: '371 500 ₽', note: 'Для высокого УГВ' },
    { name: 'МАЛАХИТ 15', brand: 'Малахит', price: '340 000 ₽', note: 'До 15 человек' },
    { name: 'ТВЕРЬ Classic 2', brand: 'ТВЕРЬ', price: '319 400 ₽', note: 'До 12 человек, подключение нескольких объектов' }
  ]
};

/* Фильтр по типу проживания: сезонное — сначала энергонезависимые */
function sortByMode(list, mode) {
  if (mode !== 'seasonal') return list;
  const energyFree = ['ЭКО', 'Lite', 'БИО', 'АИР'];
  return [...list].sort((a, b) => {
    const aFree = energyFree.some(k => a.name.includes(k)) ? 0 : 1;
    const bFree = energyFree.some(k => b.name.includes(k)) ? 0 : 1;
    return aFree - bFree;
  });
}

/* ====== УТИЛИТЫ ====== */
function waLink(text) {
  return 'https://wa.me/' + CONTACTS.whatsapp + '?text=' + encodeURIComponent(text);
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => { t.hidden = true; }, 4200);
}

/* ====== МОБИЛЬНОЕ МЕНЮ ====== */
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  nav.classList.toggle('open');
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('open');
  nav.classList.remove('open');
}));

/* ====== ТАБЫ КАТАЛОГА ====== */
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
  });
});

/* ====== МОДАЛЬНЫЕ ОКНА ====== */
const modals = document.querySelectorAll('.modal');

function openModal(id, product) {
  const m = document.getElementById(id);
  if (!m) return;
  if (product) {
    const input = m.querySelector('input[name="product"]');
    if (input) input.value = product;
  }
  m.hidden = false;
  document.body.style.overflow = 'hidden';
  const f = m.querySelector('input, select');
  if (f) setTimeout(() => f.focus(), 60);
}

function closeModal(m) {
  m.hidden = true;
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-modal]').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    openModal(btn.dataset.modal, btn.dataset.product || '');
  });
});

document.querySelectorAll('.modal [data-close]').forEach(el => {
  el.addEventListener('click', () => closeModal(el.closest('.modal')));
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') modals.forEach(m => { if (!m.hidden) closeModal(m); });
});

/* ====== ОТПРАВКА ЗАЯВОК В TELEGRAM ======
   Клиент заполняет имя и телефон и нажимает «Отправить» —
   заявка уходит на Cloudflare Worker и приходит владельцу в Telegram. */
const FORM_ENDPOINT = 'https://septikprofi-leads.septikprofi-leads.workers.dev/api/lead';

async function sendLead(payload) {
  const res = await fetch(FORM_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('send failed');
}

function bindForm(form, buildPayload) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const name = (form.querySelector('[name="name"]') || {}).value || '';
    const phone = (form.querySelector('[name="phone"]') || {}).value || '';
    const agree = form.querySelector('[name="agree"]');
    const btn = form.querySelector('[type="submit"]');

    if (!name.trim()) { showToast('Пожалуйста, укажите ваше имя'); return; }
    if (!/^[+\d][\d\s()\-]{6,}$/.test(phone.trim())) { showToast('Пожалуйста, укажите корректный номер телефона'); return; }
    if (agree && !agree.checked) { showToast('Необходимо согласие на обработку персональных данных'); return; }

    if (btn) {
      if (!btn.dataset.orig) btn.dataset.orig = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Отправляем…';
    }
    try {
      await sendLead(buildPayload(form, name.trim(), phone.trim()));
      showToast('Заявка отправлена! Перезвоним в течение 15 минут');
      form.reset();
      const prod = form.querySelector('[name="product"]');
      if (prod) prod.value = '';
      const modal = form.closest('.modal');
      if (modal) closeModal(modal);
    } catch (err) {
      showToast('Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам');
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = btn.dataset.orig;
      }
    }
  });
}

bindForm(document.getElementById('contact-form'), (f, name, phone) => ({
  name, phone,
  subject: (f.querySelector('[name="subject"]') || {}).value || ''
}));

document.querySelectorAll('.modal-form').forEach(form => {
  bindForm(form, (f, name, phone) => ({
    name, phone,
    product: (f.querySelector('[name="product"]') || {}).value || '',
    address: (f.querySelector('[name="address"]') || {}).value || ''
  }));
});

/* ====== ПОДБОР СЕПТИКА ====== */
const calcRun = document.getElementById('calc-run');
const calcResults = document.getElementById('calc-results');

function renderCalc() {
  const people = parseInt(document.getElementById('calc-people').value, 10);
  const mode = document.getElementById('calc-mode').value;
  const list = sortByMode(MODELS[people] || MODELS[5], mode);

  const modeLabel = mode === 'seasonal' ? 'сезонное проживание (дача)' : 'постоянное проживание (дом)';
  const peopleLabel = document.getElementById('calc-people').selectedOptions[0].text;

  let html = `<div class="calc__results-title">Подходящие модели для ${peopleLabel.toLowerCase()} — ${modeLabel}:</div>`;
  list.forEach(m => {
    html += `
      <div class="calc__result-card">
        <div>
          <div class="calc__result-name">${m.name}</div>
          <div class="calc__result-brand">${m.brand} · ${m.note}</div>
        </div>
        <div class="calc__result-price">${m.price}</div>
        <button class="btn btn--primary btn--sm" data-calc-order="${m.name} (${m.price})">Заказать</button>
        <div class="calc__result-note">Точную стоимость с учётом вашего участка и монтажа рассчитает инженер — бесплатно.</div>
      </div>`;
  });
  calcResults.innerHTML = html;

  calcResults.querySelectorAll('[data-calc-order]').forEach(b => {
    b.addEventListener('click', () => openModal('modal-order', b.dataset.calcOrder));
  });
}

calcRun.addEventListener('click', renderCalc);
renderCalc();

/* ====== ТЕНЬ ШАПКИ ПРИ СКРОЛЛЕ ====== */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 10 ? '0 6px 20px rgba(16,38,59,.08)' : 'none';
}, { passive: true });

/* ====== ПЛАШКА ЧАТ-БОТА МАКС ======
   Кнопка всегда на месте; открывает чат, как только указана ссылка в CONTACTS.max */
const floatMax = document.getElementById('float-max');
if (floatMax) {
  floatMax.addEventListener('click', e => {
    if (CONTACTS.max) {
      window.open(CONTACTS.max, '_blank');
      return;
    }
    e.preventDefault();
    showToast('Ссылка на чат-бот МАКС появится здесь, как только будет готова');
  });
}
document.querySelectorAll('[data-max-todo]').forEach(el => {
  el.addEventListener('click', e => {
    if (CONTACTS.max) {
      window.open(CONTACTS.max, '_blank');
      return;
    }
    e.preventDefault();
    showToast('Ссылка на чат-бот МАКС появится здесь, как только будет готова');
  });
});

/* ====== HERO-СЛАЙДЕР ====== */
(function () {
  const slides = document.querySelectorAll('.hero__slide');
  if (!slides.length) return;
  const dots = document.querySelectorAll('#hero-dots .hero__dot');
  const prev = document.getElementById('hero-prev');
  const next = document.getElementById('hero-next');
  const hero = document.getElementById('hero');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = 0;
  let timer = null;
  const DELAY = 6500;

  function go(i) {
    current = (i + slides.length) % slides.length;
    slides.forEach((s, idx) => s.classList.toggle('is-active', idx === current));
    dots.forEach((d, idx) => d.classList.toggle('is-active', idx === current));
  }
  function start() { if (reduced || timer) return; timer = setInterval(() => go(current + 1), DELAY); }
  function stop() { clearInterval(timer); timer = null; }
  function restart() { stop(); start(); }

  if (next) next.addEventListener('click', () => { go(current + 1); restart(); });
  if (prev) prev.addEventListener('click', () => { go(current - 1); restart(); });
  dots.forEach(d => d.addEventListener('click', () => { go(+d.dataset.dot); restart(); }));
  if (hero) {
    hero.addEventListener('mouseenter', stop);
    hero.addEventListener('mouseleave', start);
    /* на мобильных свайп по слайду */
    let x0 = null;
    hero.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener('touchend', e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) { go(current + (dx < 0 ? 1 : -1)); restart(); }
      x0 = null;
    }, { passive: true });
  }
  start();
})();

/* ====== ЛАЙТБОКС ФОТО РАБОТ ====== */
(function () {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  const lbImg = document.getElementById('lightbox-img');
  const lbCap = document.getElementById('lightbox-cap');

  document.querySelectorAll('.case-card img').forEach(img => {
    img.addEventListener('click', () => {
      lbImg.src = img.src;
      lbCap.textContent = (img.closest('.case-card').querySelector('figcaption') || {}).textContent || '';
      lb.hidden = false;
      document.body.style.overflow = 'hidden';
    });
  });

  lb.querySelectorAll('[data-lightbox-close]').forEach(el => {
    el.addEventListener('click', () => {
      lb.hidden = true;
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !lb.hidden) {
      lb.hidden = true;
      document.body.style.overflow = '';
    }
  });
})();

/* ====== РУЛЕТКА БОНУСОВ ====== */
(function () {
  const modal = document.getElementById('wheel-modal');
  if (!modal) return;
  const wheel = document.getElementById('wheel');
  const spinBtn = document.getElementById('wheel-spin');
  const resultBox = document.getElementById('wheel-result');
  const resultTitle = document.getElementById('wheel-result-title');
  const takeBtn = document.getElementById('wheel-take');
  const PRIZES = [
    { label: 'Скидка 5% на монтаж', weight: 1 },
    { label: 'Скидка 10% на монтаж', weight: 1 },
    { label: 'Скидка 15% на монтаж', weight: 1 },
    { label: 'Скидка 5% на септик', weight: 1 },
    { label: 'Скидка 10% на септик', weight: 1 },
    { label: 'Скидка 15% на септик', weight: 1 },
    { label: 'ТО септика на год в подарок', weight: 1 },
    { label: 'Бесплатная доставка по области', weight: 1 },
    { label: 'Скидка 5% на монтаж', weight: 1 },
    { label: 'Скидка 10% на монтаж', weight: 1 },
    { label: 'Скидка 15% на монтаж', weight: 1 },
    { label: 'Скидка 5% на септик', weight: 1 },
    { label: 'Скидка 10% на септик', weight: 1 },
    { label: 'Скидка 15% на септик', weight: 1 },
    { label: 'ТО септика на год в подарок', weight: 1 },
    { label: 'Бесплатная доставка по области', weight: 1 }
  ];
  const SEG = 360 / PRIZES.length;
  let rotation = 0;
  let spinning = false;
  let prizeLabel = '';

  function pickPrize() {
    const total = PRIZES.reduce((s, p) => s + p.weight, 0);
    let r = Math.random() * total;
    for (let i = 0; i < PRIZES.length; i++) {
      r -= PRIZES[i].weight;
      if (r <= 0) return i;
    }
    return PRIZES.length - 1;
  }

  function spin() {
    if (spinning) return;
    spinning = true;
    spinBtn.disabled = true;
    resultBox.hidden = true;
    const idx = pickPrize();
    const center = idx * SEG + SEG / 2;
    rotation += 360 * 5 + (360 - center) - (rotation % 360);
    wheel.style.transition = 'transform 4.2s cubic-bezier(.17,.67,.12,.99)';
    wheel.style.transform = 'rotate(' + rotation + 'deg)';
    setTimeout(() => {
      prizeLabel = PRIZES[idx].label;
      resultTitle.textContent = 'Ваш бонус: ' + prizeLabel;
      resultBox.hidden = false;
      spinBtn.disabled = false;
      spinning = false;
    }, 4300);
  }

  spinBtn.addEventListener('click', spin);
  takeBtn.addEventListener('click', () => {
    closeModal(modal);
    openModal('modal-order', 'Бонус: ' + prizeLabel);
  });
  modal.querySelectorAll('[data-wheel-close]').forEach(el => {
    el.addEventListener('click', () => closeModal(modal));
  });

  /* Показываем рулетку раз в день */
  try {
    const KEY = 'sp_wheel_day';
    const today = new Date().toISOString().slice(0, 10);
    if (localStorage.getItem(KEY) !== today) {
      localStorage.setItem(KEY, today);
      setTimeout(() => {
        modal.hidden = false;
        document.body.style.overflow = 'hidden';
      }, 1500);
    }
  } catch (e) { /* localStorage недоступен — рулетка не покажется */ }
})();
