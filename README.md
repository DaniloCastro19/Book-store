# Book Store

A React-based web application for browsing and managing books. The application integrates with the Google Books API to search and display book information, and supports user authentication for features like wishlists and loan management.

## Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd book-store
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Copy the example environment file and configure it:
   ```bash
   cp src/env/environment.example.ts src/env/environment.development.ts
   ```
   
   Edit `src/env/environment.development.ts` and add your configuration:
   ```typescript
   export const env = {
       booksAPIKey: "YOUR_GOOGLE_BOOKS_API_KEY",
       APIVolumesURl: "https://www.googleapis.com/books/v1/volumes",
       APIbaseUrl: "YOUR_BACKEND_API_URL"
   }
   ```
   
   To get a Google Books API key:
   1. Go to [Google Cloud Console](https://console.cloud.google.com/)
   2. Create a new project
   3. Enable the Books API
   4. Create credentials (API key)

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build the production application |
| `npm run lint` | Run ESLint to check code quality |
| `npm run preview` | Preview the production build locally |
| `npm run test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |

## Running the Project

### Development Mode
```bash
npm run dev
```
This starts the Vite development server with hot module replacement (HMR). Open http://localhost:5173 in your browser.

### Production Build
```bash
npm run build
```
This compiles TypeScript and builds the application for production. The output will be in the `dist` folder.

### Preview Production Build
```bash
npm run preview
```
This serves the production build locally for testing.

## Project Structure

```
book-store/
├── src/
│   ├── core/           # Core functionality (services, hooks, models)
│   ├── env/            # Environment configuration
│   ├── modules/        # Feature modules
│   ├── shared/         # Shared components
│   ├── styles/         # Global styles
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── public/             # Static assets
├── dist/               # Production build output
├── package.json        # Dependencies and scripts
├── vite.config.ts      # Vite configuration
└── tsconfig.json       # TypeScript configuration
```

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Sass** - CSS preprocessor
- **Bootstrap / React Bootstrap** - UI components
- **Jest** - Testing framework
