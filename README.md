# Windows XP Portfolio Website 🪟

Portfolio website phong cách Windows XP được xây dựng bằng Vue.js 3 và deploy trên GitHub Pages.

![Windows XP](https://img.shields.io/badge/Windows-XP-0078d6?style=flat-square&logo=windows)
![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=flat-square&logo=vue.js)
![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-222222?style=flat-square&logo=github)

## ✨ Tính năng

### Giao diện

- ✅ Desktop với background "Bliss" giống Windows XP
- ✅ Taskbar với nút Start và system tray hiển thị thời gian
- ✅ Desktop icons: My Computer, Recycle Bin, My_CV.pdf

### Chức năng Start Menu

- ✅ Menu giống Windows XP với các mục:
  - My Documents
  - My Recent Documents
  - My Pictures
  - My Music
  - My Computer
  - Search
  - Help and Support
  - Run...

### Desktop Icons

- **My Computer**: Mở cửa sổ Windows Explorer với các shortcut đến:
  - GitHub Profile
  - TryHackMe Profile
  - Medium Profile
  - LinkedIn Profile
- **My_CV.pdf**: Hiển thị CV trong cửa sổ modal

### Tính năng Windows

- ✅ Drag & drop để di chuyển cửa sổ
- ✅ Minimize, Maximize, Close buttons
- ✅ Title bar màu xanh dương gradient như Windows XP
- ✅ Hỗ trợ nhiều cửa sổ cùng lúc
- ✅ Z-index management cho focus windows

## 🚀 Cài đặt

### Yêu cầu

- Node.js 18+ hoặc 20+
- npm hoặc yarn

### Bước 1: Clone repository

```bash
git clone https://github.com/YOUR_USERNAME/l@t.git
cd l@t
```

### Bước 2: Cài đặt dependencies

```bash
npm install
```

### Bước 3: Tùy chỉnh thông tin cá nhân

Mở file `src/components/Desktop.vue` và thay đổi các URL trong hàm `openMyComputer()`:

```javascript
const openMyComputer = () => {
  const explorerContent = {
    type: "explorer",
    items: [
      {
        id: "github",
        label: "GitHub",
        icon: "💻",
        url: "https://github.com/YOUR_USERNAME", // ← Thay đổi username
      },
      {
        id: "tryhackme",
        label: "TryHackMe",
        icon: "🎯",
        url: "https://tryhackme.com/p/YOUR_USERNAME", // ← Thay đổi username
      },
      // ... các profile khác
    ],
  };
};
```

### Bước 4: Thêm CV của bạn

Đặt file CV (PDF) của bạn vào thư mục `public/cv.pdf`

### Bước 5: Chạy development server

```bash
npm run dev
```

Mở trình duyệt tại `http://localhost:5173`

## 📦 Build cho production

```bash
npm run build
```

File build sẽ nằm trong thư mục `dist/`

## 🌐 Deploy lên GitHub Pages

### Bước 1: Cấu hình repository name

Mở file `vite.config.js` và thay đổi `base`:

```javascript
export default defineConfig({
  plugins: [vue()],
  base: "/your-repo-name/", // ← Thay đổi thành tên repository của bạn
});
```

### Bước 2: Push code lên GitHub

```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/your-repo-name.git
git push -u origin main
```

### Bước 3: Kích hoạt GitHub Pages

1. Vào repository trên GitHub
2. Click **Settings** → **Pages**
3. Trong phần **Source**, chọn:
   - Source: **GitHub Actions**
4. GitHub Actions workflow sẽ tự động chạy và deploy website

### Bước 4: Truy cập website

Sau khi deploy thành công, website sẽ có tại:

```
https://YOUR_USERNAME.github.io/your-repo-name/
```

## 🛠️ Cấu trúc Project

```
l@t/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── public/
│   └── cv.pdf                  # File CV (PDF)
├── src/
│   ├── assets/
│   │   └── css/
│   │       └── xp-style.css    # Windows XP styling
│   ├── components/
│   │   ├── Desktop.vue         # Desktop component
│   │   ├── Taskbar.vue         # Taskbar component
│   │   ├── StartMenu.vue       # Start menu component
│   │   └── Window.vue          # Window component với drag-drop
│   ├── App.vue                 # Root component
│   └── main.js                 # Entry point
├── index.html
├── package.json
├── vite.config.js              # Vite configuration
└── README.md
```

## 🎨 Tùy chỉnh

### Thay đổi Desktop Icons

Chỉnh sửa array `desktopIcons` trong `src/components/Desktop.vue`:

```javascript
const desktopIcons = [
  {
    id: "my-computer",
    label: "My Computer",
    icon: "🖥️",
    type: "explorer",
  },
  // Thêm icon mới...
];
```

### Thay đổi màu sắc

Chỉnh sửa file `src/assets/css/xp-style.css` để thay đổi màu sắc, gradient, và styling.

### Thêm chức năng mới cho Start Menu

Chỉnh sửa `src/components/StartMenu.vue` và xử lý action trong `Desktop.vue`:

```javascript
const handleStartMenuAction = (action) => {
  showStartMenu.value = false;

  if (action === "my-pictures") {
    // Thêm logic mở My Pictures
  }
};
```

## 📱 Responsive Design

Website được tối ưu cho desktop. Trên mobile:

- Start menu sẽ full width
- Windows sẽ tự động maximize
- Desktop icons có kích thước nhỏ hơn

## 🐛 Troubleshooting

### GitHub Pages không hiển thị

1. Kiểm tra `base` trong `vite.config.js` phải match với tên repository
2. Đảm bảo GitHub Actions đã chạy thành công (tab Actions)
3. Kiểm tra Settings → Pages đã được kích hoạt

### CV không hiển thị

1. Đảm bảo file `cv.pdf` nằm trong thư mục `public/`
2. Kiểm tra đường dẫn trong `Desktop.vue` là `/cv.pdf`

### Drag & Drop không hoạt động

1. Kiểm tra console có lỗi JavaScript không
2. Đảm bảo không có CSS `pointer-events: none` trên window titlebar

## 📄 License

MIT License - Bạn có thể tự do sử dụng cho mục đích cá nhân và thương mại.

## 🤝 Đóng góp

Mọi đóng góp đều được hoan nghênh! Hãy tạo issue hoặc pull request.

## 👨‍💻 Tác giả

Tạo bởi **YOUR_NAME** - [GitHub](https://github.com/YOUR_USERNAME)

---

⭐ Nếu bạn thấy project này hữu ích, hãy cho nó một star nhé!
