# Code Owners Setup Guide

## What is CODEOWNERS?

The `CODEOWNERS` file specifies which users or teams are responsible for code in a repository. When enabled in repository settings, GitHub will automatically request reviews from code owners when PRs touch their files.

## File Location

The `CODEOWNERS` file should be placed in:
- `.github/CODEOWNERS` ← **Recommended location**
- `CODEOWNERS` (root directory)
- `docs/CODEOWNERS`

GitHub searches in this order and uses the first one it finds.

## Current Configuration

Your `.github/CODEOWNERS` file specifies:

```
* @stacknan17012026
```

**This means:** stacknan17012026 is the code owner for all files in the repository.

## How to Enable in GitHub Repository Settings

### Step 1: Push the CODEOWNERS file
```powershell
git add .github/CODEOWNERS
git commit -m "chore: add CODEOWNERS file"
git push origin main
```

### Step 2: Go to Repository Settings
1. Go to your GitHub repository
2. Click **Settings** (top right)
3. Scroll left sidebar and find **Code and automation** section
4. Click **Branches**

### Step 3: Edit Main Branch Protection Rules
1. Click **Edit** on the main branch rule (or create one if it doesn't exist)
2. Scroll down to **Require a pull request before merging**

### Step 4: Enable Code Owner Review
Look for this option:
```
✓ Require review from Code Owners
  Require an approved review in pull requests including files with 
  a designated code owner.
```

Check this box! ✓

### Step 5: Additional Settings (Recommended)
While you're there, consider enabling:
- ✓ **Require pull request reviews before merging** (dismiss stale pull request approvals)
- ✓ **Require status checks to pass** (if you have CI/CD)
- ✓ **Require branches to be up to date before merging**

### Step 6: Save
Click **Save changes** at the bottom

---

## What Happens After Enabling

1. **When a PR is created** that modifies files with a code owner:
   - GitHub automatically requests review from @stacknan17012026
   - The PR cannot be merged without their approval

2. **Review request is sent** to stacknan17012026 via:
   - GitHub notification
   - Email (if enabled)

3. **stacknan17012026 can**:
   - Review the PR
   - Approve or request changes
   - Merge the PR once approved

4. **For ROSHANAZAR**:
   - Can still work on the repository
   - Can create and commit to PRs
   - But PRs require stacknan's approval before merging

---

## Customizing Code Ownership

### To add multiple owners:
```
# Multiple owners for same files
src/components/ @stacknan17012026 @ROSHANAZAR
```

### To assign different owners to different paths:
```
# General ownership
* @stacknan17012026

# Specific module ownership
src/components/ @stacknan17012026
src/lib/ @stacknan17012026
src/hooks/ @ROSHANAZAR

# Configuration files
*.config.* @stacknan17012026
tsconfig.json @stacknan17012026
```

### To use teams (if applicable):
```
* @stacknan17012026
src/ @your-org/backend-team
```

---

## CODEOWNERS Syntax

### Basic format:
```
path/to/file @username
path/to/directory/ @username
*.extension @username
```

### Examples:
```
# All files
* @stacknan17012026

# Specific directory
src/components/ @stacknan17012026

# Specific file
README.md @stacknan17012026

# Pattern matching
src/**/*.ts @stacknan17012026
tests/ @ROSHANAZAR

# Multiple owners
docs/ @stacknan17012026 @ROSHANAZAR
```

### Rules:
1. Last matching pattern wins (most specific wins)
2. Use full GitHub usernames (without @)
3. Use teams: `@org/team-name`
4. Comments: `# This is a comment`

---

## Current CODEOWNERS File

Your repository's `.github/CODEOWNERS`:

```
# Code Owners for this repository
# https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners

# Default owner for all files
* @stacknan17012026

# Source code owners
src/ @stacknan17012026
src/app/ @stacknan17012026
src/components/ @stacknan17012026
src/lib/ @stacknan17012026
src/hooks/ @stacknan17012026
src/config/ @stacknan17012026
src/types/ @stacknan17012026
src/middleware/ @stacknan17012026

# Configuration files
next.config.ts @stacknan17012026
tsconfig.json @stacknan17012026
tailwind.config.ts @stacknan17012026
eslint.config.mjs @stacknan17012026

# Build and CI/CD
.github/ @stacknan17012026
.github/workflows/ @stacknan17012026

# Testing
__tests__/ @stacknan17012026

# Package management
package.json @stacknan17012026
package-lock.json @stacknan17012026
```

---

## Verification

After pushing and enabling the setting:

1. **Test the setup**:
   - Create a test PR on a branch
   - Make a change to any file
   - Push and create a PR
   - You should see a review request for @stacknan17012026

2. **Verify CODEOWNERS is recognized**:
   - Go to PR files changed tab
   - You should see owners listed if CODEOWNERS is working

---

## References

- [GitHub CODEOWNERS Documentation](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
- [Branch Protection Rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule)
- [Dismissing Pull Request Reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/dismissing-a-pull-request-review)

---

## Troubleshooting

### CODEOWNERS not being recognized?
- Check file path: Should be `.github/CODEOWNERS`
- File must be committed and pushed to main branch
- Wait a few minutes for GitHub to recognize it
- Username must be spelled correctly

### Review request not appearing?
- Make sure branch protection rule is enabled
- Verify "Require review from Code Owners" is checked
- Check that modified files have a code owner assigned
- User must be a collaborator on the repo

### Need to bypass code owner review?
- Only repository admins can bypass
- Go to PR and click "Dismiss" on the review
- Not recommended for critical branches like main
