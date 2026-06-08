<div align="center">

<img src="https://img.shields.io/badge/-%F0%9F%8E%AC%20CineVault-0a0a0f?style=for-the-badge&labelColor=f5c518&color=0a0a0f" height="45"/>

# 🎬 CineVault — Movie Discovery App

**A cinematic, modern movie discovery web app**  
Built with pure **HTML · CSS · JavaScript** and powered by the **TMDB API**

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-Click%20Here-f5c518?style=for-the-badge&logoColor=black)](https://shahidchowdhurydev.github.io/CineVault/)
[![GitHub Stars](https://img.shields.io/github/stars/shahidchowdhurydev/CineVault?style=for-the-badge&color=f5c518)](https://github.com/shahidchowdhurydev/CineVault/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/shahidchowdhurydev/CineVault?style=for-the-badge&color=f5c518)](https://github.com/shahidchowdhurydev/CineVault/forks)

<br/>

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![TMDB](https://img.shields.io/badge/TMDB%20API-01B4E4?style=flat-square&logo=themoviedatabase&logoColor=white)](https://www.themoviedb.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-✅%20Active-22c55e?style=flat-square)]()

</div>

---

## 📖 About The Project

**CineVault** is a responsive, cinematic movie discovery web app that lets you explore millions of movies — search by title, filter by category, and view full details including ratings, runtime, budget, and overview.

This project was built as a **portfolio project** to demonstrate real-world frontend skills:
- Consuming a **REST API** (TMDB) using `fetch()` and `async/await`
- **Dynamic DOM manipulation** — creating elements with JavaScript
- **Responsive design** using CSS Grid and Flexbox
- **Modern UI/UX** with animations, modals, and dark theme

> 🎓 Beginner-friendly codebase — every function and concept is explained with comments.

---

## ✨ Features

```
🔍  Search         →  Find any movie by title from millions of results
🔥  Popular        →  Browse trending movies right now
⭐  Top Rated      →  Discover all-time highest rated films
🎬  Upcoming       →  See what's coming to theaters
🍿  Now Playing    →  What's currently on the big screen
🎞️  Movie Details  →  Full backdrop, poster, overview, runtime, budget & revenue
📊  Smart Ratings  →  Color-coded: 🟢 Great  🟠 Average  🔴 Low
📄  Pagination     →  Load more movies without page reload
📱  Responsive     →  Perfect on mobile, tablet & desktop
🌑  Dark Theme     →  Cinematic dark UI with gold accent color
```

---

## 🖥️ Preview

<div align="center">

| Homepage | Movie Details |
|:---:|:---:|
| Popular movies grid with filters | Full detail modal with backdrop |

</div>

---

## 🛠️ Built With

| Technology | Role |
|---|---|
| **HTML5** | Semantic page structure |
| **CSS3** | Grid, Flexbox, Variables, Animations |
| **Vanilla JavaScript ES6+** | Fetch API, Async/Await, DOM API |
| **TMDB API** | Movie data, posters, ratings |
| **Font Awesome 6** | Icons |
| **Google Fonts** | Syne + DM Sans typography |

---

## 📁 Project Structure

```
📦 CineVault/
 ┣ 📄 index.html       ← Page structure (header, hero, grid, modal, footer)
 ┣ 🎨 style.css        ← All styling (dark theme, animations, responsive)
 ┣ ⚙️  app.js           ← All JavaScript logic (API, cards, search, modal)
 ┗ 📖 README.md        ← You are here
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/shahidchowdhurydev/CineVault.git
cd CineVault
```

### 2️⃣ Get a Free TMDB API Key

1. Visit 👉 [https://www.themoviedb.org/](https://www.themoviedb.org/)
2. Create a **free account**
3. Go to **Settings → API → Request API Key**
4. Copy your **API Key (v3 auth)**

### 3️⃣ Add Your API Key

Open `app.js` → find **line 19** → replace the placeholder:

```javascript
// ❌ Before
const API_KEY = "YOUR_TMDB_API_KEY_HERE";

// ✅ After
const API_KEY = "your_real_api_key_here";
```

### 4️⃣ Run the Project

```bash
# Option A: Just open index.html in your browser

# Option B: VS Code → install Live Server extension → click "Go Live"

# Option C: Terminal
npx serve .
```

---

## 📡 API Endpoints Used

| Endpoint | Purpose |
|---|---|
| `GET /movie/popular` | Trending movies |
| `GET /movie/top_rated` | Highest rated films |
| `GET /movie/upcoming` | Coming soon |
| `GET /movie/now_playing` | In theaters now |
| `GET /search/movie?query=` | Search by title |
| `GET /movie/{id}` | Full movie details |

---

## 💡 JavaScript Concepts Used

> Perfect for beginners learning these topics:

| Concept | Used In |
|---|---|
| `async / await` | All API calls |
| `fetch()` | HTTP requests to TMDB |
| `addEventListener()` | Search, filters, modal |
| `createElement()` | Building movie cards |
| Template Literals `` `${}` `` | Dynamic HTML strings |
| Arrow Functions `=>` | All event handlers |
| Ternary Operator `? :` | Conditional rendering |
| `try / catch / finally` | Error handling |
| CSS Class toggling | Active filters, spinner, modal |

---

## 🌐 Deployment

### GitHub Pages (Free)
1. Go to repo **Settings → Pages**
2. Source: **Deploy from branch → main → / (root)**
3. Save → Your app is live at:  
   `https://shahidchowdhurydev.github.io/CineVault/`

### Netlify (Drag & Drop)
1. Visit [netlify.com](https://netlify.com)
2. Drag your project folder → instant live URL ✅

---

## 🗺️ Roadmap

- [x] Movie search
- [x] Category filters
- [x] Movie detail modal
- [x] Responsive design
- [x] Load more pagination
- [ ] Save favorites to localStorage
- [ ] Filter by genre
- [ ] YouTube trailer embed
- [ ] Light / dark mode toggle
- [ ] Infinite scroll

---

## 🤝 Contributing

Contributions are welcome! Here's how:

```bash
# 1. Fork this repository
# 2. Create your feature branch
git checkout -b feature/YourFeature

# 3. Commit your changes
git commit -m "✨ Add YourFeature"

# 4. Push to your branch
git push origin feature/YourFeature

# 5. Open a Pull Request
```

---

## 📄 License

Distributed under the **MIT License**.  
See [`LICENSE`](LICENSE) for more information.

---

## 👨‍💻 Author

<div align="center">

**Engr. Md. Shahid Chowdhury**

*Full-Stack Developer (MERN) | EdTech Software Engineer | 8+ Years Experience*

*Deployed interactive learning software across 650+ government schools in Bangladesh 🇧🇩*

<br/>

[![GitHub](https://img.shields.io/badge/GitHub-shahidchowdhurydev-181717?style=for-the-badge&logo=github)](https://github.com/shahidchowdhurydev)
[![Email](https://img.shields.io/badge/Email-engr.mdshahid%40gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:engr.mdshahid@gmail.com)
[![Location](https://img.shields.io/badge/📍-Dhaka%2C%20Bangladesh-4CAF50?style=for-the-badge)](https://github.com/shahidchowdhurydev)

</div>

---

## 🙏 Acknowledgments

- Movie data & images — **[The Movie Database (TMDB)](https://www.themoviedb.org/)**
- Icons — **[Font Awesome](https://fontawesome.com/)**
- Fonts — **[Google Fonts](https://fonts.google.com/)** (Syne + DM Sans)

---

<div align="center">

**If this project helped you, please give it a ⭐ — it means a lot!**

</div>
