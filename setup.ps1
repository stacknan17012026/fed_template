# PowerShell script to create production-grade Next.js 16 folder structure
# Windows Version

function Create-Folders {
    param(
        [string[]]$Paths
    )
    
    foreach ($path in $Paths) {
        if (-not (Test-Path $path)) {
            New-Item -ItemType Directory -Path $path -Force | Out-Null
            Write-Host "✓ Created: $path" -ForegroundColor Green
        }
    }
}

# Array of all folders to create
$folders = @(
    # App Router
    'src\app\(marketing)',
    'src\app\(app)\dashboard',
    'src\app\(app)\settings',
    'src\app\api\auth',
    'src\app\api\v1',
    
    # Components
    'src\components\ui',
    'src\components\layouts',
    'src\components\forms',
    'src\components\providers',
    
    # Library
    'src\lib\api',
    'src\lib\auth',
    'src\lib\db',
    'src\lib\utils',
    'src\lib\validations',
    
    # Hooks
    'src\hooks\queries',
    'src\hooks\mutations',
    
    # Configuration
    'src\styles',
    'src\config',
    'src\types',
    'src\constants',
    'src\middleware',
    
    # Public & Tests
    'public\images',
    'public\icons',
    'public\fonts',
    '__tests__\unit',
    '__tests__\integration',
    '__tests__\e2e',
    
    # CI/CD
    '.github\workflows'
)

Write-Host ""
Write-Host "Creating production-grade Next.js 16 folder structure..." -ForegroundColor Cyan
Write-Host ""

Create-Folders $folders

# Create placeholder .keep files
foreach ($folder in $folders) {
    $keepFile = Join-Path $folder '.keep'
    if (-not (Test-Path $keepFile)) {
        New-Item -ItemType File -Path $keepFile -Force | Out-Null
    }
}

Write-Host ""
Write-Host "✅ Folder structure created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📁 Created structure:" -ForegroundColor Cyan
Write-Host "   src/app/           - Routes & Pages (App Router)"
Write-Host "   src/components/    - React Components"
Write-Host "   src/lib/           - Utilities & Business Logic"
Write-Host "   src/hooks/         - Custom React Hooks"
Write-Host "   src/types/         - TypeScript Definitions"
Write-Host "   src/config/        - Configuration"
Write-Host "   src/constants/     - Constants"
Write-Host "   src/styles/        - CSS Files"
Write-Host "   public/            - Static Assets"
Write-Host "   __tests__/         - Test Files"
Write-Host ""
Write-Host "📚 Read these files next:" -ForegroundColor Cyan
Write-Host "   1. PROJECT_STRUCTURE.md"
Write-Host "   2. FOLDER_GUIDE.md"
Write-Host "   3. BEST_PRACTICES.md"
Write-Host "   4. IMPLEMENTATION_CHECKLIST.md"
Write-Host "   5. GETTING_STARTED.md"
Write-Host ""
Write-Host "✨ Happy coding!" -ForegroundColor Magenta
