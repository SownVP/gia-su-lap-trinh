# Landing page khóa học

Trang tĩnh thuần HTML/CSS/JS, không cần cài đặt hay build.

## Cấu trúc

```
landing-khoa-hoc/
├── index.html          # Toàn bộ nội dung trang (13 mục)
├── assets/
│   ├── css/style.css   # Giao diện — đổi màu ở khối :root đầu file
│   ├── js/main.js      # Menu mobile, form đăng ký, thông báo tự động
│   └── img/            # Đặt ảnh giảng viên, ảnh minh họa vào đây
└── README.md
```

## Chạy thử

Mở `index.html` bằng trình duyệt. Hoặc chạy server cục bộ:

```bash
npx serve .
# hoặc
python -m http.server 8000
```

## Chỉnh sửa

- **Nội dung:** tìm các chỗ `[...]` trong `index.html` và thay bằng nội dung thật.
- **Màu chủ đạo:** sửa `--accent` (và các biến nền) trong `:root` của `style.css`.
- **Video demo:** thay `<div class="media-placeholder">` bằng `<iframe>` YouTube hoặc `<video>`.
- **Gửi form thật:** điền `ENDPOINT` trong `main.js` (Google Apps Script, Formspree, hoặc API riêng). Để trống thì form chỉ hiện thông báo.
- **Thông báo tự động:** sửa đoạn `#auto-reply-text` trong `index.html`; `{name}` sẽ được thay bằng tên người đăng ký.

## Deploy

Kéo thả cả thư mục lên Netlify, hoặc đẩy lên GitHub rồi import vào Vercel / GitHub Pages.
