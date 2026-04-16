# LocalVR Sales Tech Stack

Sales team launcher and tooling hub.

## Tech Stack
- Vite, TypeScript
- Tailwind CSS

## Commands
- `npm run dev` — start dev server
- `npm run build` — production build


---

<!-- AUTO-GENERATED: Operational docs from runbook-generator. Do not edit above this line. -->

## Production URL
https://localvr-sales-tech-stack.railway.app (Railway)
https://sales.localvr.com (Vercel, likely)

## Who uses it
Sales team launcher. Sam and LocalVR sales reps access it daily to jump into 15+ internal tools across prospecting, intelligence, performance, enablement, and deal management categories.

## Deploy

### Railway
```bash
railway up --detach
```

### Vercel (alternative)
```bash
npx vercel --prod
```

Railway and Vercel both auto-deploy on `git push origin main` if configured.

### Manual Railway dashboard deploy
When Railway CLI fails with TLS errors (active incidents), use the Redeploy button in the Railway dashboard browser UI.

## Failure modes

### Railway CLI TLS BadRecordMac error on deploy
**Symptom:**
```
railway up --detach
Error: tls: bad record MAC
```
**Root cause:** Railway platform incident or API instability blocking CLI connection.
**Fix:**
1. Check Railway status page for active incidents.
2. Update Railway CLI: `npm install -g @railway/cli@latest`
3. Retry deploy: `railway up --detach`
4. If still failing, use Railway dashboard browser UI to click Redeploy.

**Note:** Browser-based dashboard deploy often works when CLI is blocked.

### TypeScript errors after removing app cards
**Symptom:**
```
'Router' is declared but its value is never read
```
**Root cause:** Removed app card from UI but didn't clean up corresponding lucide-react icon import.
**Fix:**
1. Check App.tsx for unused imports.
2. Remove orphaned icon imports from lucide-react.
3. Run `npx tsc --noEmit` to verify.

### Stale UI after code push (old app cards visible)
**Symptom:** Old app URLs, descriptions, or layout visible after deploying new code.
**Root cause:** Browser caching static assets. Project uses static HTML/JS with no automatic cache busting.
**Fix:**
1. Hard-refresh browser: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows).
2. If serving via Railway/Vercel, redeploy to force CDN cache invalidation.
3. Consider adding cache-control headers or query-string versioning to index.html script tags.

## Known gotchas
- Lucide React icons are imported as React components (icon: React.ElementType), not SVG files.
- Railway config expects `npm run start` script in package.json, but current package.json has no start script. Works because Railway auto-detects Vite build. If Railway deploy fails, add: `"start": "npx serve dist -s -l $PORT"` to scripts.
- App URLs span multiple platforms (Railway, Vercel, Replit). When any linked app moves hosts, must update URL in App.tsx apps array and redeploy this launcher.
- Desktop layout uses CSS grid with xl: grid-cols-5 breakpoint for true 5-column rows. Mobile/tablet use flex flex-col stacking. Mixing grid-cols-N with flex-col across breakpoints causes misalignment.
- All app tiles hardcoded in App.tsx. No CMS or external data source. Any changes require code edit + redeploy.
- comingSoon: true flag in AppTile disables link and shows "Coming Soon" badge. When enabling, remove flag and add real URL.
- Tailwind min-h-[176px] required on card containers to prevent vertical misalignment in grid.

## Session references
Sessions synthesized: 15
Most recent: 2026-04-13T22:21:35.688Z

## Maintenance Plan

**Review cadence:** every 90 days

### Weekly
- [ ] Verify all app links in launcher still resolve (apps may redeploy to new domains without notice).

### Quarterly
- [ ] Audit app URLs in App.tsx against live deployment URLs for each linked tool (Railway, Vercel, Replit).
- [ ] Review app card descriptions and use cases for accuracy. Sales team needs change; tool capabilities evolve.
- [ ] Check for new internal tools to add to launcher (coordinate with Sam on sales tooling roadmap).

### Upgrade triggers
- When Node.js LTS changes major version, update engines field in package.json.
- When Vite releases breaking changes (check Vite blog for migration guides).
- When lucide-react icon names change (check release notes if icons fail to render).
- When Railway or Vercel change static site deployment requirements (check platform docs).

### Known technical debt
- No automated cache busting for static assets. Browser caching causes stale UI after deploys. Add query-string versioning (?v=N) to script/style tags in index.html.
- package.json missing `start` script that railway.json expects. Works now due to Railway auto-detection, but fragile. Add explicit start script.
- App URLs hardcoded in App.tsx. Any linked app that redeploys requires manual code edit + redeploy. Consider env vars or external config for URLs.
- No health check endpoint. Can't programmatically verify launcher is serving correct app links.
- Card alignment logic brittle across responsive breakpoints. Future grid changes risk misalignment.

### Next review
Due: 2026-07-13
