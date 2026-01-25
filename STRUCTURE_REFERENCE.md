# Visual Structure Reference

A quick visual guide to the complete folder structure with examples of what goes in each folder.

## Complete Folder Tree

```
📦 FED project structure
│
├── 📄 README.md                              # Start here - main overview
├── 📄 GETTING_STARTED.md                    # Quick start guide
├── 📄 PROJECT_STRUCTURE.md                  # Full structure overview
├── 📄 FOLDER_GUIDE.md                       # Deep dive into each folder
├── 📄 BEST_PRACTICES.md                     # Production patterns
├── 📄 IMPLEMENTATION_CHECKLIST.md           # Setup steps
│
├── 📜 setup.sh                              # Auto setup for macOS/Linux
├── 📜 setup.ps1                             # Auto setup for Windows
│
│
├── 📁 src/                                  # Application Code
│   │
│   ├── 📁 app/                              # Routes & Pages (Next.js App Router)
│   │   │
│   │   ├── 📁 (marketing)/                  # Route Group: Public Pages
│   │   │   ├── 📄 page.tsx                  # / Home page
│   │   │   ├── 📄 layout.tsx                # Marketing layout wrapper
│   │   │   ├── 📄 error.tsx                 # Error boundary
│   │   │   ├── 📄 loading.tsx               # Loading skeleton
│   │   │   └── 📁 _components/              # Private: marketing components
│   │   │
│   │   ├── 📁 (app)/                        # Route Group: App Pages (protected)
│   │   │   ├── 📄 layout.tsx                # App layout (auth, sidebar, etc)
│   │   │   ├── 📁 dashboard/
│   │   │   │   ├── 📄 page.tsx              # /dashboard route
│   │   │   │   ├── 📄 loading.tsx           # Loading skeleton
│   │   │   │   ├── 📄 error.tsx             # Error boundary
│   │   │   │   ├── 📄 layout.tsx            # Dashboard layout
│   │   │   │   └── 📁 _components/
│   │   │   │       ├── 📄 DashboardCard.tsx
│   │   │   │       ├── 📄 Analytics.tsx
│   │   │   │       └── 📄 MetricsTable.tsx
│   │   │   │
│   │   │   └── 📁 settings/
│   │   │       ├── 📄 page.tsx              # /settings route
│   │   │       └── 📁 _components/
│   │   │
│   │   ├── 📁 api/                          # API Routes (no page UI)
│   │   │   ├── 📁 auth/
│   │   │   │   ├── 📄 [...nextauth]/route.ts  # NextAuth handler
│   │   │   │   ├── 📄 register/route.ts       # POST /api/auth/register
│   │   │   │   └── 📄 login/route.ts          # POST /api/auth/login
│   │   │   │
│   │   │   └── 📁 v1/                       # API v1 (versioned)
│   │   │       ├── 📁 users/
│   │   │       │   └── 📄 route.ts          # GET/POST /api/v1/users
│   │   │       ├── 📁 posts/
│   │   │       │   ├── 📄 route.ts          # GET/POST /api/v1/posts
│   │   │       │   └── 📁 [id]/
│   │   │       │       └── 📄 route.ts      # GET/PUT /api/v1/posts/[id]
│   │   │       └── 📁 search/
│   │   │           └── 📄 route.ts
│   │   │
│   │   ├── 📄 layout.tsx                    # Root layout (html, body)
│   │   ├── 📄 page.tsx                      # Root page fallback
│   │   ├── 📄 error.tsx                     # Global error boundary
│   │   ├── 📄 not-found.tsx                 # 404 page
│   │   ├── 📄 loading.tsx                   # Global loading state
│   │   ├── 📄 favicon.ico                   # Browser tab icon
│   │   ├── 📄 opengraph-image.tsx           # Dynamic social share image
│   │   ├── 📄 robots.ts                     # SEO robots.txt
│   │   └── 📄 sitemap.ts                    # SEO sitemap
│   │
│   ├── 📁 components/                       # Reusable React Components
│   │   │
│   │   ├── 📁 ui/                           # Base UI Components
│   │   │   ├── 📄 Button.tsx                # Button component
│   │   │   ├── 📄 Card.tsx                  # Card component
│   │   │   ├── 📄 Modal.tsx                 # Modal/dialog
│   │   │   ├── 📄 Input.tsx                 # Form input
│   │   │   ├── 📄 Dropdown.tsx
│   │   │   ├── 📄 Badge.tsx
│   │   │   ├── 📄 Alert.tsx
│   │   │   └── 📄 Pagination.tsx
│   │   │
│   │   ├── 📁 layouts/                      # Layout Wrapper Components
│   │   │   ├── 📄 Header.tsx                # Top navigation
│   │   │   ├── 📄 Footer.tsx                # Bottom section
│   │   │   ├── 📄 Sidebar.tsx               # Side navigation
│   │   │   ├── 📄 Navigation.tsx
│   │   │   └── 📄 PageLayout.tsx            # Standard page wrapper
│   │   │
│   │   ├── 📁 forms/                        # Form Components
│   │   │   ├── 📄 LoginForm.tsx             # Full login form
│   │   │   ├── 📄 RegisterForm.tsx          # Registration form
│   │   │   ├── 📄 ContactForm.tsx
│   │   │   └── 📄 EditProfileForm.tsx
│   │   │
│   │   └── 📁 providers/                    # Context/Provider Components
│   │       ├── 📄 SessionProvider.tsx       # Auth session
│   │       ├── 📄 ThemeProvider.tsx         # Dark/light mode
│   │       ├── 📄 QueryProvider.tsx         # React Query
│   │       └── 📄 ToastProvider.tsx         # Toast notifications
│   │
│   ├── 📁 lib/                              # Business Logic & Utilities (No React)
│   │   │
│   │   ├── 📁 api/                          # API Client Functions
│   │   │   ├── 📄 client.ts                 # fetch() wrapper
│   │   │   ├── 📄 endpoints.ts              # API URLs
│   │   │   ├── 📄 users.ts                  # User API calls
│   │   │   └── 📄 posts.ts                  # Post API calls
│   │   │
│   │   ├── 📁 auth/                         # Authentication Logic
│   │   │   ├── 📄 session.ts                # Get session
│   │   │   ├── 📄 permissions.ts            # Authorization checks
│   │   │   └── 📄 tokens.ts                 # Token handling
│   │   │
│   │   ├── 📁 db/                           # Database Utilities
│   │   │   ├── 📄 client.ts                 # DB connection
│   │   │   └── 📄 queries.ts                # Common queries
│   │   │
│   │   ├── 📁 utils/                        # General Utilities
│   │   │   ├── 📄 cn.ts                     # classname merger
│   │   │   ├── 📄 dates.ts                  # Date formatting
│   │   │   ├── 📄 string.ts                 # String helpers
│   │   │   ├── 📄 numbers.ts                # Math helpers
│   │   │   └── 📄 format.ts                 # Data formatting
│   │   │
│   │   └── 📁 validations/                  # Zod Validation Schemas
│   │       ├── 📄 auth.ts                   # Login/register schemas
│   │       ├── 📄 user.ts                   # User data schemas
│   │       ├── 📄 post.ts                   # Post schemas
│   │       └── 📄 forms.ts                  # Form field schemas
│   │
│   ├── 📁 hooks/                            # Custom React Hooks
│   │   │
│   │   ├── 📁 queries/                      # Data Fetching Hooks (React Query)
│   │   │   ├── 📄 useUsers.ts               # Fetch all users
│   │   │   ├── 📄 usePosts.ts               # Fetch all posts
│   │   │   ├── 📄 useUserById.ts            # Fetch single user
│   │   │   └── 📄 usePostById.ts            # Fetch single post
│   │   │
│   │   ├── 📁 mutations/                    # Data Mutation Hooks
│   │   │   ├── 📄 useCreateUser.ts          # Create new user
│   │   │   ├── 📄 useUpdateProfile.ts       # Update user profile
│   │   │   ├── 📄 useDeletePost.ts          # Delete post
│   │   │   └── 📄 useLogin.ts               # Login mutation
│   │   │
│   │   └── 📁 custom/                       # General Custom Hooks
│   │       ├── 📄 useLocalStorage.ts        # Persist to localStorage
│   │       ├── 📄 useMediaQuery.ts          # Responsive breakpoints
│   │       ├── 📄 usePagination.ts          # Pagination logic
│   │       ├── 📄 useDebounce.ts            # Debounce values
│   │       ├── 📄 useAsync.ts               # Handle async
│   │       └── 📄 useFetch.ts               # Simple fetch hook
│   │
│   ├── 📁 types/                            # TypeScript Type Definitions
│   │   ├── 📄 index.ts                      # Re-export all types
│   │   ├── 📄 api.ts                        # API response types
│   │   ├── 📄 user.ts                       # User types
│   │   ├── 📄 post.ts                       # Post types
│   │   ├── 📄 database.ts                   # Database schema types
│   │   └── 📄 common.ts                     # Shared types
│   │
│   ├── 📁 config/                           # Configuration Files
│   │   ├── 📄 site.ts                       # Site metadata
│   │   ├── 📄 nav.ts                        # Navigation structure
│   │   ├── 📄 env.ts                        # Environment validation
│   │   └── 📄 constants.ts                  # Global constants
│   │
│   ├── 📁 constants/                        # App-Wide Constants
│   │   ├── 📄 routes.ts                     # Route definitions
│   │   ├── 📄 api.ts                        # API endpoints
│   │   └── 📄 status.ts                     # Status codes
│   │
│   ├── 📁 styles/                           # CSS Files
│   │   ├── 📄 globals.css                   # Global styles
│   │   └── 📄 variables.css                 # CSS custom properties
│   │
│   └── 📄 middleware.ts                     # Next.js Middleware
│       # Runs before route handler
│       # Auth checks, redirects, etc.
│
├── 📁 public/                               # Static Assets (served directly)
│   ├── 📁 images/
│   │   ├── 📄 logo.svg
│   │   ├── 📄 hero.jpg
│   │   └── 📄 og-image.png
│   ├── 📁 icons/
│   │   ├── 📄 favicon.ico
│   │   └── 📄 apple-touch-icon.png
│   └── 📁 fonts/
│       └── 📄 custom-font.woff2
│
├── 📁 __tests__/                            # Test Files
│   ├── 📁 unit/                             # Unit Tests
│   │   ├── 📄 utils.test.ts
│   │   ├── 📄 validation.test.ts
│   │   └── 📄 formatters.test.ts
│   │
│   ├── 📁 integration/                      # Integration Tests
│   │   ├── 📄 auth.test.ts
│   │   ├── 📄 api.test.ts
│   │   └── 📄 database.test.ts
│   │
│   └── 📁 e2e/                              # End-to-End Tests
│       ├── 📄 login.spec.ts
│       ├── 📄 dashboard.spec.ts
│       └── 📄 user-flow.spec.ts
│
├── 📁 .github/                              # GitHub Configuration
│   ├── 📁 workflows/                        # CI/CD Pipelines
│   │   ├── 📄 test.yml
│   │   ├── 📄 lint.yml
│   │   └── 📄 deploy.yml
│   │
│   └── 📁 agents/
│       └── 📄 FED agent.agent.md            # AI agent config
│
├── 📁 .vscode/                              # VS Code Settings
│   ├── 📄 settings.json
│   ├── 📄 extensions.json
│   └── 📄 launch.json
│
│
├── ⚙️ Configuration Files
│   ├── 📄 next.config.ts                    # Next.js configuration
│   ├── 📄 tsconfig.json                     # TypeScript config
│   ├── 📄 tailwind.config.ts                # Tailwind CSS config
│   ├── 📄 postcss.config.js                 # PostCSS config
│   ├── 📄 eslint.config.mjs                 # ESLint config
│   ├── 📄 package.json                      # Dependencies & scripts
│   └── 📄 package-lock.json                 # Dependency lock
│
├── 📋 Environment Variables
│   ├── 📄 .env                              # Local env vars (git-ignored)
│   ├── 📄 .env.local                        # Local overrides (git-ignored)
│   ├── 📄 .env.production                   # Production env (git-ignored)
│   ├── 📄 .env.development                  # Development env (git-ignored)
│   └── 📄 .env.example                      # Template (version controlled)
│
└── 📄 .gitignore                            # Git ignore rules
```

