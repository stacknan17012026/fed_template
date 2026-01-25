# Best Practices for Production Next.js Applications

Guidance on architectural decisions and patterns for this folder structure.

## 1. Server vs. Client Components

### Default: Server Components

Always use Server Components by default. They:

- Run on the server (no JS sent to client)
- Can access databases directly
- Keep secrets safe
- Improve performance

```typescript
// src/app/dashboard/page.tsx - SERVER COMPONENT
import { fetchUserData } from '@/lib/api/client'

export default async function DashboardPage() {
  const user = await fetchUserData() // Server-side only
  return <div>{user.name}</div>
}
```

### Only Use Client Components When Needed

Add `'use client'` only for:

- Interactive features (click handlers, forms)
- React hooks (useState, useEffect)
- Event listeners
- Browser APIs

```typescript
// src/components/ThemeToggle.tsx - CLIENT COMPONENT
'use client'
import { useState } from 'react'

export function ThemeToggle() {
  const [theme, setTheme] = useState('light')
  return <button onClick={() => setTheme('dark')}>Toggle</button>
}
```

### Pattern: Server Component + Client Component

```typescript
// src/app/dashboard/page.tsx - Server Component
import { DashboardClient } from './_components/DashboardClient'
import { fetchData } from '@/lib/api/client'

export default async function Dashboard() {
  const data = await fetchData() // Server fetch
  return <DashboardClient initialData={data} /> // Pass to client
}

// src/app/dashboard/_components/DashboardClient.tsx - Client Component
'use client'
export function DashboardClient({ initialData }) {
  const [data, setData] = useState(initialData)
  return <div>{/* Interactive UI */}</div>
}
```

---

## 2. Data Fetching Patterns

### Pattern 1: Server Component (Preferred)

```typescript
// src/app/page.tsx
export default async function Page() {
  const posts = await fetch('https://api.example.com/posts').then(r => r.json())
  return <PostList posts={posts} />
}
```

**Advantages:**

- Secrets stay on server
- Faster rendering
- Better SEO
- Simpler code

### Pattern 2: Route Handler (API)

```typescript
// src/app/api/v1/posts/route.ts
export async function GET() {
  const posts = await db.posts.findMany();
  return Response.json(posts);
}

// Then fetch from Server Component:
const posts = await fetch("/api/v1/posts", { cache: "revalidate" });
```

### Pattern 3: Client Component + React Query

```typescript
// src/hooks/queries/usePosts.ts
'use client'
import { useQuery } from '@tanstack/react-query'

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => fetch('/api/v1/posts').then(r => r.json())
  })
}

// src/components/PostList.tsx
'use client'
export function PostList() {
  const { data: posts } = usePosts()
  return <div>{posts?.map(p => <p key={p.id}>{p.title}</p>)}</div>
}
```

**When to use:**

- User-driven data fetching
- Filters, search, pagination
- Real-time updates
- Optimistic updates

---

## 3. API Route Best Practices

### Structure

```typescript
// src/app/api/v1/posts/route.ts
import { NextRequest } from "next/server";
import { z } from "zod";

const createPostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(10),
});

// GET - Fetch posts
export async function GET(request: NextRequest) {
  try {
    const posts = await db.posts.findMany();
    return Response.json(posts);
  } catch (error) {
    return Response.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

// POST - Create post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = createPostSchema.parse(body);

    const post = await db.posts.create(data);
    return Response.json(post, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: error.errors }, { status: 400 });
    }
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
```

### Key Points

- Always validate input with Zod
- Return proper HTTP status codes
- Handle errors explicitly
- Use `Response.json()` for responses
- Versioned APIs (`/api/v1/`)

---

## 4. Authentication & Authorization

### Middleware for Protected Routes

```typescript
// src/middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const middleware = withAuth(
  function onSuccess(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*"],
};
```

### Role-Based Access Control

```typescript
// src/lib/auth/permissions.ts
export function canEdit(user: User, resource: Resource) {
  return user.id === resource.ownerId || user.role === "admin";
}

export function requireAdmin(user: User | null) {
  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized");
  }
}

// Usage in API Route
export async function POST(request: NextRequest) {
  const session = await getServerSession();
  requireAdmin(session?.user);
  // ... rest of handler
}
```

---

## 5. Type Safety

### Share Types Across App

```typescript
// src/types/api.ts
export type APIResponse<T> = {
  data?: T;
  error?: string;
  status: "success" | "error";
};

// src/types/user.ts
export type User = {
  id: string;
  email: string;
  role: "admin" | "user";
};

// src/types/index.ts
export * from "./api";
export * from "./user";

// Usage everywhere
import type { User, APIResponse } from "@/types";

const response: APIResponse<User[]> = { data: [], status: "success" };
```

### Generate Types from Database

