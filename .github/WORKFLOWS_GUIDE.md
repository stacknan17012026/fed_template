# GitHub Workflows Documentation

## Automatic Tag Generation on PR Merge

This project includes automated GitHub Actions workflows that create version tags when pull requests are merged to the main branch.

### Available Workflows

#### 1. **tag-on-merge.yml** (Custom Implementation)
Custom workflow with semantic versioning logic.

**Features:**
- Automatically increments version on PR merge
- Supports semantic versioning (major.minor.patch)
- Label-based version bumping:
  - Add `major` label → Major version bump (v1.0.0 → v2.0.0)
  - Add `minor` label → Minor version bump (v1.0.0 → v1.1.0)
  - No label → Patch version bump (v1.0.0 → v1.0.1)
- Creates annotated Git tags
- Creates GitHub Releases
- Maintains full commit history

**How it works:**
1. PR is merged to `main` branch
2. Workflow runs automatically
3. Gets latest version tag
4. Determines version bump based on PR labels
5. Creates new tag (e.g., v1.2.3)
6. Pushes tag to repository
7. Creates GitHub Release

**To use:**
```yaml
# Add labels to your PR before merging:
- "patch"  (default, automatically applied)
- "minor"
- "major"
```

---

#### 2. **auto-tag-release.yml** (Third-party Action)
Uses `anothrNick/github-tag-action` for tag generation.

**Features:**
- Simple, reliable tag creation
- Automatic semantic versioning
- Creates GitHub Releases
- Works out of the box
- Less configuration needed

**How it works:**
1. PR is merged to `main` branch
2. Workflow triggered automatically
3. Creates semantic version tag (v1.0.0, v1.0.1, etc.)
4. Creates GitHub Release with the tag

**Default behavior:**
- Patch version bump on each merge (default)
- Can be customized with workflow configuration

---

### Workflow Triggers

Both workflows trigger on:
```yaml
pull_request:
  types:
    - closed  # When PR is merged/closed
  branches:
    - main    # Only on main branch
```

This means:
- ✅ Triggers when PR is **merged** to main
- ❌ Does NOT trigger when PR is just closed without merging
- ❌ Does NOT trigger when pushing directly to main

---

### Git Tag Format

Tags follow semantic versioning:
```
v0.1.0  (major.minor.patch)
v0.1.1
v0.2.0
v1.0.0
etc.
```

### Viewing Tags and Releases

**View all tags:**
```bash
git tag -l
```

**View specific tag:**
```bash
git show v1.0.0
```

**On GitHub:**
- Go to "Releases" tab to see all releases
- Each release corresponds to a tag

---

### Customization

#### Change version bump behavior:

**In tag-on-merge.yml:**
```yaml
# Modify the version bump logic in the "Determine version bump" step
# Currently: patch bump by default
# Options: major, minor, patch
```

**In auto-tag-release.yml:**
```yaml
DEFAULT_BUMP: patch  # Change to 'minor' or 'major' if desired
```

#### Change default version:
```bash
# Create initial tag manually:
git tag -a v1.0.0 -m "Initial release"
git push origin v1.0.0

# Subsequent merges will increment from this version
```

---

### Requirements

1. **Permissions:** Workflow needs `contents: write` permission
   - Already configured in both workflows
   - Automatically uses `GITHUB_TOKEN` secret

2. **Repository Settings:**
   - Go to Settings → Actions → General
   - Ensure "Read and write permissions" is enabled for workflows
   - Check "Allow GitHub Actions to create and approve pull requests" if needed

---

### Troubleshooting

**Workflow doesn't run:**
- Check if PR is actually merged (not just closed)
- Verify PR targets the `main` branch
- Check workflow is in `.github/workflows/` directory
- Review Actions tab for any errors

**Tag not created:**
- Verify repository has permissions enabled
- Check `GITHUB_TOKEN` is available
- Review workflow logs in Actions tab

**Wrong version:**
- Check for existing tags: `git tag -l`
- Remove incorrect tag: `git tag -d v1.0.0`
- Push update: `git push origin --delete v1.0.0`

---

### Example Workflow

1. Create feature branch from main
   ```bash
   git checkout -b feature/awesome-feature
   ```

2. Make changes and commit
   ```bash
   git add .
   git commit -m "feat: add awesome feature"
   ```

3. Push and create PR
   ```bash
   git push origin feature/awesome-feature
   ```

4. (Optional) Add label to PR for version bump
   - `major` for breaking changes
   - `minor` for new features
   - `patch` (or no label) for bug fixes

5. Merge PR to main

6. **Automatic:**
   - GitHub Actions runs
   - Creates new semantic version tag
   - Creates GitHub Release
   - Tag is pushed to repository

7. View the new release:
   - Go to GitHub repository
   - Click "Releases"
   - See latest version

---

### Which Workflow to Use?

| Aspect | tag-on-merge.yml | auto-tag-release.yml |
|--------|------------------|----------------------|
| Setup | More setup | Easy setup |
| Customization | Highly customizable | Limited options |
| Label support | Yes | No |
| Maintenance | Custom code | Third-party action |
| Reliability | Good | Proven/stable |

**Recommendation:**
- Use **auto-tag-release.yml** for simplicity
- Use **tag-on-merge.yml** if you need advanced label-based versioning

---

### Disable Workflow

To temporarily disable a workflow:
1. Remove or rename the file in `.github/workflows/`
2. Or add `if: false` to the job

---

### References

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Semantic Versioning](https://semver.org/)
- [anothrNick/github-tag-action](https://github.com/anothrNick/github-tag-action)
- [Create Release Action](https://github.com/actions/create-release)
