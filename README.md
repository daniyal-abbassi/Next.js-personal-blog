  [![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org) [![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org) [![Prisma](https://img.shields.io/badge/Prisma-6.15.0-2CB9E6?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io) [![NextAuth](https://img.shields.io/badge/NextAuth-5.0.0_beta.29-4B5563?style=flat-square)](https://next-auth.js.org) [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com) [![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org) [![MUI](https://img.shields.io/badge/MUI-7.3.4-007FFF?style=flat-square&logo=mui&logoColor=white)](https://mui.com)
  

# Personal Blog

A modern, full-featured personal blog application built with Next.js 15, featuring a rich content editor, authentication, and admin dashboard.

## Features

- **Public Blog Interface**
  - Browse and read blog posts
  - Filter posts by tags
  - Search functionality  // ...existing code...
  

- **Admin Dashboard**
  - Create, edit, and delete blog posts
  - Rich text editor (TinyMCE)
  - Image upload via Cloudinary
  - Publish/unpublish posts
  - Tag management
  - User authentication with NextAuth

- **Modern UI/UX**
  - Material-UI components
  - Dark/light theme toggle
  - Responsive design
  - Clean and professional interface

## Tech Stack

- **Framework:** Next.js 15.5.2 with React 19
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth v5
- **Styling:** Tailwind CSS + Material-UI
- **Rich Text Editor:** TinyMCE
- **Image Storage:** Cloudinary
- **Type Safety:** TypeScript
- **Form Management:** React Hook Form with Zod validation

## Prerequisites

- Node.js 18+
- PostgreSQL database
- Cloudinary account (for image uploads)
- pnpm (recommended) or npm

# Personal Blog
this is the learning  next.js version of same app build in jamstack style react for frontend and node.js express.js for backend, old repository: https://github.com/daniyal-abbassi/Personal-Blog-Jamstack-TOP


### 1. Clone the repository

```bash
git clone <repository-url>
cd personal-blog
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/blog_db"
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 4. Set up the database

Run Prisma migrations to create the database schema:

```bash
pnpm prisma migrate dev
pnpm prisma generate
```

### 5. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

The application uses four main models:

- **User:** Admin users with authentication credentials
- **Post:** Blog posts with title, content, images, and publication status
- **Tag:** Categorization tags for posts
- **Comment:** User comments on posts (if enabled)

## Project Structure

```
personal-blog/
├── app/
│   ├── (admin)/          # Admin-only routes
│   ├── (auth)/           # Authentication pages
│   ├── (public)/         # Public blog pages
│   ├── components/       # React components
│   ├── lib/             # Utilities and helpers
│   └── ui/              # UI components
├── prisma/
│   └── schema.prisma    # Database schema
├── public/              # Static assets
└── types/               # TypeScript type definitions
```

## Key Features in Detail

### Authentication

The application uses NextAuth v5 for authentication with credentials provider. Admin users can sign in to access the dashboard.

### Content Management

- Rich text editing with TinyMCE
- Image uploads stored in Cloudinary
- Draft and publish workflow
- Tag-based categorization

### Responsive Design

The application is fully responsive with:
- Desktop admin dashboard
- Mobile-friendly public blog
- Adaptive navigation components

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm prisma studio` - Open Prisma Studio database GUI

## Deployment

### Build for production

```bash
pnpm build
```

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the repository in Vercel
3. Configure environment variables
4. Deploy

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and not licensed for public use.

