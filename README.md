# Image Background Remover 🎨

AI-powered background removal tool built with Next.js + Tailwind CSS.

![Demo](https://img.shields.io/badge/Next.js-14.1.0-black?logo=next.js)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4.1-38bdf8?logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.0-blue?logo=typescript)

## ✨ Features

- 🚀 **One-Click Background Removal** - Powered by Remove.bg AI
- 📦 **Batch Processing** - Upload and process multiple images at once
- 🎯 **Before/After Comparison** - Side-by-side preview
- 💾 **Instant Download** - Get transparent PNG immediately
- 🔒 **Privacy First** - Images processed in browser, not stored on server
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- ⚙️ **API Key Storage** - Saved locally in your browser

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Remove.bg API Key (free: https://www.remove.bg/api)

### Installation

```bash
# Clone the repository
git clone https://github.com/liaoliu51/image-background-remover.git
cd image-background-remover

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Build static site
npm run build

# Output will be in ./out directory
# Deploy to Cloudflare Pages, Vercel, Netlify, etc.
```

## 📖 Usage

1. **Configure API Key** (first time only)
   - Click "API Settings" in the header
   - Enter your Remove.bg API Key
   - Key is saved locally in your browser

2. **Upload Images**
   - Drag & drop images onto the upload area
   - Or click to select files
   - Supports: JPG, PNG, WebP (max 5MB each)

3. **Remove Background**
   - Click "Remove Background" on individual images
   - Or "Remove All Backgrounds" for batch processing

4. **Download**
   - Click "Download" to save the transparent PNG
   - File will be named `{original_name}_no_bg.png`

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| Framework | Next.js 14 |
| Styling | Tailwind CSS 3 |
| Language | TypeScript |
| Icons | Lucide React |
| AI Service | Remove.bg API |
| Deployment | Cloudflare Pages (static export) |

## 📁 Project Structure

```
image-background-remover/
├── app/
│   ├── globals.css      # Global styles + Tailwind
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main page component
│   └── page.tsx         # Home page with upload UI
├── public/              # Static assets
├── .gitignore
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Dependencies
└── README.md            # This file
```

## 🌐 Deployment

### Cloudflare Pages (Recommended)

1. Push code to GitHub
2. Go to Cloudflare Dashboard → Pages → Create Project
3. Connect your GitHub repository
4. Build settings:
   - **Framework preset:** Next.js
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
5. Deploy!

### Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Auto-detects Next.js configuration
4. Deploy!

### Netlify

1. Push code to GitHub
2. Create new site from Git
3. Build command: `npm run build`
4. Publish directory: `out`
5. Deploy!

## ⚙️ Configuration

### Environment Variables (Optional)

Create a `.env.local` file:

```env
# Default Remove.bg API Key (users can override in UI)
NEXT_PUBLIC_REMOVEBG_API_KEY=your_api_key_here
```

### API Key Management

- API keys are stored in browser localStorage
- Each user can configure their own key
- Keys never leave the user's browser

## 📊 API Usage & Costs

| Plan | Free Quota | Overage |
|------|------------|---------|
| Remove.bg | 50 images/month | $0.01-0.02/image |

Check your usage at: https://www.remove.bg/dashboard

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Remove.bg](https://www.remove.bg/) for the amazing API
- [Next.js](https://nextjs.org/) team for the fantastic framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Lucide Icons](https://lucide.dev/) for beautiful icons

## 📞 Support

- GitHub Issues: https://github.com/liaoliu51/image-background-remover/issues
- Email: 254252556@qq.com

---

Made with ❤️ by [liaoliu51](https://github.com/liaoliu51)
