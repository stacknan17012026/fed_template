# Debugger Setup Verification

Complete checklist and verification steps for the production-grade debugger setup.

## ✅ Setup Verification Checklist

### 1. Files Created/Modified
- [x] `.vscode/launch.json` - 7 debug configurations
- [x] `.vscode/tasks.json` - Build and debug tasks
- [x] `.vscode/settings.json` - Editor optimization
- [x] `DEBUGGING_GUIDE.md` - Full debugging documentation

### 2. Configuration Details

**launch.json configurations:**
```
✓ Next.js: Debug Server         (Node: npm run dev)
✓ Next.js: Debug with Browser   (Chrome: preLaunchTask)
✓ Next.js: Debug Build          (Node: npm run build)
✓ Next.js: Debug Production     (Node: npm run start)
✓ Vitest: Debug Tests           (Node: npm run test)
✓ Vitest: Watch Mode            (Node: npm run test:ui)
✓ Playwright: Debug E2E Tests   (Node: npm run e2e:ui)
✓ Compound: Full Stack Debug    (Starts Server + Browser)
```

**All configurations use:**
- `runtimeExecutable: npm` (Windows-compatible)
- `runtimeArgs: ["run", "script-name"]` (Works on all OS)
- NO direct binary paths (fixes Windows path issues)

### 3. Critical Fixes Applied

**Problem 1: Windows Path Compatibility**
```javascript
// ❌ BEFORE (didn't work on Windows)
"program": "${workspaceFolder}/node_modules/.bin/next"

// ✅ AFTER (works everywhere)
"runtimeExecutable": "npm",
"runtimeArgs": ["run", "dev"]
```

**Problem 2: Missing postDebugTask**
```javascript
// ❌ BEFORE (tried to terminate which failed)
"postDebugTask": "terminate-next-dev"

// ✅ AFTER (removed - manual stop works fine)
// User can manually stop from Debug panel
```

**Problem 3: Windows Port Termination**
```bash
# ❌ BEFORE (Unix-only command)
"command": "lsof -ti:3000 | xargs kill -9 || true"

# ✅ AFTER (Windows command)
"command": "taskkill",
"args": ["/IM", "node.exe", "/F"]
```

---

## 🧪 Testing Your Setup

### Test 1: Server Debugging
```bash
1. Open Debug Panel (Ctrl+Shift+D)
2. Select "Next.js: Debug Server"
3. Press F5
4. Expected: Terminal shows "✓ Ready in" message
5. Open DevTools Server (in VS Code)
6. Look for "Local: http://localhost:3000"
```

### Test 2: Full Stack Debugging
```bash
1. Open Debug Panel (Ctrl+Shift+D)
2. Select "Next.js: Full Stack Debug"
3. Press F5
4. Expected: 
   - Server starts (shows "Ready in X ms")
   - Chrome opens automatically
   - Two debuggers in Debug Sidebar (Server + Browser)
5. Navigate to http://localhost:3000
6. Open Chrome DevTools (F12)
```

### Test 3: Browser Debugging
```bash
1. Start dev server: npm run dev
2. Open Debug Panel (Ctrl+Shift+D)
3. Select "Next.js: Debug with Browser"
4. Press F5
5. Expected:
   - Chrome opens automatically
   - Debugger attaches (yellow dot in VS Code)
   - Can set breakpoints in client code
```

### Test 4: Building with Debugger
```bash
1. Open Debug Panel (Ctrl+Shift+D)
2. Select "Next.js: Debug Build"
3. Press F5
4. Expected:
   - Build process runs in terminal
   - Can debug build-time errors
   - Terminal shows "✓ Creating an optimized production build"
```

### Test 5: Test Debugging
```bash
1. Open Debug Panel (Ctrl+Shift+D)
2. Select "Vitest: Debug Tests"
3. Press F5
4. Expected:
   - Tests run in terminal
   - Debugger attaches
   - Can set breakpoints in test files
```

---

## 🔍 How to Set Breakpoints

### In Server Code (API Routes)
```typescript
// File: src/app/api/v1/users/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // ← Click margin here to set breakpoint
  const users = await getUsers();
  return NextResponse.json(users);
}
```

**Steps:**
1. Open `src/app/api/v1/users/route.ts`
2. Click margin next to line with code you want to debug
3. Start "Next.js: Debug Server"
4. Make API request: `curl http://localhost:3000/api/v1/users`
5. Debugger pauses at breakpoint

### In Client Code (React Components)
```typescript
// File: src/components/Button.tsx
'use client';

export function Button() {
  const handleClick = () => {
    // ← Click margin here to set breakpoint
    console.log('Clicked');
  };
  
  return <button onClick={handleClick}>Click me</button>;
}
```

