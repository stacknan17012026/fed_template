# Implementation Checklist

Follow these steps to set up your Next.js project with this production-grade structure.

## Phase 1: Project Setup

- [ ] Create new Next.js project with App Router
- [ ] Set TypeScript to strict mode
- [ ] Install Tailwind CSS
- [ ] Install necessary dependencies

```bash
npm install @tanstack/react-query zod next-auth
npm install -D @types/node typescript tailwindcss postcss autoprefixer
```

## Phase 2: Structure & Configuration

### Copy Folder Structure

- [ ] Run provided folder creation script
- [ ] Verify all folders exist

### Configure TypeScript Path Aliases

Create/update `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/lib/*": ["src/lib/*"],
      "@/types/*": ["src/types/*"],
      "@/hooks/*": ["src/hooks/*"],
      "@/config/*": ["src/config/*"],
      "@/constants/*": ["src/constants/*"],
      "@/styles/*": ["src/styles/*"]
    }
  }
}
```

### Configure Tailwind

`tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
} satisfies Config;
```

### Add Global Styles

Create `src/styles/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-background text-foreground;
  }
}
```

Update `src/app/layout.tsx`:

```typescript
import '@/styles/globals.css'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
```

## Phase 3: Core Files

### Create Root Layout

`src/app/layout.tsx`:

```typescript
import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

### Create Home Page

`src/app/page.tsx`:

```typescript
export default function Home() {
  return (
    <main>
      <h1>Welcome</h1>
      <p>Home page</p>
    </main>
  )
}
```

### Create Error Page

`src/app/error.tsx`:

```typescript
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

### Create 404 Page

`src/app/not-found.tsx`:

```typescript
export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
    </div>
  )
}
```

## Phase 4: Essential Files

### Site Configuration

`src/config/site.ts`:

```typescript
export const siteConfig = {
  name: "My App",
  description: "App description",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "https://example.com/og.png",
  links: {
    twitter: "https://twitter.com/example",
    github: "https://github.com/example",
  },
};
```

### Navigation Config

`src/config/nav.ts`:

```typescript
export const mainNav = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Settings",
    href: "/settings",
  },
];
```

### Routes Constants

`src/constants/routes.ts`:

```typescript
export const ROUTES = {
  public: {
    home: "/",
    about: "/about",
  },
  app: {
    dashboard: "/dashboard",
    settings: "/settings",
  },
  api: {
    users: "/api/v1/users",
  },
} as const;
```

### Type Definitions

`src/types/index.ts`:

```typescript
export type * from "./api";
export type * from "./user";
export type * from "./common";
```

`src/types/common.ts`:

```typescript
export type Response<T> = {
  data?: T;
  error?: string;
  status: "success" | "error";
};
```

## Phase 5: Utilities

### Class Name Utility

`src/lib/utils/cn.ts`:

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Fetch Client

`src/lib/api/client.ts`:

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}
```

## Phase 6: UI Components

Create base UI components in `src/components/ui/`:

### Button Component

`src/components/ui/Button.tsx`:

```typescript
import { cn } from '@/lib/utils/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

export function Button({
  className,
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-md font-medium',
        variant === 'primary' && 'bg-blue-600 text-white',
        variant === 'secondary' && 'bg-gray-200 text-gray-900',
        className
      )}
      {...props}
    />
  )
}
```

## Phase 7: Environment Variables

- [ ] Create `.env.example`:

```
# API
NEXT_PUBLIC_API_URL=http://localhost:3000

# Database
DATABASE_URL=your_database_url

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
```

- [ ] Create `.env.local` (git-ignored)
- [ ] Copy `.env.example` to `.env.local` and fill in values

## Phase 8: Git & CI/CD

- [ ] Initialize `.gitignore`:

```
node_modules/
.next/
.env.local
.env.production.local
.env.development.local
.env.test.local
coverage/
.DS_Store
*.log
```

- [ ] Create `.github/workflows/test.yml` for CI
- [ ] Set up branch protection rules

## Phase 9: Testing Setup

- [ ] Install testing dependencies:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

- [ ] Create `vitest.config.ts`
- [ ] Create first unit test in `__tests__/unit/`

## Phase 10: Documentation

- [ ] Copy `PROJECT_STRUCTURE.md`
- [ ] Copy `FOLDER_GUIDE.md`
- [ ] Update `README.md` with project-specific info
- [ ] Document any custom conventions

## Phase 11: Development Workflow

### First Feature: Authentication

- [ ] Set up NextAuth.js in `src/app/api/auth/[...nextauth]/route.ts`
- [ ] Create `src/lib/auth/session.ts`
- [ ] Create `src/components/providers/SessionProvider.tsx`
- [ ] Create `src/app/(marketing)/login/page.tsx`
- [ ] Create `src/types/user.ts` with User type

### Second Feature: Dashboard

- [ ] Create `src/app/(app)/dashboard/layout.tsx`
- [ ] Create `src/app/(app)/dashboard/page.tsx`
- [ ] Create `src/app/(app)/dashboard/_components/` folder
- [ ] Add dashboard-specific components
- [ ] Protect route with middleware

## Phase 12: Continuous Improvement

- [ ] Set up ESLint
- [ ] Set up Prettier
- [ ] Set up pre-commit hooks (husky)
- [ ] Configure logging
- [ ] Set up error tracking (Sentry)
- [ ] Set up analytics

## Verification Checklist

After setup, verify:

- [ ] `npm run dev` starts without errors
- [ ] Pages render correctly
- [ ] TypeScript has zero errors
- [ ] Path aliases work (`@/components/...`)
- [ ] ESLint passes
- [ ] Tests run successfully
- [ ] Environment variables load correctly
- [ ] Build completes: `npm run build`

## Quick Commands

```bash
# Development
npm run dev

# Build & start
npm run build
npm run start

# Linting
npm run lint

# Type checking
npm run type-check

# Testing
npm run test
npm run test:coverage

# Format
npm run format
```

---

**Estimated Setup Time**: 30-60 minutes

**Next Step**: Begin implementing your first feature (usually authentication)
