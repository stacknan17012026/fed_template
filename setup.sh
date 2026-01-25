#!/bin/bash

# Production-Grade Next.js 16 Folder Structure
# This script creates a complete, enterprise-ready folder structure

mkdir -p src/app/{marketing,app/{dashboard,settings},api/{auth,v1}}
mkdir -p src/components/{ui,layouts,forms,providers}
mkdir -p src/lib/{api,auth,db,utils,validations}
mkdir -p src/hooks/{queries,mutations}
mkdir -p src/styles
mkdir -p src/config
mkdir -p src/types
mkdir -p src/constants
mkdir -p src/middleware
mkdir -p public/{images,icons,fonts}
mkdir -p __tests__/{unit,integration,e2e}
mkdir -p .github/workflows

# Create placeholder files to ensure directories are tracked
touch src/app/(marketing)/.keep
touch src/app/(app)/.keep
touch src/app/(app)/dashboard/.keep
touch src/app/(app)/settings/.keep
touch src/app/api/.keep
touch src/components/ui/.keep
touch src/components/layouts/.keep
touch src/components/forms/.keep
touch src/components/providers/.keep
touch src/lib/api/.keep
touch src/lib/auth/.keep
touch src/lib/db/.keep
touch src/lib/utils/.keep
touch src/lib/validations/.keep
touch src/hooks/queries/.keep
touch src/hooks/mutations/.keep
touch src/styles/.keep
touch src/config/.keep
touch src/types/.keep
touch src/constants/.keep
touch src/middleware/.keep
touch public/images/.keep
touch public/icons/.keep
touch __tests__/unit/.keep
touch __tests__/integration/.keep
touch __tests__/e2e/.keep

echo "✅ Production-grade Next.js folder structure created successfully!"
echo ""
echo "📁 Created structure:"
echo "  src/app/           - Routes & Pages (App Router)"
echo "  src/components/    - React Components"
echo "  src/lib/           - Utilities & Business Logic"
echo "  src/hooks/         - Custom React Hooks"
echo "  src/types/         - TypeScript Definitions"
echo "  src/config/        - Configuration"
echo "  src/constants/     - Constants"
echo "  src/styles/        - CSS Files"
echo "  public/            - Static Assets"
echo "  __tests__/         - Test Files"
echo ""
echo "📚 Read these files next:"
echo "  1. PROJECT_STRUCTURE.md"
echo "  2. FOLDER_GUIDE.md"
echo "  3. BEST_PRACTICES.md"
echo "  4. IMPLEMENTATION_CHECKLIST.md"
echo ""
echo "✨ Happy coding!"
