# CI/CD Setup for Flutter Portfolio

This repository includes automated CI/CD workflows using GitHub Actions.

## Workflow Features

### On Pull Request to Main Branch:
- ✅ Code analysis with `flutter analyze`
- ✅ Run all tests with `flutter test`
- ✅ Build Flutter web application
- ✅ Upload build artifacts for testing
- ✅ Security vulnerability scanning
- ✅ Automatic PR comment with build status

### On Push to Main Branch:
- ✅ All PR checks plus automatic deployment to GitHub Pages

## Setup Instructions

### 1. Enable GitHub Pages
1. Go to your repository Settings
2. Navigate to "Pages" in the left sidebar
3. Under "Source", select "GitHub Actions"
4. Save the settings

### 2. Repository Permissions
Ensure the following permissions are enabled:
- Actions: Read and write permissions
- Contents: Read and write permissions
- Pages: Write permissions

### 3. Branch Protection (Recommended)
Set up branch protection rules for the `main` branch:
1. Go to Settings > Branches
2. Add rule for `main` branch
3. Enable:
   - Require status checks to pass before merging
   - Require branches to be up to date before merging
   - Select the "build-and-deploy" check

## Workflow Files

- `.github/workflows/deploy.yml` - Main CI/CD workflow

## Build Artifacts

For pull requests, build artifacts are automatically uploaded and available for 7 days. You can:
1. Download artifacts from the Actions tab
2. Test the build locally
3. Share with reviewers for testing

## Security

The workflow includes automated security scanning using `flutter pub audit` to check for known vulnerabilities in dependencies.

## Customization

You can customize the workflow by:
- Modifying Flutter version in the workflow file
- Adding additional test steps
- Configuring different deployment targets
- Adding environment-specific builds