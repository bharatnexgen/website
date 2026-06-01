# BharatNexgen Automation Pvt. Ltd. — Official Website

A fully responsive, multi-page website for BharatNexgen Automation Pvt. Ltd., built for GitHub Pages hosting.

## 🗂️ Project Structure

```
bharatnexgen/
├── index.html              ← Home page (entry point)
├── about.html              ← Redirect to pages/about.html
├── products.html           ← Redirect to pages/products.html
├── resources.html          ← Redirect to pages/resources.html
├── services.html           ← Redirect to pages/services.html
├── collaborate.html        ← Redirect to pages/collaborate.html
│
├── pages/
│   ├── about.html          ← About Us (full page)
│   ├── products.html       ← Our Products
│   ├── resources.html      ← Resources
│   ├── services.html       ← Services
│   └── collaborate.html    ← Collaborate With Us
│
├── css/
│   └── style.css           ← All styles (CSS variables, components, responsive)
│
├── js/
│   ├── nav.js              ← Shared navbar & footer injection
│   └── main.js             ← Slider, animations, form, counters
│
└── images/
    ├── favicon.svg
    ├── hero-defence.svg
    ├── hero-agri.svg
    ├── hero-health.svg
    ├── hero-industry.svg
    └── hero-edu.svg
```

## 🚀 Deploying to GitHub Pages

1. Create a new GitHub repository (e.g., `bharatnexgen-website`)
2. Upload all files maintaining the folder structure above
3. Go to **Settings → Pages → Source → Deploy from branch → main → / (root)**
4. Your site will be live at: `https://yourusername.github.io/bharatnexgen-website/`

## 📸 Adding Real Images

Replace the SVG hero backgrounds in `images/` with real `.jpg` or `.webp` photos:
- `hero-defence.jpg` — Defence/surveillance imagery
- `hero-agri.jpg` — Agriculture/field imagery  
- `hero-health.jpg` — Healthcare/pharma imagery
- `hero-industry.jpg` — Industrial/manufacturing imagery
- `hero-edu.jpg` — Education/campus imagery

Update references in `css/style.css` under `.hero-slide-N { background-image: url(...) }`.

For resources page photos, add images to `images/` folder and update `pages/resources.html` `<div class="resource-img">` divs to use `<img>` tags.

## ✏️ Customization

- **Colors**: Edit CSS variables in `css/style.css` under `:root`
- **Content**: Edit the respective HTML page in `pages/`
- **Contact form**: The form in `collaborate.html` currently shows a success message on submit. To make it functional, integrate with Formspree (free): replace the `<form>` action with your Formspree endpoint.

### Formspree Integration (free email form)
1. Sign up at [formspree.io](https://formspree.io)
2. Create a form and get your endpoint URL
3. In `js/main.js`, replace the form submit handler with a `fetch` POST to your Formspree URL

## 📱 Responsive Breakpoints

- Desktop: 1200px+
- Tablet: 900px–1100px  
- Mobile: 600px and below

## 🎨 Design System

- **Primary**: Navy `#0a1628` / `#112244`
- **Accent**: Gold `#c8952a` / `#e8b84b`
- **Highlight**: Teal `#00b4d8`
- **Fonts**: Orbitron (brand), Rajdhani (headings), Poppins (body)

---

*Built for BharatNexgen Automation Pvt. Ltd. | Incubated at TBIF, IIT Ropar*
