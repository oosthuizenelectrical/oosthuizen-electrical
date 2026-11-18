# Oosthuizen Solar and Electrical website

Static site for https://oosthuizenelectrical.co.za, hosted on Cloudflare Workers.

- All pages live in `public/`
- `wrangler.jsonc` tells Cloudflare to serve the `public` folder
- Clean addresses: `/ev-charging` serves `public/ev-charging.html`

## Caching note
CSS, JS and fonts are cached by browsers for a year. After editing `css/style.css` or `js/main.js`,
change the `?v=` number on their links in every HTML page so visitors get the new version.
