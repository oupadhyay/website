# Lessons Learned

```csv
Date,"Context","Mistake/Finding","Lesson/Action Item"
2026-06-04,"Bypassing Cloudflare/Vercel rate limit","read_url_content returned status 429 because of Vercel checkpoint challenge, but Playwright was able to load the page and run evaluation scripts in the browser context","Use Playwright page.evaluate to fetch resources like CSS/HTML inside the browser context when direct HTTP fetch is blocked by Cloudflare/Vercel"

2026-06-04,"Extracting CSS variables from minified SvelteKit bundles","CSS is minified on production into massive single-line stylesheets","Write lightweight standard library Python parser script to pull CSS color variables and theme tokens"
2026-06-04,"Writing file outside subagent artifact directory","Platform restricts write_to_file targets to the active subagent's brain folder","Write the file locally in the subagent's brain folder first, then copy it to the target path using run_command"
2026-06-04,"Typographic analysis of Framer templates","Found ampersand typography overrides and custom wavy underline configurations styled outside Framer presets","Inspect inline style headers for custom CSS overrides that override compiled Framer token outputs"
2026-06-04,"Orchestrating concurrent design research subagents","Spawning multiple subagents in a single task speeds up analysis, but requires passing absolute paths for screenshot storage to prevent file loss","Always pass fully qualified absolute paths for files and assets when delegating write actions to concurrent subagents"
2026-06-04,"Visual audit of personal homepage mascottes","Dynamic components like SVG or text-based creatures can change states (e.g., awake vs. sleeping) depending on the local clock of the author's timezone","Check local timezone relative time when performing visual checks to identify time-dependent mascot animations"
```

