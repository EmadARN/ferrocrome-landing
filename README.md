<div align="center">

![Ferro Chrome Project](./public/readme/demo.gif)

<div>
  <img src="https://img.shields.io/badge/-Next.js-black?style=for-the-badge&logo=next.js&color=000000" alt="nextjs" />
  <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logo=typescript&color=3178C6" alt="typescript" />
  <img src="https://img.shields.io/badge/-TailwindCSS-black?style=for-the-badge&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
  <img src="https://img.shields.io/badge/-Prisma-black?style=for-the-badge&logo=prisma&color=2D3748" alt="prisma" />
  <img src="https://img.shields.io/badge/-NextAuth-black?style=for-the-badge&logo=nextauth&color=000000" alt="nextauth" />
  <img src="https://img.shields.io/badge/-Framer_Motion-black?style=for-the-badge&logo=framer&color=E4405F" alt="framer-motion" />
  <img src="https://img.shields.io/badge/-Chart.js-black?style=for-the-badge&logo=chartdotjs&color=FF6384" alt="chartjs" />
  <img src="https://img.shields.io/badge/-React_Hook_Form-black?style=for-the-badge&logo=reacthookform&color=EC5990" alt="react-hook-form" />
  <img src="https://img.shields.io/badge/-Tiptap_Editor-black?style=for-the-badge&logo=tiptap&color=9C27B0" alt="tiptap" />
</div>

<h3 align="center">Ferro Chrome CMS & Landing Platform</h3>

</div>

---

