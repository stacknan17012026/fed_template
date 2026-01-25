# Production-Grade Next.js 16 Project Structure

A comprehensive, scalable, and maintainable folder structure for Next.js applications. Based on official Next.js documentation best practices.

## Folder Structure Overview

```
project-root/
├── src/                          # Application source code
│   ├── app/                      # Next.js App Router
│   │   ├── (marketing)/          # Route group: marketing pages
│   │   │   ├── page.tsx          # Home page (/)
│   │   │   ├── layout.tsx        # Marketing layout
│   │   │   └── _components/      # Private folder: marketing components
│   │   │
│   │   ├── (app)/                # Route group: authenticated app
│   │   │   ├── dashboard/        # Dashboard feature
│   │   │   │   ├── page.tsx      # /dashboard route
│   │   │   │   ├── loading.tsx   # Loading skeleton
│   │   │   │   ├── error.tsx     # Error boundary
│   │   │   │   ├── layout.tsx    # Dashboard layout
│   │   │   │   └── _components/  # Dashboard-specific components
│   │   │   │
│   │   │   ├── settings/         # Settings feature
│   │   │   ├── layout.tsx        # App layout (shared for all app routes)
│   │   │   └── _components/      # App-level components
│   │   │
│   │   ├── api/                  # API routes
│   │   │   ├── auth/             # Authentication endpoints
│   │   │   │   ├── [...nextauth]/route.ts  # NextAuth handler
│   │   │   │   └── register/route.ts
│   │   │   │
│   │   │   └── v1/               # API versioning
│   │   │       ├── users/route.ts
│   │   │       └── posts/route.ts
│   │   │
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home page fallback
│   │   ├── error.tsx             # Global error boundary
│   │   ├── not-found.tsx         # 404 page
│   │   ├── loading.tsx           # Global loading state
│   │   ├── favicon.ico
│   │   ├── opengraph-image.tsx   # Dynamic OG images
│   │   └── robots.ts             # SEO robots.txt
│   │
│   ├── components/               # Reusable components
│   │   ├── ui/                   # Base UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Input.tsx
│   │   │
│   │   ├── layouts/              # Layout wrapper components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Navigation.tsx
│   │   │
│   │   ├── forms/                # Form components
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── ContactForm.tsx
│   │   │
│   │   └── providers/            # React Context/Provider components
│   │       ├── SessionProvider.tsx
│   │       ├── ThemeProvider.tsx
│   │       └── QueryProvider.tsx
│   │
│   ├── lib/                      # Utility functions & business logic
│   │   ├── api/                  # API client functions
│   │   │   ├── client.ts         # Fetch wrapper
│   │   │   └── endpoints.ts      # API endpoints
│   │   │
│   │   ├── auth/                 # Authentication logic
│   │   │   ├── session.ts        # Session management
│   │   │   └── permissions.ts    # Authorization helpers
│   │   │
│   │   ├── db/                   # Database utilities
│   │   │   ├── client.ts         # DB connection
│   │   │   └── queries.ts        # Prepared queries
│   │   │
│   │   ├── utils/                # General utilities
│   │   │   ├── cn.ts             # Class name merger
│   │   │   ├── dates.ts          # Date helpers
│   │   │   └── string.ts         # String manipulation
│   │   │
│   │   └── validations/          # Zod schemas
│   │       ├── auth.ts
│   │       ├── user.ts
│   │       └── forms.ts
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── queries/              # Data fetching hooks (TanStack Query)
│   │   │   ├── useUsers.ts
│   │   │   └── usePosts.ts
│   │   │
│   │   ├── mutations/            # Data mutation hooks
│   │   │   ├── useCreateUser.ts
│   │   │   └── useUpdateProfile.ts
│   │   │
│   │   └── use-*                 # Custom hooks
│   │       ├── useLocalStorage.ts
│   │       ├── useMediaQuery.ts
│   │       └── usePagination.ts
│   │
│   ├── styles/                   # Global styles
│   │   ├── globals.css
│   │   └── variables.css
│   │
│   ├── config/                   # Configuration files
│   │   ├── site.ts               # Site metadata
│   │   ├── nav.ts                # Navigation config
│   │   └── env.ts                # Environment validation
│   │
│   ├── types/                    # TypeScript type definitions
│   │   ├── index.ts              # Re-exports
│   │   ├── api.ts                # API response types
│   │   ├── user.ts               # User types
│   │   └── database.ts           # Database schema types
│   │
│   ├── constants/                # App-wide constants
│   │   └── routes.ts             # Route definitions
│   │
│   └── middleware.ts             # Next.js middleware
│
├── public/                       # Static assets
│   ├── images/
│   │   ├── logo.svg
│   │   └── hero.jpg
│   │
│   └── icons/
│       └── favicon.ico
│
├── __tests__/                    # Test files
│   ├── unit/                     # Unit tests
│   │   ├── utils.test.ts
│   │   └── validations.test.ts
│   │
│   ├── integration/              # Integration tests
│   │   └── auth.test.ts
│   │
│   └── e2e/                      # End-to-end tests
│       └── login.spec.ts
│
├── .github/
│   ├── workflows/                # CI/CD workflows
│   │   ├── test.yml
│   │   └── deploy.yml
│   │
│   └── agents/
│       └── FED agent.agent.md
│
├── .env                          # Environment variables (git-ignored)
├── .env.local                    # Local overrides (git-ignored)
├── .env.production               # Production env (git-ignored)
├── .env.development              # Development env (git-ignored)
├── .env.example                  # Template for env variables
├── .gitignore
├── .eslintrc.mjs                 # ESLint config
├── next.config.ts                # Next.js config
├── package.json
├── tsconfig.json
├── tailwind.config.ts            # Tailwind CSS config
└── README.md
```

