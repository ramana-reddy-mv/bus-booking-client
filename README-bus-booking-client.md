# Bus Booking Client

A responsive web frontend for the Bus Booking System, built with React
and Vite. The application is being developed as a web-first experience
for searching bus trips and, over time, managing seat selection,
bookings, and customer journeys.

## Project Status

**Version:** V1 --- In development

The current UI includes a bus-search experience with sample trip data.
Backend integration and additional customer workflows are being
developed incrementally.

## Technology Stack

-   **React**
-   **Vite**
-   **JavaScript**
-   **CSS**
-   **Material UI (MUI)** for UI components
-   **React Router** for client-side navigation
-   **Fetch API** for HTTP requests as backend integration is added

Check `package.json` for the exact dependency versions and available
scripts.

## Prerequisites

-   Node.js (use a current LTS release compatible with the project's
    Vite version)
-   npm

Verify your installation:

``` bash
node --version
npm --version
```

## Getting Started

### 1. Clone the repository

``` bash
git clone https://github.com/ramana-reddy-mv/bus-booking-client.git
cd bus-booking-client
```

### 2. Install dependencies

``` bash
npm install
```

### 3. Start the development server

``` bash
npm run dev
```

Vite prints the local development URL in the terminal, usually:

``` text
http://localhost:5173
```

Open the URL shown in your terminal.

## Available Scripts

Common Vite scripts are:

``` bash
npm run dev       # Start the local development server
npm run build     # Build the production bundle
npm run preview   # Preview the production build locally
```

These scripts assume they are defined in `package.json`. Run `npm run`
to see the scripts configured in this repository.

## Project Structure

The project is organized by pages, reusable components, data, and API
services. The exact structure may evolve as features are added.

``` text
bus-booking-client/
├── public/
├── src/
│   ├── assets/       # Images and other static assets
│   ├── components/   # Shared and feature-specific UI components
│   ├── data/         # Sample or temporary data
│   ├── pages/        # Page-level components
│   ├── services/     # API calls and backend integration
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

Your local project may contain additional files or a slightly different
structure.

## Backend Integration

The companion backend repository is `bus-booking-system`, built with
Spring Boot and PostgreSQL.

For local development, the backend currently runs on:

``` text
http://localhost:8080
```

Swagger UI:

``` text
http://localhost:8080/swagger-ui/index.html
```

When connecting the frontend to the backend, keep the API base URL in
one place (for example, in `src/services/`) and use a Vite environment
variable such as:

``` text
VITE_API_BASE_URL=http://localhost:8080
```

Create a local `.env` file if your code reads this variable, and do not
commit secrets or private credentials. Only variables prefixed with
`VITE_` are exposed to browser-side code, so never place secrets in
them.

## Development Roadmap

-   [x] Initial React/Vite frontend
-   [x] Initial bus-search UI with sample data
-   [ ] Connect bus search to backend APIs
-   [ ] Display live trip results and fares
-   [ ] Build trip details and seat-selection UI
-   [ ] Add registration and login screens
-   [ ] Integrate authenticated customer booking flows
-   [ ] Add booking history and cancellation UI
-   [ ] Improve loading, empty, and error states
-   [ ] Add responsive and accessibility checks

Roadmap items reflect the intended direction; update the checklist as
features are completed.

## Development Workflow

1.  Install dependencies with `npm install`.
2.  Start the backend if working on API integration.
3.  Run the frontend with `npm run dev`.
4.  Test UI flows in the browser.
5.  Run `npm run build` before committing significant changes.
6.  Update this README when setup or scripts change.

## License

No license has been specified yet. All rights are reserved unless a
license is added to this repository.
