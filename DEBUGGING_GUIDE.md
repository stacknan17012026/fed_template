# Production-Grade Debugger Setup

Complete debugging configuration for the FED Next.js project with full stack debugging capabilities.

## Overview

This project includes:
- ✅ Next.js server-side debugging
- ✅ Chrome browser debugging
- ✅ Test debugging (Vitest)
- ✅ E2E test debugging (Playwright)
- ✅ Production build debugging
- ✅ Full stack compound debugging
- ✅ Windows-compatible setup

## Quick Start

### 1. **Next.js: Full Stack Debug** (Recommended)
Start complete debugging of both server and browser:

```
1. Open Debug panel (Ctrl+Shift+D or Cmd+Shift+D)
2. Select "Next.js: Full Stack Debug" from the dropdown
3. Press F5 or click Start Debugging
4. This FIRST starts the server, THEN opens browser
```

**What it does:**
- Starts Next.js dev server with debugger attached
- Waits for server to be ready (watches for "Ready in" message)
- Opens Chrome with DevTools connected
- Breakpoints work in both server and client code
- Server runs on http://localhost:3000

**Timing:**
- First time setup takes 10-15 seconds
- Subsequent runs are faster

---

## Individual Debugging Modes

### 2. **Next.js: Debug Server**
Debug only the server-side code:

```
Debug Panel → "Next.js: Debug Server" → F5
```

**Best for:**
- API route debugging
- Server component logic
- Middleware debugging
- Backend logic issues

**Breakpoints work in:**
- `src/app/api/**` routes
- `src/middleware.ts`
- Server components
- `src/lib/**` files

---

### 3. **Next.js: Debug with Browser**
Debug client-side code in Chrome:

```
Debug Panel → "Next.js: Debug with Browser" → F5
```

**Best for:**
- Client component debugging
- Hook debugging
- Browser API issues
- Event handling

**Automatically:**
- Starts dev server in background
- Opens Chrome with DevTools
- Maps source files correctly

---

### 4. **Next.js: Debug Build**
Debug the production build process:

```
Debug Panel → "Next.js: Debug Build" → F5
```

**Best for:**
- Build-time errors
- Checking production optimizations
- Analyzing build output
- Static generation issues

---

### 5. **Next.js: Debug Production Server**
Debug a production build locally:

```
Build first:  npm run build
Then Debug Panel → "Next.js: Debug Production Server" → F5
```

**Best for:**
- Production-only issues
- Performance profiling
- Environment-specific bugs

---

### 6. **Vitest: Debug Tests**
Debug unit and integration tests:

```
Debug Panel → "Vitest: Debug Tests" → F5
```

**Run single test file:**
```
Debug Console: Create configuration with specific file
Or right-click test file → Debug Test
```

---

### 7. **Vitest: Watch Mode**
Run tests in watch mode with debugging:

```
Debug Panel → "Vitest: Watch Mode" → F5
```

**Features:**
- Tests rerun on file changes
- Attach debugger when test fails
- Press 'a' in terminal to run all tests

---

### 8. **Playwright: Debug E2E Tests**
Debug end-to-end tests with Playwright Inspector:

```
Debug Panel → "Playwright: Debug E2E Tests" → F5
```

**Features:**
- Step through test actions
- Inspect page state
- Visual test replay
- Time-travel debugging

---

## Setting Breakpoints

### Types of Breakpoints

**1. Line Breakpoints**
```typescript
// Click on line number to toggle
function handleClick() {
  console.log("clicked"); // ← Click margin to add breakpoint
}
```

**2. Conditional Breakpoints**
```typescript
// Right-click line number → Add Conditional Breakpoint
for (let i = 0; i < 100; i++) {
  if (i === 50) console.log(i); // ← Break only when condition true
}
```

**3. Logpoints** (non-breaking)
```typescript
// Right-click line number → Add Logpoint
// Logs value without stopping execution
const value = fetchData(); // Log when hit
```

**4. Exception Breakpoints**
```
Debug Panel → Breakpoints section → Click +
Choose: All, Uncaught, or specific error types
```

---

## Debug Console Features