## 📋 Table of Contents

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🖼️ [Preview](#preview)
5. 📂 [Project Structure](#project-structure)
6. 🚀 [Getting Started](#getting-started)
7. 🪪 [License](#license)

---

## 🤖 Introduction <a name="introduction"></a>

**Ferro Chrome Platform** is a full-stack web application designed for **buying and selling chromite stone, ferrochrome, and mineral lumps**.
It includes a **modern animated landing page** and a **powerful CMS dashboard** for managing site content and analytics.

The CMS provides:

- A rich-text **blog editor (Tiptap)**
- Reporting and analytics tools
- **Trace system** for tracking site visitors and locations
- A **Home Desk dashboard** showing system-wide stats and insights

---

## ⚙️ Tech Stack <a name="tech-stack"></a>

| Layer          | Technologies                                 |
| -------------- | -------------------------------------------- |
| Frontend       | Next.js, TailwindCSS, Framer Motion          |
| Backend        | Next.js API Routes, NextAuth, Prisma ORM     |
| Database       | PostgreSQL                                   |
| UI Tools       | Chart.js, React Hook Form,zod, Tiptap Editor |
| Authentication | NextAuth (Email/Credentials)                 |
| Language       | TypeScript                                   |

---

## 🔋 Features <a name="features"></a>

✨ **Modern Landing Page**
Built with Framer Motion animations, responsive design, and smooth interactions to showcase company services.

🧠 **Complete CMS**
Manage blog posts, content, and uploaded media through an intuitive editor.

📍 **Trace & Analytics**
Monitor user sessions, geographic location, and “Work with Us” form activity.

📊 **Dashboard & Home Desk**
Visualize key metrics like visitor counts, content statistics, and user engagement using Chart.js.

🔐 **Authentication**
Secure login with NextAuth and PostgreSQL integration via Prisma.

---

## 🖼️ Preview <a name="preview"></a>

<div align="center">
  <table>
    <tr>
      <td><img src="./public/readme/landing.png" width="300" alt="Landing Page"/></td>
      <td><img src="./public/readme/dashboard.png" width="300" alt="Dashboard"/></td>
    </tr>
    <tr>
      <td><img src="./public/readme/blog.png" width="300" alt="Blog CMS"/></td>
      <td><img src="./public/readme/trace.png" width="300" alt="Trace Section"/></td>
    </tr>
  </table>
</div>

---

## 🚀 Getting Started <a name="getting-started"></a>

### Prerequisites

- Node.js ≥ 18
- PostgreSQL
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/ferro-chrome-platform.git
cd ferro-chrome-platform

# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Run Prisma migration
npx prisma migrate dev

# Start the development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app in action.

---

## 📂 Project Structure <a name="project-structure"></a>

```bash
src_extracted/
├── src/
│   ├── app/
│   │   ├── error.jsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.jsx
│   │   ├── not-found.jsx
│   │   ├── page.jsx
│   │   ├── Providers.jsx
│   │   ├── (sections)/
│   │   │   ├── About.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Gallary.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Product.jsx
│   │   │   ├── WhatIsFerroChrome.jsx
│   │   │   ├── WhyChooseUs.jsx
│   │   │   ├── WorkWithUs.jsx
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── [...nextauth]/route.js
│   │   │   ├── blogs/
│   │   │   │   ├── route.js
│   │   │   │   ├── [blogId]/route.js
│   │   │   ├── comments/route.js
│   │   │   ├── form/route.js
│   │   │   ├── home/route.js
│   │   │   ├── track-click/route.js
│   │   ├── blogs/
│   │   │   ├── layout.jsx
│   │   │   ├── page.jsx
│   │   │   ├── [blogId]/page.jsx
│   │   ├── catalog/page.jsx
│   │   ├── login/page.jsx
│   │   ├── panel/
│   │   │   ├── layout.jsx
│   │   │   ├── page.jsx
│   │   │   ├── blogs/
│   │   │   │   ├── page.jsx
│   │   │   │   ├── new/page.jsx
│   │   │   ├── comments/page.jsx
│   │   │   ├── contactLogs/
│   │   │   │   ├── ContactClickTable.jsx
│   │   │   │   ├── page.jsx
│   │   │   ├── reports/
│   │   │   │   ├── ClientTable.jsx
│   │   │   │   ├── page.jsx
│   │   ├── privacy/page.jsx
│   ├── assets/
│   │   ├── woff/
│   │   │   ├── IRANYekanWebBlack.woff
│   │   │   ├── IRANYekanWebBold.woff
│   │   │   ├── IRANYekanWebExtraBlack.woff
│   │   │   ├── IRANYekanWebExtraBold.woff
│   │   │   ├── IRANYekanWebLight.woff
│   │   │   ├── IRANYekanWebMedium.woff
│   │   │   ├── IRANYekanWebRegular.woff
│   │   │   ├── IRANYekanWebThin.woff
│   ├── components/
│   │   ├── DashboardUI.jsx
│   │   ├── ThemeToggle.jsx
│   │   ├── blogs/
│   │   │   ├── AnimatedCard.jsx
│   │   │   ├── BlogComments.jsx
│   │   │   ├── BlogModal.jsx
│   │   │   ├── BlogsNavigation.jsx
│   │   │   ├── ConfirmModal.jsx
│   │   ├── forms/WorkWithUsForm.jsx
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── contactUsButton.jsx
│   │   │   ├── DataTable.jsx
│   │   │   ├── DataTableFilters.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── FloatingChromite.jsx
│   │   │   ├── LoadingState.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── ResizableImage.jsx
│   │   │   ├── RichTextEditor.jsx
│   │   │   ├── ScrollTopButton.jsx
│   │   │   ├── SearchInput.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── ToastProvider.jsx
│   │   │   ├── Tooltip.jsx
│   │   │   ├── WhatsappButton.jsx
│   ├── hooks/useMoveBack.jsx
│   ├── lib/
│   │   ├── constants.js
│   │   ├── Extentions.js
│   │   ├── font.js
│   │   ├── prisma.js
│   │   ├── seed.js
│   │   ├── utils.js
│   │   ├── validations.js
│   ├── prisma/
│   │   ├── dev.db
│   │   ├── schema.prisma
│   │   ├── migrations/
│   │   │   ├── 20251020054300_init/migration.sql
│   │   │   ├── 20251020104402_add_contact_click/migration.sql
│   ├── services/api.js

```

---

## 🪪 License <a name="license"></a>

This project is licensed under the [MIT License](./LICENSE) © 2025 Ferocrome.

---

<div align="center">
  <b>💎 Ferro Chrome Platform — Built with Next.js, Prisma & Tailwind</b>
</div>
