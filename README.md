# octopus-builder

A web-based ERP system developed for construction projects and contractors.

🔗 **Live Demo**: [https://lockn008.github.io/octopus-builder/](https://lockn008.github.io/octopus-builder/)

## Tech Stack

- **React 19** - Modern UI library
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Lockn008/octopus-builder.git
cd octopus-builder
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Build

Build the application for production:
```bash
npm run build
```

### Preview

Preview the production build:
```bash
npm run preview
```

### Linting

Run ESLint to check code quality:
```bash
npm run lint
```

## Deployment

This site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

- **Live URL**: [https://lockn008.github.io/octopus-builder/](https://lockn008.github.io/octopus-builder/)
- **Deployment**: Automated via GitHub Actions (see `.github/workflows/deploy.yml`)

### Manual Deployment

To deploy manually:
1. Ensure you have pushed your changes to the `main` branch
2. The GitHub Actions workflow will automatically build and deploy the site
3. Alternatively, trigger the workflow manually from the Actions tab in GitHub

## Project Structure

```
octopus-builder/
├── public/          # Static assets
├── src/             # Source code
│   ├── assets/      # Images, fonts, etc.
│   ├── App.jsx      # Main App component
│   ├── App.css      # App styles
│   ├── main.jsx     # Application entry point
│   └── index.css    # Global styles
├── index.html       # HTML template
├── package.json     # Dependencies and scripts
└── vite.config.js   # Vite configuration
```

## License

This project is private and proprietary.
