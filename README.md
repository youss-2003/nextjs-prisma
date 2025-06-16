# 🚀 Employee Management System

A modern employee management dashboard built with Next.js 15, TypeScript, and Tailwind CSS. Manage your team members with ease through a beautiful, responsive interface.

![Dashboard Preview](https://res.cloudinary.com/dlgolcvir/image/upload/v1750082740/Recording2025-06-16145858-ezgif.com-video-to-gif-converter_c4eust.gif)


## ✨ Features

- **Employee Directory** - View all employees with sorting and filtering
- **Detailed Profiles** - Complete employee information with photos
- **CRUD Operations** - Create, read, update, and delete employee records
- **Advanced Search** - Find employees by name
- **SQLite Database** - Lightweight, file-based database
- **Responsive Design** - Works perfectly on all devices

## 🛠 Technology Stack

<div align="center">
  <img src="https://cdn.worldvectorlogo.com/logos/next-js.svg" width="80" title="Next.js 15">
  <img src="https://cdn.worldvectorlogo.com/logos/typescript.svg" width="80" title="TypeScript 5">
  <img src="https://cdn.worldvectorlogo.com/logos/tailwindcss.svg" width="80" title="Tailwind CSS 3">
  <img src="https://cdn.worldvectorlogo.com/logos/prisma-2.svg" width="80" title="Prisma ORM">
  <img src="https://cdn.worldvectorlogo.com/logos/sqlite.svg" width="80" title="SQLite">
</div>

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm 9+
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/employee-management.git
cd nextjs-prisma

# Install dependencies
npm install

# Setup environment (SQLite)
cp .env.example 

# Run database migrations
npx prisma migrate dev

# Seed the database with sample data
npm run seed
# Reset the database 
npm run dbdelete
# Start development server
npm run dev