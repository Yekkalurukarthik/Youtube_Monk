# 🧘 YouTube Monk

A Chrome extension that transforms YouTube into a distraction-free learning environment. It helps you stay focused by hiding distracting content, blocking entertainment videos, and providing timed focus sessions (Monk Mode).

---

## ✨ Features

### 🧘 Monk Mode
- Enable distraction-free YouTube with a single click.
- Hides:
  - Home feed
  - Recommended videos
  - Shorts
  - Comments
  - Sidebar recommendations
  - Mini guide

### ⏱️ Focus Timer
- Set a custom focus session duration.
- Beautiful countdown timer displayed on the top-right corner.
- Monk Mode automatically turns off when the timer ends.
- Timer survives page refreshes.

### 🔍 Search Suggestion Control
- Blur YouTube search suggestions.
- Toggle between hidden and visible suggestions.

### 🚫 Entertainment Filter
Automatically hides videos containing keywords such as:
- Shorts
- Gaming
- Movies
- Trailers
- Pranks
- Comedy
- Music
- Reactions
- MrBeast
- and more...

### 🎨 Modern UI
- Beautiful glassmorphism timer.
- Animated popup dialog for setting focus time.
- Floating Monk Mode controls.

---

## 🛠️ Tech Stack

- JavaScript
- HTML
- CSS
- Chrome Extension Manifest V3
- Chrome Storage API
- MutationObserver API

---

## 📂 Project Structure

```
youtube-monk/
│
├── background.js
├── content.js
├── popup.html
├── popup.js
├── popup.css
├── manifest.json
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md
```

---

## 🚀 Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/youtube-monk.git
```

2. Open Chrome.

3. Navigate to

```
chrome://extensions
```

4. Enable **Developer Mode**.

5. Click **Load unpacked**.

6. Select the project folder.

7. Open YouTube and start using Monk Mode.

---

## 📸 Screenshots

Add screenshots here.

- Home Page
- Monk Mode Enabled
- Focus Timer
- Timer Dialog
- Search Suggestion Blur

---

## ⚙️ How It Works

### Monk Mode

When enabled, the extension hides distracting sections of YouTube including recommendations, comments, Shorts, and the sidebar.

### Focus Timer

Users select a focus duration using a custom popup dialog.

The timer:

- Displays a live countdown.
- Persists after page refresh.
- Automatically disables Monk Mode when completed.

### Entertainment Filter

The extension scans video titles and hides videos containing predefined entertainment-related keywords.

---

## 🔮 Future Enhancements

- 📊 Daily focus statistics
- 📅 Focus history dashboard
- ☁️ User authentication
- 📈 Productivity analytics
- 🎯 Pomodoro mode
- 🔔 Desktop notifications
- 🌙 Dark/Light themes
- 📱 Cross-device sync
- 🤖 AI-based distraction detection

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a new feature branch.

```bash
git checkout -b feature-name
```

3. Commit your changes.

```bash
git commit -m "Add feature"
```

4. Push to your branch.

```bash
git push origin feature-name
```

5. Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

It helps others discover the project and motivates future development.

---
