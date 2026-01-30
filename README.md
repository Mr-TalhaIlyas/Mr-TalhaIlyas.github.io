# Talha Ilyas - Vision Intelligence Portfolio

<div align="center">

![Portfolio Preview](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-r160-000000?style=for-the-badge&logo=three.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)

**A futuristic, interactive research portfolio showcasing Computer Vision and Medical AI research.**

[Live Demo](https://Mr-TalhaIlyas.github.io/profile) · [Google Scholar](https://scholar.google.com/citations?user=HYNOyyAAAAAJ) · [GitHub](https://github.com/Mr-TalhaIlyas)

</div>

---

## ✨ Features

- **🎨 Cyber-Agritech Aesthetic** - Unique design blending organic data with high-tech interfaces
- **🌐 Interactive 3D Background** - React Three Fiber powered WebGL scene with particle systems
- **📊 Animated Data Visualization** - Real-time counters, progress gauges, and dynamic metrics
- **📚 Scholar-Sync Automation** - Auto-updated publications from Google Scholar via GitHub Actions
- **⚡ Performance Optimized** - Code splitting, lazy loading, and responsive 3D rendering
- **📱 Fully Responsive** - Adaptive design with mobile-first approach

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Mr-TalhaIlyas/profile.git
cd profile

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview  # Preview production build locally
```

## 📁 Project Structure

```
profile/
├── .github/
│   └── workflows/
│       ├── deploy.yml          # GitHub Pages deployment
│       └── scholar_sync.yml    # Weekly publication sync
├── public/
│   ├── data/
│   │   └── publications.json   # Auto-synced publication data
│   └── favicon.svg
├── scripts/
│   └── fetch_citations.py      # Google Scholar scraper
├── src/
│   ├── components/
│   │   ├── Background3D.jsx    # R3F particle scene
│   │   ├── Navigation.jsx
│   │   ├── Footer.jsx
│   │   ├── LoadingScreen.jsx
│   │   └── UIComponents.jsx    # Reusable UI elements
│   ├── pages/
│   │   ├── Hero.jsx            # Landing page with 3D scene
│   │   ├── About.jsx           # Profile & timeline
│   │   ├── Projects.jsx        # Research projects showcase
│   │   ├── Publications.jsx    # Scholar-synced publications
│   │   ├── Software.jsx        # Open-source toolkits
│   │   └── Contact.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css               # Tailwind + custom styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🔧 Configuration

### Tailwind Theme

The custom Cyber-Agritech color palette is defined in `tailwind.config.js`:

```javascript
colors: {
  'holo': {
    green: '#00ff9f',
    cyan: '#00f0ff',
    purple: '#b14aed',
  },
  'cyber': {
    900: '#0a0f1a',
    800: '#0d1424',
  }
}
```

### Scholar-Sync

The GitHub Action runs weekly to update publication data:

1. **Manual trigger**: Go to Actions → Scholar-Sync → Run workflow
2. **Automatic**: Runs every Sunday at 00:00 UTC
3. **Configuration**: Edit `SCHOLAR_ID` in `scripts/fetch_citations.py`

## 🚢 Deployment to GitHub Pages

### Method 1: GitHub Actions (Recommended)

1. Go to your repository Settings → Pages
2. Under "Build and deployment", select **GitHub Actions**
3. Push to `main` branch - deployment happens automatically

### Method 2: Manual Deploy

```bash
# Build and deploy
npm run build
npm run deploy
```

### Important Notes

- The site uses `HashRouter` for GitHub Pages compatibility
- Base path is configured in `vite.config.js` as `/profile/`
- Update the `homepage` field in `package.json` if using a different repo name

## 🛠️ Technologies

| Category | Technologies |
|----------|-------------|
| **Framework** | React 18, Vite 5 |
| **3D Graphics** | Three.js, React Three Fiber, Drei |
| **Animation** | Framer Motion |
| **Styling** | Tailwind CSS |
| **Routing** | React Router v6 (HashRouter) |
| **Icons** | React Icons |
| **Automation** | Python, GitHub Actions |

## 📊 Featured Research

### CWD30 Dataset
- **219,770+** images
- **30** plant species (20 weeds, 10 crops)
- **88.54%** mIOU with SegNeXt

### DIANA System
- Paprika disease phenotyping
- **91.7%** mAP detection accuracy
- Multi-task learning approach

### Software Toolkits
- **EMPatches** - Image patch extraction/merging
- **SeizureKit** - Medical EEG analysis

## 📜 License

MIT License - see [LICENSE](LICENSE) for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Mr-TalhaIlyas/profile/issues).

---

<div align="center">

**Built with ❤️ by [Talha Ilyas](https://github.com/Mr-TalhaIlyas)**

*AIM for Health Lab, Monash University*

</div>
