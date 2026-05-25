# 🚀 Md Mamunur Rashid — Portfolio

A fully dynamic, animated portfolio website built with Next.js 14 (JSX only, no TypeScript).
Includes a protected admin dashboard to manage all content — skills, projects, services, messages, and profile.

---

## ✨ Features

- 🎨 Dark theme with Framer Motion animations
- ⚡ Typing animation hero section
- 🖼 Real tech logos for skills (devicon CDN + Cloudinary uploads)
- 📊 Dynamic skills, projects, services, experience (all editable from dashboard)
- 🔐 Protected admin dashboard (login required)
- 📬 Contact form with message inbox
- 🌐 Single Next.js project — frontend + backend + API all in one
- 🗄️ PostgreSQL database via Neon (free tier)
- ☁️ Image uploads via Cloudinary (free tier)
- 🚀 One-click deploy to Vercel

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router, JSX) |
| Styling | Tailwind CSS + inline styles |
| Animations | Framer Motion |
| Database | PostgreSQL via Neon |
| ORM | Prisma |
| Auth | NextAuth.js (credentials) |
| Images | Cloudinary |
| Deploy | Vercel |

---

## 📁 Project Structure

```
portfolio-nextjs/
├── app/
│   ├── (portfolio)/
│   │   └── page.js                  ← Public home page
│   ├── dashboard/
│   │   ├── page.js                  ← Dashboard overview
│   │   ├── layout.js                ← Dashboard layout (auth protected)
│   │   ├── projects/page.js         ← Add / Edit / Delete projects
│   │   ├── skills/page.js           ← Add / Edit / Delete skills + icon upload
│   │   ├── services/page.js         ← Add / Edit / Delete services
│   │   ├── messages/page.js         ← View / Delete contact messages
│   │   ├── profile/page.js          ← Edit bio, photo, social links
│   │   └── settings/page.js         ← Change admin email & password
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/       ← NextAuth login/logout
│   │   │   └── update-credentials/ ← Change email or password
│   │   ├── projects/                ← GET, POST, PUT, DELETE
│   │   ├── skills/                  ← GET, POST, PUT, DELETE
│   │   ├── services/                ← GET, POST, PUT, DELETE
│   │   ├── messages/                ← GET, POST, PUT, DELETE
│   │   ├── profile/                 ← GET, PUT
│   │   └── upload/                  ← Cloudinary image upload
│   ├── login/page.js                ← Admin login page
│   ├── globals.css                  ← Global styles + Tailwind
│   └── layout.js                    ← Root layout
├── components/
│   ├── sections/
│   │   ├── Navbar.js
│   │   ├── Hero.js
│   │   ├── About.js
│   │   ├── Skills.js
│   │   ├── Experience.js
│   │   ├── Services.js
│   │   ├── Projects.js
│   │   ├── Contact.js
│   │   └── Footer.js
│   ├── dashboard/
│   │   ├── Sidebar.js
│   │   └── Header.js
│   ├── ui/
│   │   └── CursorGlow.js
│   └── Providers.js
├── lib/
│   ├── db.js                        ← Prisma client singleton
│   ├── auth.js                      ← NextAuth config
│   └── cloudinary.js                ← Cloudinary upload helper
├── prisma/
│   ├── schema.prisma                ← Database schema
│   └── seed.js                      ← Seed starter data
├── .env.example                     ← Environment variable template
├── .env                             ← Your actual env (never commit this!)
├── .env.local                       ← Next.js runtime env
├── next.config.js
├── tailwind.config.js
└── package.json
```

---

## ⚡ Local Setup (Step by Step)

### Step 1 — Install dependencies

```bash
npm install
```

---

### Step 2 — Set up Neon Database (free PostgreSQL)

1. Go to **https://neon.tech** → Sign up free
2. Create a new project → name it `mamun-portfolio`
3. Copy the **Connection String** — looks like:
   ```
   postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```

---

### Step 3 — Set up Cloudinary (free image hosting)

1. Go to **https://cloudinary.com** → Sign up free
2. From your dashboard copy:
   - Cloud Name
   - API Key
   - API Secret

---

### Step 4 — Create your environment files

Create **two files** in your project root:

**`.env`** (for Prisma CLI commands):
```env
DATABASE_URL="postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"
NEXTAUTH_SECRET="your-generated-secret"
NEXTAUTH_URL="http://localhost:3000"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

**`.env.local`** (for Next.js — same content as above):
```env
DATABASE_URL="postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"
NEXTAUTH_SECRET="your-generated-secret"
NEXTAUTH_URL="http://localhost:3000"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