## Key Design Principles

### 1. **Route Groups for UI Isolation**

- `(marketing)` - Public-facing pages
- `(app)` - Authenticated application pages
- Allows different layouts without changing URL structure

### 2. **Private Folders (`_*`)**

- Components colocated next to routes
- Not routable; prevents accidental exposure
- Keeps feature-specific code organized

### 3. **Separation of Concerns**

- **`components/`**: UI components only (presentational)
- **`lib/`**: Business logic and utilities (no React hooks)
- **`hooks/`**: React-specific custom hooks
- **`app/`**: Page definitions and route handlers

### 4. **API Organization**

- `api/auth/` - Authentication endpoints
- `api/v1/` - Versioned API (easier for migrations)
- Route handlers with proper error handling

### 5. **Type Safety**

- All types in dedicated `types/` folder
- Zod schemas for runtime validation
- Strong typing throughout the codebase

### 6. **Scalability Features**

- Feature-based organization (extensible)
- Environment-based configuration
- API versioning ready
- Testing structure in place

## File Naming Conventions

| Type       | Pattern                    | Example              |
| ---------- | -------------------------- | -------------------- |
| Components | PascalCase                 | `UserProfile.tsx`    |
| Hooks      | camelCase, `use*` prefix   | `useLocalStorage.ts` |
| Utils/Lib  | camelCase                  | `formatDate.ts`      |
| Types      | PascalCase                 | `User.ts`            |
| Styles     | camelCase                  | `globals.css`        |
| Config     | camelCase                  | `site.ts`            |
| Tests      | `*.test.ts` or `*.spec.ts` | `utils.test.ts`      |

## Best Practices

### ✅ DO

- Use Server Components by default
- Place API calls in Server Components or Route Handlers
- Validate inputs with Zod
- Keep secrets in environment variables
- Use TypeScript for type safety
- Organize by feature (dashboard, auth, etc.)
- Colocate related files near their usage

### ❌ DON'T

- Fetch data in Client Components
- Expose API keys to the client
- Mix logic and UI in component files
- Create deeply nested folder structures
- Keep test files away from source code
- Put everything in a single `utils` folder

## Integration Points for Future Features

### Add Authentication

```
src/lib/auth/              # Auth logic
src/app/api/auth/          # Auth endpoints
src/components/providers/SessionProvider.tsx
src/middleware.ts          # Route protection
```

### Add Database

```
src/lib/db/                # DB client
src/types/database.ts      # Schema types
src/lib/validations/       # Input validation
```

### Add Real-time Features

```
src/lib/api/               # WebSocket client
src/hooks/queries/         # Real-time data hooks
src/components/providers/QueryProvider.tsx
```

### Add Admin Panel

```
src/app/(admin)/           # New route group
src/middleware.ts          # Admin role check
```

### Add Blog/CMS

```
src/app/(marketing)/blog/  # Feature folder
src/lib/api/posts/         # Blog utilities
src/types/blog.ts          # Blog types
```

## Environment Variables Template

Create `.env.example`:

```
# API
NEXT_PUBLIC_API_URL=http://localhost:3000
API_SECRET_KEY=your_secret_key

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret

# Third-party Services
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

## Testing Structure

```
Unit Tests → Individual functions/hooks
Integration Tests → Feature workflows
E2E Tests → User journeys across the app
```

## Performance Optimization

- **Code Splitting**: Automatic by Next.js
- **Image Optimization**: Use `next/image`
- **Font Optimization**: Use `next/font`
- **Dynamic Imports**: For heavy components
- **Caching**: Cache Components (Next.js 16+)

## Quick Start

1. Copy this structure to your project
2. Update `tsconfig.json` with path aliases
3. Install dependencies
4. Set up environment variables
5. Start developing!

## Path Aliases in `tsconfig.json`

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/lib/*": ["src/lib/*"],
      "@/types/*": ["src/types/*"],
      "@/hooks/*": ["src/hooks/*"]
    }
  }
}
```

Then import easily:

```typescript
import { Button } from "@/components/ui/Button";
import { useUsers } from "@/hooks/queries/useUsers";
import type { User } from "@/types";
```

---

**Last Updated**: January 24, 2026
**Next.js Version**: 16.1.4+
**Status**: Production-ready