**Steps:**
1. Open `src/components/Button.tsx`
2. Click margin next to `console.log`
3. Start "Next.js: Debug with Browser"
4. Click the button in browser
5. Debugger pauses at breakpoint

### In Server Components
```typescript
// File: src/app/(app)/dashboard/page.tsx
export default async function DashboardPage() {
  // ← Click margin here to set breakpoint
  const data = await getDashboardData();
  
  return <Dashboard data={data} />;
}
```

**Steps:**
1. Open `src/app/(app)/dashboard/page.tsx`
2. Click margin next to `const data = ...`
3. Start "Next.js: Debug Server"
4. Navigate to `/dashboard` in browser
5. Debugger pauses at breakpoint

---

## 🎯 Common Debugging Scenarios

### Scenario 1: Debug Why API Route Fails
```typescript
// File: src/app/api/v1/users/route.ts
export async function GET() {
  try {
    debugger; // ← Breakpoint here
    const users = await db.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
```

### Scenario 2: Debug React Hook Issue
```typescript
// File: src/hooks/queries/useUsers.ts
export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  
  useEffect(() => {
    debugger; // ← Pauses when component mounts
    fetchUsers()
      .then(setUsers)
      .catch(console.error);
  }, []);
  
  return users;
}
```

### Scenario 3: Debug Form Submission
```typescript
// File: src/components/forms/LoginForm.tsx
'use client';

export function LoginForm() {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    debugger; // ← Pauses when form submitted
    
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}
```

---

## 📊 Debug Console Tips

### View Variable Values
```javascript
// Type in Debug Console (when paused at breakpoint):
users                    // Show value of users variable
users[0]                 // First user
users.length             // Number of users
users.map(u => u.name)   // Extract names
JSON.stringify(users, null, 2) // Pretty print
```

### Call Functions from Debug Console
```javascript
// When paused, you can execute code:
localStorage.setItem('test', 'value')
localStorage.getItem('test')
window.location.pathname  // Current path
document.title            // Page title
```

### Watch Variables
```
Debug Sidebar → Watch section → Click +
Enter variable name: users
Automatically updates when paused
```

---

## 🚀 Performance Tips

### 1. Use Conditional Breakpoints
```
Right-click line number → Add Conditional Breakpoint
Condition: i === 50

Only pauses when condition is true (for loops, etc)
```

### 2. Use Logpoints Instead of Breakpoints
```
Right-click line number → Add Logpoint
Message: User data: {users}

Logs value WITHOUT pausing execution
```

### 3. Disable Breakpoints During Long Runs
```
Debug Sidebar → Breakpoints section
Click checkbox to disable temporarily
Re-enable when needed
```

---

## 🔧 Advanced Configuration

### Attach to Running Process
```
1. Start: npm run dev
2. Debug Panel → "Add Configuration"
3. Select "Attach to Node Process"
4. Select the dev server process
```

### Debug Specific Test File
```
// Modify Vitest config temporarily
export default defineConfig({
  test: {
    include: ['**/__tests__/unit/specific.test.ts'],
  },
});
```

### Debug with Environment Variables
```json
// In launch.json, add to env:
"env": {
  "NODE_ENV": "development",
  "DEBUG": "app:*",
  "LOG_LEVEL": "debug"
}
```

---

## 📝 Configuration Files Reference

### .vscode/launch.json
- Defines all debug configurations
- 7 individual modes + 1 compound configuration
- Uses `runtimeExecutable: npm` for Windows compatibility

### .vscode/tasks.json
- Defines build and debug tasks
- `next-dev` - Runs dev server in background
- `terminate-next-dev` - Stops dev server (Windows version)
- Build, lint, test tasks

### .vscode/settings.json
- Editor optimization for debugging
- Format on save enabled
- ESLint auto-fix on save
- TypeScript strict mode

---

## ✨ Summary

**What's Set Up:**
- ✅ Full stack debugging (server + client)
- ✅ Individual server, client, build debugging
- ✅ Test debugging (unit + E2E)
- ✅ Windows-compatible configuration
- ✅ Production build debugging
- ✅ Complete documentation

**How to Use:**
1. Press `Ctrl+Shift+D` to open Debug Panel
2. Select configuration from dropdown
3. Press `F5` to start debugging
4. Set breakpoints by clicking line margin
5. Use Debug Console for variable inspection

**Files Modified:**
- `.vscode/launch.json` - Debug configurations
- `.vscode/tasks.json` - Build tasks
- `.vscode/settings.json` - Editor settings

For detailed usage, see `DEBUGGING_GUIDE.md`
