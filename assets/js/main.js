// ===== Menu mobile =====
const toggle = document.querySelector('.nav__toggle');
const menu = document.getElementById('nav-menu');

toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', String(open));
});

menu.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});

// ===== Năm ở footer =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Form đăng ký + trả lời tự động =====
const form = document.getElementById('register-form');
const errorBox = document.getElementById('form-error');
const reply = document.getElementById('auto-reply');
const replyText = document.getElementById('auto-reply-text');
const replyTemplate = replyText.textContent;

// Điền URL endpoint để gửi dữ liệu thật (Google Apps Script, Formspree, API riêng…).
// Để trống thì form chỉ hiển thị thông báo, không gửi đi đâu.
const ENDPOINT = '';

const messages = {
  name: 'Nhập họ và tên.',
  email: 'Email chưa đúng định dạng, ví dụ: ban@email.com.',
  phone: 'Số điện thoại cần 10 chữ số, bắt đầu bằng 0.',
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorBox.hidden = true;

  // Kiểm tra từng ô
  let firstInvalid = null;
  for (const input of form.elements) {
    if (!input.name) continue;
    const ok = input.checkValidity();
    input.setAttribute('aria-invalid', String(!ok));
    if (!ok && !firstInvalid) firstInvalid = input;
  }
  if (firstInvalid) {
    errorBox.textContent = messages[firstInvalid.name];
    errorBox.hidden = false;
    firstInvalid.focus();
    return;
  }

  const data = Object.fromEntries(new FormData(form));

  if (ENDPOINT) {
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Đang gửi…';
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(res.status);
    } catch (err) {
      errorBox.textContent = 'Chưa gửi được đăng ký. Kiểm tra kết nối mạng rồi thử lại.';
      errorBox.hidden = false;
      return;
    } finally {
      btn.disabled = false;
      btn.textContent = 'Gửi đăng ký';
    }
  }

  replyText.textContent = replyTemplate.replace('{name}', data.name.trim());
  form.hidden = true;
  reply.hidden = false;
});

document.getElementById('register-again').addEventListener('click', () => {
  form.reset();
  form.querySelectorAll('[aria-invalid]').forEach((i) => i.removeAttribute('aria-invalid'));
  reply.hidden = true;
  form.hidden = false;
  form.querySelector('input').focus();
});
// ===== Marquee: nhân đôi chip để chạy vòng lặp liền mạch =====
document.querySelectorAll('.marquee__track').forEach((track) => {
  [...track.children].forEach((item) => {
    const clone = item.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true'); // trình đọc màn hình không đọc lặp
    track.appendChild(clone);
  });
});