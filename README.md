# Akash Portfolio (Static Site)

This is a lightweight, single-page portfolio built with **HTML + CSS + JavaScript** (no framework).
It is designed to match the **dark + orange accent** style of the sample you shared, with:
- glassmorphism frame
- hover glow effects
- scroll reveal animations
- typed headline effect
- animated counters
- responsive mobile nav

## Quick Start (Local)

1. Open the folder in VS Code.
2. Install the extension **Live Server**.
3. Right click `index.html` → **Open with Live Server**.

## Replace Assets

- Replace `assets/profile-placeholder.svg` with your photo:
  - Put your file as: `assets/profile.jpg`
  - Then update `index.html` and change the `<img src="...">` to `assets/profile.jpg`

- Your resume is already included as:
  - `assets/Akash_M_Resume.pdf`

## Make the contact form work (Free)

This project uses Formspree (no backend).
1. Create an account at Formspree
2. Create a new form → copy its form ID.
3. Edit this line in `index.html`:

```html
<form action="https://formspree.io/f/yourFormId" method="POST">
```

Replace `yourFormId` with the real one.

## Deploy for Free (GitHub Pages)

1. Create a new GitHub repo (e.g. `akash-portfolio`)
2. Upload these files
3. Repo → Settings → Pages
4. Source: Deploy from branch → `main` → `/root`
5. Save → You will get: `https://<username>.github.io/<repo>/`
