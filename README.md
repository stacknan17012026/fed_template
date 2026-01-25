# Production-Grade Next.js 16 Project Structure

A comprehensive, enterprise-ready folder structure for Next.js applications built on official documentation best practices.

## 📋 Overview

This is a **complete, production-tested folder structure** designed for:

- ✅ **Scalability** - From startups to enterprise
- ✅ **Maintainability** - Clear organization prevents chaos
- ✅ **Type Safety** - TypeScript throughout
- ✅ **Security** - Best practices built-in
- ✅ **Performance** - Server Components by default
- ✅ **Flexibility** - Easily add new features

## 📚 Documentation

Start here:

| Document                                                       | Purpose                             | Read Time |
| -------------------------------------------------------------- | ----------------------------------- | --------- |
| **[GETTING_STARTED.md](GETTING_STARTED.md)**                   | Quick overview & setup guide        | 5 min     |
| **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)**               | Complete structure overview         | 10 min    |
| **[FOLDER_GUIDE.md](FOLDER_GUIDE.md)**                         | Detailed explanation of each folder | 15 min    |
| **[BEST_PRACTICES.md](BEST_PRACTICES.md)**                     | Production patterns & anti-patterns | 20 min    |
| **[IMPLEMENTATION_CHECKLIST.md](IMPLEMENTATION_CHECKLIST.md)** | Step-by-step setup guide            | 30 min    |

## 🎯 Quick Start

### Option 1: Automated Setup (Windows)

```powershell
.\setup.ps1
```

### Option 2: Automated Setup (macOS/Linux)

```bash
bash setup.sh
```

### Option 3: Manual Setup

Follow [IMPLEMENTATION_CHECKLIST.md](IMPLEMENTATION_CHECKLIST.md)

## 📁 Folder Structure

```
project-root/
├── src/
│   ├── app/                 # Routes & Pages (App Router)
│   ├── components/          # React Components
│   ├── lib/                 # Business Logic & Utilities
│   ├── hooks/               # Custom React Hooks
│   ├── types/               # TypeScript Definitions
│   ├── config/              # Configuration
│   ├── constants/           # App Constants
│   ├── styles/              # CSS
│   └── middleware.ts        # Request Handlers
├── public/                  # Static Assets
├── __tests__/               # Tests (Unit, Integration, E2E)
└── Documentation (5 guides)
```

## 🚀 Key Features

### ✅ App Router Ready

- Route groups for organizing pages without changing URLs
- Private folders for feature-specific components
- API versioning structure

### ✅ Component Organization

- UI components separate from business logic
- Feature-based organization
- Reusable component library structure

### ✅ TypeScript & Type Safety

- Strict mode enabled
- Centralized type definitions
- Zod for runtime validation

### ✅ Security & Performance

- Server Components by default
- API secrets never exposed
- Caching strategies included
- Image & font optimization ready

### ✅ Production-Ready

- Error boundaries
- Loading states
- Environment configuration
- Testing structure

## 📖 What Goes Where

```
New page?               → src/app/[feature]/page.tsx
New component?          → src/components/[category]/
New API endpoint?       → src/app/api/v1/[resource]/route.ts
New hook?               → src/hooks/[type]/use*.ts
New utility?            → src/lib/[domain]/
Type definition?        → src/types/[domain].ts
Validation schema?      → src/lib/validations/
Configuration?          → src/config/
Test file?              → __tests__/[type]/
```

## 🎨 Design Principles

### 1. Separation of Concerns

- **Components** - Presentational UI only
- **Lib** - Pure functions, no React
- **Hooks** - React-specific custom hooks
- **Types** - Centralized type definitions

### 2. Feature-Based Organization

- Group related code together
- Easy to find files
- Scales as project grows
- Easy to add/remove features

### 3. Convention Over Configuration

- Predictable folder names
- Consistent file organization
- Clear patterns for new developers

### 4. Flexibility & Extensibility

- Works for small projects
- Scales to large teams
- Ready for API versioning
- Room for experiments

## ⚡ Usage Patterns

### Fetching Data (Server Component)

```typescript
// src/app/dashboard/page.tsx
import { fetchData } from '@/lib/api/client'

export default async function Dashboard() {
  const data = await fetchData()
  return <div>{data}</div>
}
```

### API Endpoint

```typescript
// src/app/api/v1/users/route.ts
export async function GET() {
  const users = await db.users.findMany();
  return Response.json(users);
}
```

### Component with Client Logic

```typescript
// src/components/ThemeToggle.tsx
'use client'
import { useState } from 'react'

export function ThemeToggle() {
  const [theme, setTheme] = useState('light')
  return <button onClick={() => setTheme('dark')}>Toggle</button>
}
```

### Custom Hook