### Log Variables
```javascript
// In Debug Console (at breakpoint)
x                          // Show value of x
obj.property               // Nested access
array[0]                   // Array access
typeof variable            // Type checking
JSON.stringify(obj, null, 2) // Format objects
```

### Call Stack
```
Shows function call chain to current breakpoint
Click to jump to different frame
```

### Watch Expressions
```javascript
// Click + in Debug Panel → Watch section
myVariable
obj.nested.value
myArray.length
someFunction()
```

### Evaluate Code
```javascript
// Type in Debug Console
localStorage.setItem('key', 'value')
localStorage.getItem('key')
document.querySelector('button')?.click()
```

---

## Advanced Debugging

### Debug API Routes

**File: `src/app/api/v1/users/route.ts`**

```typescript
export async function GET(request: Request) {
  debugger; // ← Execution pauses here when debugger attached
  
  const data = await fetchUsers();
  return Response.json(data);
}
```

1. Start "Next.js: Debug Server"
2. Make API request to `http://localhost:3000/api/v1/users`
3. Debugger pauses at `debugger` statement

---

### Debug Server Components

**File: `src/app/(app)/dashboard/page.tsx`**

```typescript
export default async function DashboardPage() {
  // This runs on server only
  const data = await fetchDashboardData(); // ← Can debug this
  
  return <Dashboard data={data} />;
}
```

1. Start "Next.js: Debug Server"
2. Navigate to `/dashboard`
3. Server-side code executes with debugger attached

---

### Debug Client Components

**File: `src/components/forms/LoginForm.tsx`**

```typescript
'use client';

export function LoginForm() {
  const [email, setEmail] = useState(''); // ← Breakpoint here
  
  const handleSubmit = (e) => {
    console.log(email); // ← Breakpoint here
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}
```

1. Start "Next.js: Debug with Browser"
2. Open Chrome DevTools (F12)
3. Set breakpoints in client code
4. Click form button to trigger breakpoint

---

### Debug Hooks

**File: `src/hooks/queries/useUsers.ts`**

```typescript
export function useUsers() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    debugger; // ← Execution pauses here
    fetchUsers().then(setUsers);
  }, []);
  
  return users;
}
```

Breakpoints in hooks only work when using "Debug with Browser" config.

---

### Debug Middleware

**File: `src/middleware.ts`**

```typescript
export function middleware(request: NextRequest) {
  debugger; // ← Pauses for every request
  
  // Protection logic
  if (!request.auth) {
    return NextResponse.redirect('/login');
  }
}
```

1. Start "Next.js: Debug Server"
2. Make any request to the app
3. Debugger pauses at middleware

---

## Source Maps

Source maps are automatically enabled for development. They allow debugging TypeScript code directly instead of compiled JavaScript.

**TypeScript** → **Compiled JS** (you debug TypeScript):
```
src/app/page.tsx:15    // You see this
→ .next/server/app/page.js:150 // Maps here
```

---

## Performance Debugging

### CPU Profiling
```
1. Start "Next.js: Debug Server"
2. Debug Console → ⏱️ icon (Profiler)
3. Click "Start recording"
4. Trigger the action
5. Click "Stop recording"
6. Review CPU usage
```

### Memory Profiling
```
1. Debug Console → 💾 icon (Memory)
2. Take heap snapshot
3. Compare snapshots to detect leaks
```

---

## Common Debugging Patterns

### Pattern 1: Breakpoint on Function Call
```typescript
// Breaks whenever function is called
function myFunction() {
  debugger; // ← Add here
}
```

### Pattern 2: Conditional Logging
```typescript
// Only log when condition met
const users = await getUsers();
if (users.length === 0) {
  console.log('No users found'); // ← Breakpoint here
}
```

### Pattern 3: Watch Expression
```javascript
// In Watch section, add:
users.filter(u => u.active).length
// Updates whenever paused
```

### Pattern 4: Exception Debugging
```typescript
try {
  await riskyOperation();
} catch (error) {
  debugger; // ← Breaks on error
  console.error(error);
}
```

