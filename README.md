# Michelin-starred restaurants we've visited so far

## Description
After a few Michelin-starred restaurants we were interested in collecting all the pictures, bill info and our evaluation in one place.
A first-world problem, I know 😃.

At the same time, Astro came out with version 1.0, and I decided to give it a try and do some front-end development after a long break.

This project is built using [Astro](https://astro.build), [Tailwind CSS](https://tailwindcss.com/) and hosting on Cloudflare Pages. Airtable is used as a CMS, and n8n is used for a sprinkle of automation.
Images are hosted in imagekit.io. Mapbox is used as a replacement for Google Maps.
Lastly, a slightly modified https://github.com/ngshiheng/michelin-my-maps repo is used to scrape the Michelin homepage for all restaurants to add to statistics.

## Usage

All commands are run from the root of the project, from a terminal:

| Command                | Action                                             |
| :--------------------- | :------------------------------------------------- |
| `yarn install`          | Installs dependencies                              |
| `yarn run dev`          | Starts local dev server at `localhost:3000`        |
| `yarn run build`        | Build your production site to `./dist/`            |
| `yarn run preview`      | Preview your build locally, before deploying       |
| `yarn run astro ...`    | Run CLI commands like `astro add`, `astro preview` |
| `yarn run astro --help` | Get help using the Astro CLI                       |