```typescript
// src/types/database.ts
// Generated from your database schema (Prisma, Drizzle, etc.)
export type User = {
  id: string;
  email: string;
  // ...
};
```

---

## 6. Error Handling

### Global Error Boundary

```typescript
// src/app/error.tsx
'use client'
export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong</h2>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
```

### Feature-Level Error Boundary

```typescript
// src/app/(app)/dashboard/error.tsx
'use client'
export default function DashboardError({ error, reset }) {
  return (
    <div className="p-4">
      <h2>Dashboard Error</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Retry</button>
    </div>
  )
}
```

### Error Handling in API Routes

```typescript
export async function POST(request: NextRequest) {
  try {
    // business logic
  } catch (error) {
    console.error("Error:", error);

    if (error instanceof ValidationError) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    if (error instanceof AuthError) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
```

---

## 7. Caching Strategy

### Next.js Cache Control

```typescript
// src/lib/api/client.ts

// Cache for 1 hour
export async function getUserData(id: string) {
  return fetch(`/api/users/${id}`, {
    next: { revalidate: 3600 },
  }).then((r) => r.json());
}

// Cache indefinitely (revalidate on demand)
export async function getStaticData() {
  return fetch("/api/static", {
    next: { revalidate: false },
  }).then((r) => r.json());
}

// No cache (always fresh)
export async function getRealTimeData() {
  return fetch("/api/realtime", {
    cache: "no-store",
  }).then((r) => r.json());
}
```

### Revalidation

```typescript
// src/app/api/revalidate/route.ts
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidatePath("/dashboard");
  revalidatePath("/posts");

  return Response.json({ revalidated: true });
}
```

---

## 8. Environment Variables

### Organization

```
# .env.example

# Public (exposed to browser)
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_KEY=pk_test_...

# Private (server only)
DATABASE_URL=postgresql://...
API_SECRET_KEY=...
NEXTAUTH_SECRET=...
```

### Validation

```typescript
// src/lib/env.ts
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  NODE_ENV: z.enum(["development", "production"]).optional(),
});

const env = envSchema.parse(process.env);
export default env;
```

---

## 9. Performance Optimization

### Code Splitting

```typescript
// src/app/dashboard/page.tsx
import dynamic from 'next/dynamic'

const HeavyChart = dynamic(() => import('@/components/Chart'), {
  loading: () => <ChartSkeleton />,
  ssr: false // Only client-side
})

export default function Dashboard() {
  return <HeavyChart />
}
```

### Image Optimization

```typescript
import Image from 'next/image'

export function Hero() {
  return (
    <Image
      src="/images/hero.jpg"
      alt="Hero"
      width={1200}
      height={600}
      priority // LCP image
    />
  )
}
```

### Font Optimization

```typescript
// src/app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
```

---

## 10. Testing

### Unit Test Example

```typescript
// __tests__/unit/utils.test.ts
import { describe, it, expect } from "vitest";
import { formatDate } from "@/lib/utils/dates";

describe("formatDate", () => {
  it("should format date correctly", () => {
    const date = new Date("2024-01-15");
    expect(formatDate(date)).toBe("January 15, 2024");
  });
});
```

### Component Test Example

```typescript
// __tests__/unit/Button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/Button'

describe('Button', () => {
  it('should render', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
})
```

---

## Common Pitfalls to Avoid

❌ **DON'T**: Fetch data in Client Components

```typescript
// ❌ WRONG
'use client'
export function UserList() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch('/api/users').then(r => r.json()).then(setUsers)
  }, [])
}

// ✅ RIGHT - Server Component
export default async function UserList() {
  const users = await fetch('/api/users').then(r => r.json())
  return <div>{users.map(...)}</div>
}
```

❌ **DON'T**: Expose secrets to client

```typescript
// ❌ WRONG
export const API_KEY = process.env.SECRET_KEY;

// ✅ RIGHT - Use only in Server Components/API Routes
const response = await fetch(url, {
  headers: { "X-API-Key": process.env.SECRET_KEY },
});
```

❌ **DON'T**: Put everything in one utils folder

```typescript
// ❌ WRONG
src/utils/
  ├── helpers.ts (50+ functions)
  ├── clients.ts
  └── validators.ts

// ✅ RIGHT - Organize by domain
src/lib/
  ├── api/
  ├── auth/
  ├── db/
  ├── utils/
  └── validations/
```

---

## Summary

| Pattern          | Use Case                              |
| ---------------- | ------------------------------------- |
| Server Component | Default for pages and data fetching   |
| Client Component | Interactive UI, hooks, event handlers |
| Route Handler    | API endpoints with authentication     |
| React Query      | User-driven fetching, real-time       |
| Zod              | Input validation                      |
| Middleware       | Auth guards, redirects                |
| Error Boundary   | Global/feature error handling         |
| Dynamic Import   | Heavy components                      |

---

**Keep these principles in mind as you build. Consistency is key to maintainability.**