```typescript
// src/hooks/queries/useUsers.ts
import { useQuery } from "@tanstack/react-query";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => fetch("/api/v1/users").then((r) => r.json()),
  });
}
```

## 🔒 Security Built-In

✅ Secrets stay on server (never exposed to client)
✅ API keys protected in environment variables
✅ Input validation with Zod
✅ Type-safe database queries
✅ CSRF protection with Route Handlers
✅ Authentication middleware ready

## ⚙️ Configuration

### TypeScript Path Aliases

Already set up for clean imports:

```typescript
import { Button } from "@/components/ui/Button";
import type { User } from "@/types";
import { useUsers } from "@/hooks/queries/useUsers";
```

### Environment Variables

Template provided in `.env.example`:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_secret_key
```

### Tailwind CSS

Pre-configured to support:

- Dark mode
- Responsive design
- Custom color schemes
- CSS variables

## 🧪 Testing Ready

Structure supports:

- **Unit Tests** - Test functions and components
- **Integration Tests** - Test feature workflows
- **E2E Tests** - Test user journeys

Example test:

```typescript
// __tests__/unit/utils.test.ts
import { describe, it, expect } from "vitest";
import { formatDate } from "@/lib/utils/dates";

describe("formatDate", () => {
  it("formats date correctly", () => {
    expect(formatDate(new Date("2024-01-15"))).toBe("January 15, 2024");
  });
});
```

## 📈 Scaling Up

### Small Project (1 developer)

Use structure as-is. Keep it simple.

### Growing Project (3-5 developers)

- Use route groups to organize features
- Establish coding standards
- Add CI/CD pipeline

### Enterprise Project (10+ developers)

- Consider monorepo setup
- Extract shared components
- Implement feature flags
- Use Nx or Turborepo

## 🛠️ Recommended Tools

### UI Components

- [shadcn/ui](https://ui.shadcn.com/) - Headless component library
- [Radix UI](https://www.radix-ui.com/) - Unstyled components

### Forms & Validation

- [React Hook Form](https://react-hook-form.com/) - Efficient forms
- [Zod](https://zod.dev/) - TypeScript-first validation

### Data Fetching

- [TanStack Query](https://tanstack.com/query/latest) - Server state
- [SWR](https://swr.vercel.app/) - Data fetching

### Database

- [Prisma](https://www.prisma.io/) - ORM with migrations
- [Drizzle](https://orm.drizzle.team/) - Lightweight ORM

### Authentication

- [NextAuth.js](https://next-auth.js.org/) - Auth for Next.js
- [Auth0](https://auth0.com/) - Managed auth

### Testing

- [Vitest](https://vitest.dev/) - Fast unit tests
- [Playwright](https://playwright.dev/) - E2E testing
- [Testing Library](https://testing-library.com/) - Component testing

## 📊 Performance Targets

With proper implementation:

- **Lighthouse Performance**: 90+
- **Core Web Vitals**: Good
- **FCP**: < 2s
- **TTI**: < 3s

## 🚨 Common Mistakes to Avoid

❌ Fetching data in Client Components
❌ Exposing API keys to the client
❌ Putting everything in one utils folder
❌ Not validating user input
❌ Over-nesting folder structures
❌ Using Client Components for everything

See [BEST_PRACTICES.md](BEST_PRACTICES.md) for details and solutions.

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## 🤝 Contributing

This structure is meant to be flexible. Adjust it for your needs:

- Rename folders if it makes sense for your domain
- Add new category folders when needed
- Remove unused structure
- Document your modifications

## 📝 Version History

- **v1.0.0** (Jan 2026) - Production-ready structure for Next.js 16+

## 📞 Support

If you have questions:

1. Check the [FOLDER_GUIDE.md](FOLDER_GUIDE.md) for folder explanations
2. Read [BEST_PRACTICES.md](BEST_PRACTICES.md) for patterns
3. Follow [IMPLEMENTATION_CHECKLIST.md](IMPLEMENTATION_CHECKLIST.md) for setup

## ✨ What's Next?

1. **Read** [GETTING_STARTED.md](GETTING_STARTED.md) (5 min)
2. **Review** [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) (10 min)
3. **Explore** [FOLDER_GUIDE.md](FOLDER_GUIDE.md) (15 min)
4. **Learn** [BEST_PRACTICES.md](BEST_PRACTICES.md) (20 min)
5. **Setup** [IMPLEMENTATION_CHECKLIST.md](IMPLEMENTATION_CHECKLIST.md) (30-60 min)
6. **Build** your first feature!

---

**Built for**: Next.js 16.1.4+
**Framework**: React 19+
**Status**: Production-Ready
**Last Updated**: January 24, 2026

**Happy coding! 🚀**
