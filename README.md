# Pixel Art Portfolio Website

A retro-inspired, interactive, and creative portfolio website built with a pixel art theme! This portfolio features authentic 8-bit styling, smooth animations, and engaging interactions that make your professional showcase stand out with a nostalgic gaming aesthetic.

## ✨ Features

### 🎨 Visual Design
- **Authentic Pixel Art Styling**: Sharp edges, pixel-perfect borders, and classic 8-bit colors
- **Floating Background Elements**: Animated stars and clouds that move as you scroll
- **Retro Color Palette**: Dark backgrounds with neon green, orange, and teal accents
- **Responsive Design**: Works perfectly on all devices and screen sizes

### 🚀 Interactive Elements
- **Smooth Scrolling Navigation**: Click any nav item to smoothly scroll to sections
- **Hover Effects**: Cards lift up and show pixel-perfect shadows when hovered
- **Click Animations**: Interactive feedback when clicking on elements
- **Scroll Animations**: Sections fade in as you scroll down the page
- **Parallax Effects**: Background elements move at different speeds

### 🎯 Sections
- **Header**: Eye-catching title with glitch animation and retro logo
- **About**: Personal introduction with bouncing pixel avatar
- **Projects**: Project showcase with 8-bit card styling
- **Skills**: Organized skill categories with interactive pixel blocks
- **Contact**: Contact form with social media links


## 🛠️ Customization Guide

### 1. Personal Information
Edit `index.html` to replace placeholder content:

```html
<!-- Replace "Your Name" with your actual name -->
<title>🎮 Pixel Portfolio - Your Name</title>
<h1 class="pixel-title">Your Name</h1>

<!-- Update the subtitle -->
<p class="pixel-subtitle">Level 99 Developer | Pixel Art Enthusiast</p>

<!-- Customize the about section -->
<p>Greetings, fellow pixel travelers! I'm a developer who approaches coding like crafting the perfect 8-bit adventure...</p>

<!-- Update contact information -->
<a href="mailto:you@example.com">you@example.com</a>
<a href="https://linkedin.com/in/yourprofile">linkedin.com/in/yourprofile</a>
<a href="https://github.com/yourusername">github.com/yourusername</a>
```

### 2. Projects
Replace the project placeholders with your actual projects:

```html
<div class="pixel-card project-card">
  <div class="card-header">
    <div class="pixel-dots">
      <span></span><span></span><span></span>
    </div>
  </div>
  <h3>Your Project Name</h3>
  <p>Description of your amazing project</p>
  <div class="project-tags">
    <span class="tag">Technology Used</span>
    <span class="tag">Another Tech</span>
  </div>
  <div class="card-footer">
    <div class="pixel-bar"></div>
  </div>
</div>
```

### 3. Skills
Update the skills to match your expertise:

```html
<div class="pixel-skill">Your Skill</div>
<div class="pixel-skill">Another Skill</div>
```

### 4. Colors and Styling
Modify `style.css` to change the color scheme:

```css
/* Main pixel art colors - feel free to change these! */
:root {
  --pixel-green: #00ff41;
  --pixel-orange: #ff6b35;
  --pixel-teal: #11998e;
  --pixel-cyan: #4ecdc4;
  --pixel-purple: #2d1b69;
}
```

### 5. Adding New Sections
To add a new section, follow this pattern:

```html
<section id="new-section" class="pixel-section">
  <div class="pixel-container">
    <h2 class="section-title">New Section</h2>
    <div class="section-content">
      <!-- Your content here -->
    </div>
  </div>
</section>
```

## 🎨 Color Palette

The portfolio uses these retro pixel art colors:
- **Neon Green**: #00ff41 (Primary text and accents)
- **Orange**: #ff6b35 (Navigation and highlights)
- **Teal**: #11998e (Skills and secondary elements)
- **Cyan**: #4ecdc4 (Hover states and accents)
- **Purple**: #2d1b69 (Project cards)
- **Dark Blue**: #1a1a2e (Background and footer)

## 📱 Responsive Design

The portfolio automatically adapts to different screen sizes:
- **Desktop**: Full layout with side-by-side sections
- **Tablet**: Adjusted spacing and grid layouts
- **Mobile**: Stacked layout with optimized navigation

## 🚀 Getting Started

1. **Open the files**: Open `index.html` in your web browser
2. **Customize content**: Edit the HTML to add your information
3. **Modify styling**: Adjust colors and layout in `style.css`
4. **Add functionality**: Enhance interactions in `script.js`
5. **Deploy**: Upload to your web hosting service

## 🔧 Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ Internet Explorer (limited support)

## 📝 License

This portfolio template is free to use and modify for personal and commercial projects.

## 🤝 Contributing

Feel free to submit improvements, bug fixes, or new features! This is a living template that can always be enhanced.

## 🎉 Show It Off!

Once you've customized your portfolio:
- Share it on social media
- Include it in your job applications
- Show it to potential clients
- Use it as inspiration for other projects

---

**Built with ❤️ & Pixels** 🎮

*Remember: Every pixel counts in the grand masterpiece of your career!*
