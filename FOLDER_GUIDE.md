# Folder-by-Folder Guide

Complete explanation of each folder and what goes where.

## `src/app/` - App Router (Routing & Pages)

**Purpose**: Contains all routes, layouts, and API endpoints. This is where URL structure lives.

### Structure Explanation

```
src/app/
├── (marketing)/        # Route group for public pages
├── (app)/              # Route group for authenticated pages
├── api/                # API routes (not public pages)
├── layout.tsx          # Root layout
├── page.tsx            # Root page (/)
├── error.tsx           # Global error boundary
├── not-found.tsx       # 404 page
├── loading.tsx         # Global loading state
├── favicon.ico
└── robots.ts
```

### Key Files

| File            | Purpose           | When Used           |
| --------------- | ----------------- | ------------------- |
| `layout.tsx`    | Shared UI wrapper | Around page content |
| `page.tsx`      | Page component    | Makes route public  |
| `loading.tsx`   | Suspense fallback | Data loading state  |
| `error.tsx`     | Error boundary    | Catches errors      |
| `not-found.tsx` | 404 handler       | No matching route   |
| `route.ts`      | API endpoint      | RESTful APIs        |

### Example: Dashboard Feature

```
src/app/(app)/dashboard/
├── page.tsx           # /dashboard page
├── layout.tsx         # Dashboard layout
├── loading.tsx        # Show skeleton while loading
├── error.tsx          # Handle dashboard errors
└── _components/       # Private dashboard components
    ├── DashboardCard.tsx
    ├── Analytics.tsx
    └── MetricsTable.tsx
```

**Why this structure?**

- `_components` is private (not routable)
- Keeps dashboard code together
- Layout only applies to dashboard routes
- Clear separation from other features

---

## `src/components/` - React Components

**Purpose**: Reusable UI components. No routing logic.

### Subdirectories

#### `ui/` - Foundational Components

```
Base building blocks. No business logic.

Button.tsx       - Generic button
Card.tsx         - Container with styling
Input.tsx        - Form input
Modal.tsx        - Dialog/modal
Dropdown.tsx     - Select menu
...
```

Use these across your entire app:

```typescript
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
```

#### `layouts/` - Layout Components

```
Wrapper components for page structure.

Header.tsx       - Top navigation
Footer.tsx       - Bottom section
Sidebar.tsx      - Side navigation
Navigation.tsx   - Main nav bar
...
```

Used in `layout.tsx` files:

```typescript
export default function RootLayout() {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
```

#### `forms/` - Form Components

```
Complete, reusable forms.

LoginForm.tsx      - Full login form with validation
RegisterForm.tsx   - Registration with steps
ContactForm.tsx    - Contact form
...
```

Each form includes:

- Form fields
- Validation (Zod)
- Error handling
- Submit logic

#### `providers/` - Context Providers

```
React Context wrapper components.

SessionProvider.tsx   - Auth session
ThemeProvider.tsx     - Dark/light mode
QueryProvider.tsx     - TanStack Query
...
```

Used in `layout.tsx`:

```typescript
export default function RootLayout() {
  return (
    <SessionProvider>
      <ThemeProvider>
        <QueryProvider>
          {children}
        </QueryProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}
```

---

## `src/lib/` - Business Logic & Utilities

**Purpose**: Non-React code. Pure functions, helpers, clients.

### Subdirectories

#### `api/` - API Client Functions

```
Fetch wrappers and endpoint helpers.

client.ts          - fetch() wrapper with auth
endpoints.ts       - API URLs and constants
...
```

Example:

```typescript
// lib/api/client.ts
export async function fetchUsers() {
  const res = await fetch(`${API_URL}/users`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  return res.json()
}

// Used in Server Components:
import { fetchUsers } from '@/lib/api/client'
export default async function UsersPage() {
  const users = await fetchUsers()
  return <UsersList users={users} />
}
```

#### `auth/` - Authentication Logic

```
Non-React auth code.

session.ts         - Get current session
permissions.ts     - Check if user can do X
...
```

Example:

```typescript
// lib/auth/permissions.ts
export function canEdit(user: User, post: Post) {
  return user.id === post.authorId || user.role === "admin";
}
```

#### `db/` - Database Client

```
Database connection and helpers.

client.ts          - DB connection instance
queries.ts         - Common queries
...
```

#### `utils/` - General Utilities

```
Helper functions.

cn.ts              - Merge class names
dates.ts           - Format dates
string.ts          - String manipulation
numbers.ts         - Math helpers
...
```

Example:

```typescript
// lib/utils/cn.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Use:
<button className={cn('px-4 py-2', isActive && 'bg-blue-500')} />
```

#### `validations/` - Zod Schemas

```
Input validation schemas.

auth.ts            - Login/register validation
user.ts            - User data validation
forms.ts           - Form field validation
...
```

Example:

```typescript
// lib/validations/auth.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// Use:
const result = loginSchema.safeParse({ email, password });
```

---

## `src/hooks/` - Custom React Hooks

**Purpose**: React-specific hooks. Can use `useState`, `useEffect`, etc.

### Subdirectories

#### `queries/` - Data Fetching Hooks

```
TanStack Query hooks for fetching data.

useUsers.ts        - Fetch all users
usePosts.ts        - Fetch all posts
useUserById.ts     - Fetch single user
...
```

Example:

```typescript
// hooks/queries/useUsers.ts
import { useQuery } from '@tanstack/react-query'

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/v1/users').then(r => r.json())
  })
}

// Use in Client Component:
'use client'
import { useUsers } from '@/hooks/queries/useUsers'

export function UsersList() {
  const { data: users, isLoading } = useUsers()
  if (isLoading) return <p>Loading...</p>
  return <div>{users?.map(u => <p key={u.id}>{u.name}</p>)}</div>
}
```

#### `mutations/` - Data Mutation Hooks

```
Hooks for creating/updating data.

useCreateUser.ts   - Create new user
useUpdateProfile.ts - Update user data
useDeletePost.ts   - Delete post
...
```

Example:

```typescript
// hooks/mutations/useCreateUser.ts
import { useMutation } from "@tanstack/react-query";

export function useCreateUser() {
  return useMutation({
    mutationFn: (data) =>
      fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(data),
      }).then((r) => r.json()),
  });
}
```

#### Custom Hooks

```
General custom hooks.

useLocalStorage.ts - Persist to localStorage
useMediaQuery.ts   - Responsive breakpoints
usePagination.ts   - Pagination logic
useDebounce.ts     - Debounce values
useAsync.ts        - Handle async operations
...
```

---

## `src/types/` - TypeScript Definitions

**Purpose**: Centralized type definitions. Export and reuse everywhere.

```
types/
├── index.ts        # Re-export everything
├── api.ts          # API response types
├── user.ts         # User-related types
├── post.ts         # Post-related types
├── database.ts     # DB schema types
└── common.ts       # Shared types
```

Example:

```typescript
// types/user.ts
export type User = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  createdAt: Date;
};

export type UserProfile = User & {
  bio: string;
  avatar: string;
};

// types/index.ts
export type * from "./user";
export type * from "./post";
export type * from "./api";

// Use everywhere:
import type { User, UserProfile } from "@/types";
```

---

## `src/config/` - Configuration

**Purpose**: App-wide settings and constants.

```
config/
├── site.ts         # Site metadata
├── nav.ts          # Navigation structure
└── env.ts          # Environment validation
```

Example:

```typescript
// config/site.ts
export const siteConfig = {
  name: "My App",
  description: "App description",
  url: process.env.NEXT_PUBLIC_URL,
  links: {
    twitter: "https://twitter.com/...",
    github: "https://github.com/...",
  },
};

// config/nav.ts
export const navigation = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Settings", href: "/settings" },
];
```

---

## `src/constants/` - App Constants

**Purpose**: Immutable values used throughout the app.

```
constants/
└── routes.ts       # Route definitions

// constants/routes.ts
export const routes = {
  public: {
    home: '/',
    about: '/about',
    blog: '/blog'
  },
  app: {
    dashboard: '/dashboard',
    settings: '/settings',
    profile: '/profile'
  },
  api: {
    users: '/api/v1/users',
    posts: '/api/v1/posts'
  }
}
```

---

## `src/styles/` - CSS

**Purpose**: Global styles and Tailwind setup.

```
styles/
├── globals.css     # Global styles
└── variables.css   # CSS variables (theming)
```

Example:

```css
/* styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-white text-gray-900 antialiased;
  }
}

/* styles/variables.css */
:root {
  --color-primary: hsl(220, 90%, 50%);
  --color-secondary: hsl(280, 90%, 50%);
}
```

---

## `src/middleware.ts` - Request Middleware

**Purpose**: Intercept and modify requests (auth checks, redirects, etc.)

Example:

```typescript
import { middleware } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Redirect unauthenticated users
  if (!request.nextauth?.token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*"],
};
```

---

## `public/` - Static Assets

**Purpose**: Files served directly (images, icons, fonts, etc.)

```
public/
├── images/
│   ├── logo.svg
│   ├── hero.jpg
│   └── og-image.png
├── icons/
│   ├── favicon.ico
│   └── apple-touch-icon.png
└── fonts/
    └── custom-font.woff2
```

Reference in code:

```typescript
import Image from 'next/image'
export function Logo() {
  return <Image src="/images/logo.svg" alt="Logo" width={40} height={40} />
}
```

---

## `__tests__/` - Test Files

**Purpose**: Unit, integration, and E2E tests.

```
__tests__/
├── unit/           # Test individual functions
│   ├── utils.test.ts
│   └── validations.test.ts
├── integration/    # Test feature workflows
│   └── auth.test.ts
└── e2e/           # Test user journeys
    ├── login.spec.ts
    └── dashboard.spec.ts
```

Co-locate tests with source files OR keep separate. Pick one and be consistent.

---

## Summary: Where Things Go

| Need                          | Folder                 |
| ----------------------------- | ---------------------- |
| Page or route                 | `src/app/`             |
| UI component                  | `src/components/`      |
| Fetch data (Server Component) | `src/lib/api/`         |
| Custom React hook             | `src/hooks/`           |
| Type definition               | `src/types/`           |
| Validation schema             | `src/lib/validations/` |
| Auth logic                    | `src/lib/auth/`        |
| Global config                 | `src/config/`          |
| App constants                 | `src/constants/`       |
| Global CSS                    | `src/styles/`          |
| Images/icons                  | `public/`              |
| Tests                         | `__tests__/`           |

---

**This structure scales from small projects to enterprise apps. Adjust as needed for your use case.**
