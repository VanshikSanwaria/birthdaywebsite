# 🎉 Birthday Wishing Website

A modern, personalized birthday celebration website built with React, Next.js, TailwindCSS, and Framer Motion. Features vibrant animations, elegant design, and interactive elements to create a memorable birthday experience.

## ✨ Features

- **4 Beautiful Pages**: Landing, Gallery, Messages, and Surprise
- **Smooth Animations**: Powered by Framer Motion with page transitions
- **Interactive Elements**: Confetti animations, typewriter effects, and micro-interactions
- **Enhanced Audio Controls**: Multi-track player with auto-play, volume control, and track switching
- **Responsive Design**: Mobile-first approach with elegant desktop enhancements
- **Modern Design**: Glassmorphism panels, soft gradients, and elegant typography
- **Accessible**: High contrast ratios, semantic HTML, and keyboard navigation
- **Performance Optimized**: Lazy loading, image optimization, and efficient animations

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager

### Installation & Development

1. **Clone or download the project**
   \`\`\`bash
   # If using git
   git clone <your-repo-url>
   cd birthday-website
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open in browser**
   Navigate to `http://localhost:3000`

### Build & Preview

\`\`\`bash
# Build for production
npm run build

# Preview production build
npm run preview
\`\`\`

## 🌐 Deploy to Vercel

### Option 1: Connect GitHub Repository

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project" and import your GitHub repository
4. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### Option 2: Deploy from Local

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
\`\`\`

### Build Configuration

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

## 🎨 Customization Guide

### 1. Personal Information

**Update the name and messages in `app/page.tsx`:**
\`\`\`tsx
// Change "Beautiful Soul" to the birthday person's name
<span className="block text-primary mt-2">
  [Her Name]
</span>

// Update the subtitle message
<p className="text-xl md:text-2xl text-muted-foreground mb-12">
  [Your personal message here]
</p>
\`\`\`

### 2. Add Photos

**Create image folders:**
\`\`\`
public/
  images/
    gallery/
      photo1.jpg
      photo2.jpg
      ...
\`\`\`

**Update gallery in `app/gallery/page.tsx`:**
\`\`\`tsx
const photos = [
  { src: '/images/gallery/photo1.jpg', alt: 'Description' },
  { src: '/images/gallery/photo2.jpg', alt: 'Description' },
  // Add more photos
]
\`\`\`

### 3. Customize Messages

**Edit messages in `app/messages/page.tsx`:**
\`\`\`tsx
const messages = [
  {
    name: "Friend's Name",
    message: "Your birthday message here...",
    avatar: "/images/avatars/friend1.jpg"
  },
  // Add more messages
]
\`\`\`

### 4. Add Background Music

**Add audio files:**
\`\`\`
public/
  audio/
    happy-birthday.mp3
    celebration.mp3
    birthday-wishes.mp3
\`\`\`

**Update AudioPlayer component:**
\`\`\`tsx
<AudioPlayer 
  tracks={[
    { title: "Happy Birthday Song", src: "/audio/happy-birthday.mp3" },
    { title: "Celebration", src: "/audio/celebration.mp3" },
    { title: "Birthday Wishes", src: "/audio/birthday-wishes.mp3" },
  ]}
  autoPlay={true}
/>
\`\`\`

### 5. Color Customization

**Edit `app/globals.css` color tokens:**
\`\`\`css
:root {
  --primary: oklch(0.55 0.22 25); /* Change primary color */
  --accent: oklch(0.75 0.15 65);  /* Change accent color */
  /* Modify other colors as needed */
}
\`\`\`

### 6. Surprise Page Letter

**Edit the special letter in `app/surprise/page.tsx`:**
\`\`\`tsx
const specialLetter = `Your personalized letter content here...`
\`\`\`

## 📁 Project Structure

\`\`\`
birthday-website/
├── README.md
├── package.json
├── next.config.mjs
├── tailwind.config.js
├── tsconfig.json
├── vercel.json
├── .gitignore
├── public/
│   ├── images/
│   │   ├── gallery/
│   │   └── avatars/
│   └── audio/
│       ├── happy-birthday.mp3
│       ├── celebration.mp3
│       └── birthday-wishes.mp3
├── app/
│   ├── layout.tsx
│   ├── page.tsx (Landing)
│   ├── globals.css
│   ├── gallery/
│   │   └── page.tsx
│   ├── messages/
│   │   └── page.tsx
│   └── surprise/
│       └── page.tsx
├── components/
│   ├── ui/ (shadcn components)
│   ├── NavBar.tsx
│   ├── Footer.tsx
│   ├── AudioPlayer.tsx
│   ├── ImageGrid.tsx
│   ├── ImageCard.tsx
│   ├── AnimatedMessageCard.tsx
│   ├── ConfettiController.tsx
│   ├── FloatingElements.tsx
│   ├── CountdownReveal.tsx
│   ├── BirthdayGame.tsx
│   ├── PageTransition.tsx
│   └── LoadingSpinner.tsx
├── lib/
│   └── utils.ts
└── hooks/
    ├── use-mobile.tsx
    └── use-toast.ts
\`\`\`

## 🛠 Troubleshooting

### Common Issues

**1. Build fails with font errors**
\`\`\`bash
# Clear Next.js cache
rm -rf .next
npm run build
\`\`\`

**2. Images not loading**
- Ensure images are in `public/images/` directory
- Check file paths are correct (case-sensitive)
- Verify image formats are supported (jpg, png, webp)

**3. Audio not playing**
- Check audio files are in `public/audio/` directory
- Ensure audio formats are supported (mp3, wav, ogg)
- Some browsers require user interaction before playing audio
- Check browser console for CORS or loading errors

**4. Animations not working**
- Verify Framer Motion is installed: `npm list framer-motion`
- Check for JavaScript errors in browser console
- Ensure components are client-side: `'use client'` directive

**5. Page transitions not smooth**
- Check if PageTransition component is properly wrapped in layout
- Verify no conflicting CSS transitions
- Test on different browsers for compatibility

### Performance Tips

- Optimize images before adding (use WebP format when possible)
- Keep audio files under 5MB for faster loading
- Test on mobile devices for responsive design
- Use browser dev tools to monitor performance
- Enable compression in Vercel settings

## 🎯 Advanced Features

### Analytics Integration

Add Google Analytics or other tracking:

\`\`\`tsx
// In app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId="GA_MEASUREMENT_ID" />
      </body>
    </html>
  )
}
\`\`\`

### Progressive Web App (PWA)

Add PWA capabilities:

\`\`\`bash
npm install next-pwa
\`\`\`

### Database Integration

For dynamic messages and photos:

\`\`\`bash
npm install @supabase/supabase-js
# or
npm install prisma @prisma/client
\`\`\`

## 📝 Environment Variables

Currently, no environment variables are required. If you add features like:
- Contact forms → Add email service API keys
- Analytics → Add tracking IDs  
- Database → Add connection strings
- Social sharing → Add API keys

Add them to your Vercel project settings under "Environment Variables".

## 🎵 Audio Guidelines

### Supported Formats
- **MP3**: Best compatibility across browsers
- **WAV**: High quality but larger file size
- **OGG**: Good compression, modern browser support

### Audio Optimization
- Keep files under 5MB for web performance
- Use 128kbps bitrate for background music
- Consider fade-in/fade-out effects
- Test volume levels across different devices

### Copyright Considerations
- Use royalty-free music or original compositions
- Check licensing for any copyrighted material
- Consider Creative Commons licensed tracks

## 💝 Making It Special

This website is designed to be easily personalized. The most impactful customizations:

1. **Replace placeholder text** with personal messages
2. **Add meaningful photos** that tell your story together
3. **Include favorite songs** as background music
4. **Gather messages** from friends and family
5. **Customize colors** to match her favorite palette
6. **Personalize the surprise letter** with specific memories
7. **Add inside jokes** and shared experiences

## 🚀 Deployment Checklist

Before deploying:

- [ ] Replace all placeholder content with personal information
- [ ] Add real photos to the gallery
- [ ] Update birthday messages with real content
- [ ] Customize the surprise letter
- [ ] Add appropriate audio files
- [ ] Test all animations and interactions
- [ ] Verify mobile responsiveness
- [ ] Check loading performance
- [ ] Test audio playback on different browsers
- [ ] Ensure all links work correctly

## 📞 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Review browser console for error messages
3. Test in different browsers (Chrome, Firefox, Safari)
4. Verify all files are in correct directories
5. Check network tab for failed resource loads

---

**Made with ❤️ for a special birthday celebration**

*This project demonstrates modern web development practices with React, Next.js, and advanced animations. Feel free to customize and extend it for your own special occasions!*