> ⚠️ You need BOTH files. `.env` is for Prisma CLI, `.env.local` is for Next.js runtime.

**Generate your NEXTAUTH_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

### Step 5 — Push database schema

```bash
npm run db:push
```

This creates all the tables in your Neon database.

---

### Step 6 — Generate Prisma client

```bash
npx prisma generate
```

---

### Step 7 — Seed starter data

```bash
npm run db:seed
```

### Step 8 — Start the dev server

```bash
npm run dev
```

Open **http://localhost:3000** — your portfolio is live locally!

---


## 📋 Dashboard Pages

| Page | URL | What you can do |
|---|---|---|
| Overview | `/dashboard` | Stats, recent messages, quick links |
| Projects | `/dashboard/projects` | Add / Edit / Delete projects with images |
| Skills | `/dashboard/skills` | Add / Edit / Delete skills + upload custom icons to Cloudinary |
| Services | `/dashboard/services` | Add / Edit / Delete services |
| Messages | `/dashboard/messages` | Read and delete contact form messages |
| Profile | `/dashboard/profile` | Edit name, bio, photo, social links, resume URL |
| Settings | `/dashboard/settings` | Change admin email and password |

---

## 🖼️ How to Add Images

### Profile photo
1. Go to **Dashboard → Profile**
2. In the **Photo URL** field paste either:
   - A Cloudinary URL (upload at cloudinary.com → Media Library)
   - Or `/images/profile.jpg` if you drop the file in the `/public/images/` folder

### Project images
1. Upload to Cloudinary → copy the URL
2. Go to **Dashboard → Projects → Add/Edit project**
3. Paste the URL in the **Image URL** field

### Skill icons
1. Go to **Dashboard → Skills → Add/Edit skill**
2. Click **Upload Icon** → pick a PNG or SVG from your computer
3. It uploads to Cloudinary automatically and saves the URL
4. OR paste a devicon CDN URL directly, e.g.:
   ```
   https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg
   ```

---

## 🔐 How to Change Email & Password

Go to **Dashboard → Settings** (`/dashboard/settings`)

- **Change Email** → enter new email twice → save → you'll be logged out automatically → log in with new email
- **Change Password** → enter current password + new password (min 8 chars) → save → log out → log in with new password

---

## 🚀 Deploy to Vercel

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/mamun-portfolio.git
git push -u origin main
```

### Step 2 — Import to Vercel

1. Go to **https://vercel.com** → Sign in with GitHub
2. Click **Add New Project** → Import your repo
3. Add all **Environment Variables**:

| Key | Value |
|---|---|
| `DATABASE_URL` | your Neon connection string |
| `NEXTAUTH_SECRET` | your generated secret |
| `NEXTAUTH_URL` | `https://your-site.vercel.app` ← use your actual Vercel URL |
| `CLOUDINARY_CLOUD_NAME` | your cloud name |
| `CLOUDINARY_API_KEY` | your API key |
| `CLOUDINARY_API_SECRET` | your API secret |

4. Click **Deploy** 🎉

> After deploy, every time you run `git push` Vercel automatically rebuilds your site.

---

## 🆘 Common Issues & Fixes

### "Cannot find module @prisma/client"
```bash
npx prisma generate
```

### "Environment variable not found: DATABASE_URL"
- Make sure you have both `.env` AND `.env.local` files
- Prisma reads `.env`, Next.js reads `.env.local`

### "Invalid credentials" on login
- Make sure you ran `npm run db:seed`
- Default: `admin@portfolio.com` / `admin123`

### Images not showing after upload
- Add your Cloudinary hostname to `next.config.js`:
```js
images: {
  remotePatterns: [{ protocol: 'https', hostname: 'res.cloudinary.com' }]
}
```

### Skill logos not loading
- Use the exact name format (e.g. `React` not `ReactJS`, `Node.js` not `NodeJS`)
- Or upload a custom icon via Dashboard → Skills → Edit → Upload Icon

### Site not updating after changes
```bash
git add .
git commit -m "update"
git push
```
Vercel will redeploy automatically within ~30 seconds.

---

## 🎨 Customization

### Change accent color
Edit `tailwind.config.js` → find `primary: '#00d4ff'` → change to any color you like.
Also update the inline style values in the section components.

### Add a new section
1. Create `components/sections/YourSection.js`
2. Import and add it in `app/(portfolio)/page.js`
3. Add a link in `components/sections/Navbar.js`

### Change fonts
Edit the Google Fonts import in `app/globals.css` and update `tailwind.config.js` font family.

---

## 📞 Support

Built by Claude (Anthropic) for Md Mamunur Rashid.
LinkedIn: https://www.linkedin.com/in/webdevmamun/