## Quick Reference

### By File Type

**Pages & Routes**

```
src/app/page.tsx
src/app/(marketing)/page.tsx
src/app/(app)/dashboard/page.tsx
src/app/api/v1/users/route.ts
```

**Components**

```
src/components/ui/Button.tsx
src/components/layouts/Header.tsx
src/components/forms/LoginForm.tsx
src/app/(app)/dashboard/_components/Card.tsx
```

**Hooks**

```
src/hooks/queries/useUsers.ts
src/hooks/mutations/useCreateUser.ts
src/hooks/custom/useLocalStorage.ts
```

**Logic & Utilities**

```
src/lib/api/client.ts
src/lib/auth/session.ts
src/lib/utils/cn.ts
src/lib/validations/auth.ts
```

**Types & Config**

```
src/types/user.ts
src/config/site.ts
src/constants/routes.ts
src/styles/globals.css
```

**Tests**

```
__tests__/unit/utils.test.ts
__tests__/integration/auth.test.ts
__tests__/e2e/login.spec.ts
```

### By Feature

**Authentication**

```
src/app/api/auth/[...nextauth]/route.ts    # Endpoints
src/app/(marketing)/login/page.tsx         # Login page
src/lib/auth/session.ts                    # Session logic
src/lib/validations/auth.ts                # Validation
src/types/user.ts                          # Types
src/middleware.ts                          # Route protection
```

**Dashboard**

```
src/app/(app)/dashboard/page.tsx           # Main page
src/app/(app)/dashboard/layout.tsx         # Layout
src/app/(app)/dashboard/_components/       # Components
src/lib/api/dashboard.ts                   # Data fetching
src/hooks/queries/useDashboard.ts          # Query hook
```

**API**

```
src/app/api/v1/users/route.ts              # Endpoints
src/lib/api/client.ts                      # Client
src/lib/validations/user.ts                # Validation
src/types/api.ts                           # Response types
__tests__/integration/api.test.ts          # Tests
```

---

**Print this page as reference while developing!**