---

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Start Debugging | F5 |
| Stop Debugging | Shift+F5 |
| Step Over | F10 |
| Step Into | F11 |
| Step Out | Shift+F11 |
| Continue | F5 |
| Toggle Breakpoint | Ctrl+B |
| Run to Cursor | Ctrl+Shift+I |

---

## Troubleshooting

### Windows-Specific Issues

**Issue: "Cannot find module" or "program not found"**
```
✓ FIXED: Now uses runtimeExecutable: npm instead of direct binary paths
✓ Works on Windows, Mac, and Linux
✓ No path conversion needed
```

**Issue: "Chrome not found" when using "Debug with Browser"**
```
Solution:
1. Install Chrome/Chromium
2. Or manually navigate to http://localhost:3000
3. VS Code will still be able to attach debugger
```

**Issue: Port 3000 already in use**
```
Solution:
1. Find what's using it: netstat -ano | findstr :3000
2. Kill the process: taskkill /PID <PID> /F
3. Or use different port: npm run dev -- -p 3001
```

**Issue: Debugger doesn't connect**
```
Checklist:
1. ✓ Node version: node --version (should be ≥18.17.0)
2. ✓ npm install completed successfully
3. ✓ Dev server is running (check terminal)
4. ✓ Port 3000 is accessible (no firewall blocking)
5. ✓ No other instance running on port 3000
```

### General Debugging Issues

**Debugger doesn't break at breakpoints**
```
1. Check source maps are enabled: npm run build (watch for errors)
2. Verify file path is correct in breakpoint
3. Hard refresh browser (Ctrl+Shift+R)
4. Restart debugger (Stop, then F5)
5. Check file was modified (breakpoint shows after save)
```

**Tests don't stop at breakpoints**
```
1. Use "Vitest: Debug Tests" config (not npm test)
2. Don't run npm test separately
3. Restart debugger
4. Check test file exists and path is correct
```

**Chrome DevTools shows wrong source files**
```
Solution:
1. Force refresh: Ctrl+Shift+R (hard refresh)
2. Clear cache: DevTools → Application → Clear Storage
3. Rebuild: npm run build
4. Check sourceMapPathOverrides in launch.json
```

### Advanced Troubleshooting

**Debug console shows "undefined" for variables**
```
Possible causes:
1. Variable is out of scope (not accessible in current frame)
2. Variable was optimized away by compiler
3. Code path hasn't executed yet
4. Check Call Stack - click different frame to change scope
```

**Breakpoints work for server but not browser code**
```
1. Check that breakpoint is in client component (has 'use client')
2. Use "Next.js: Debug with Browser" config (not "Debug Server")
3. Open Chrome DevTools (F12) to see client console errors
4. Reload page after adding breakpoint
```

**Breakpoints work for client but not server code**
```
1. Check that breakpoint is in server code or server component
2. Use "Next.js: Debug Server" config
3. Check terminal for server errors
4. Restart debugger if file was modified
```

---

## Best Practices

✅ **DO:**
- Use conditional breakpoints to reduce pausing
- Watch expressions for complex objects
- Debug in isolated environments
- Test locally before production
- Use logpoints for high-frequency code

❌ **DON'T:**
- Leave `debugger` statements in production code
- Debug with "Automatically Attach" enabled always
- Use excessive breakpoints
- Debug production without backups
- Forget to remove sensitive data from console

---

## Next Steps

1. **Install Chrome Debugger Extension** (recommended):
   - Recommended in VS Code
   - Enables advanced Chrome debugging

2. **Configure Environment Variables**:
   - Create `.env.local` with debug settings
   - Use for controlling debug output

3. **Set Up CI/CD Debugging**:
   - GitHub Actions can run tests with debugging
   - Capture debugging info in logs

4. **Learn Advanced Features**:
   - Time-travel debugging with Playwright
   - Conditional breakpoints for performance
   - Watch expressions for complex state

---

**For more help, see:**
- [VS Code Debugging](https://code.visualstudio.com/docs/editor/debugging)
- [Next.js Debugging](https://nextjs.org/docs/pages/building-your-application/optimizing/debugging)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
