# IntelSphere Client

## Netlify SPA & API Mock Setup

This project uses Netlify Functions to mock backend API endpoints required by the dashboard and AI interfaces. This ensures the UI always renders, even without a backend.

### SPA Routing
- All routes are redirected to `/index.html` for client-side routing (Vite SPA best practice).

### API Endpoints
- All `/api/*` requests are proxied to Netlify Functions in `netlify/functions/`.
- Example endpoints implemented:
  - `/api/navigation-config`
  - `/api/revolutionary-ai`
  - `/api/model-status`
  - `/api/health`

### Extending for Production
- Replace or extend the mock Netlify Functions with real backend logic or proxy to your backend.
- For more endpoints, add new files to `netlify/functions/` following the same pattern.

### Local Development
- Use `netlify dev` to run the SPA and functions locally.

---

For more, see the main project README or Netlify docs. 