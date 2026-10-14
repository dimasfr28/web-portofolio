# Portfolio Website - Dimas Firmansyah

Single-page portfolio built with React (Create React App). It has an experience timeline, a project gallery with photo, video and PDF viewing, an achievements panel, an AI chat assistant (RAG + Groq) and a contact form (EmailJS).

## Quick start

```bash
npm install
cp .env.example .env     # then fill in the keys
npm start                # http://localhost:3000
npm run build            # production build into build/
```

Node version is pinned in `.nvmrc`. Restart `npm start` after editing `.env`; Create React App only reads it at startup.

## Environment variables

| Variable | Used for |
|---|---|
| `REACT_APP_GROQ_API_KEY` | AI chat assistant |
| `REACT_APP_GROQ_MODEL` | Optional chat model (default `qwen/qwen3.8-27b`) |
| `REACT_APP_EMAILJS_SERVICE_ID` | Contact form |
| `REACT_APP_EMAILJS_TEMPLATE_ID` | Contact form |
| `REACT_APP_EMAILJS_PUBLIC_KEY` | Contact form |

`REACT_APP_*` values are bundled into the browser build, so anyone can read them. Use a Groq key with a usage limit. On Netlify, set the same variables under Site settings, Environment variables.

The EmailJS template must use the variables `{{name}}`, `{{email}}`, `{{message}}` and `{{time}}`.

## Editing content

All page content lives in one file: `src/data/portfolio.js`.

| Section | Array | Notes |
|---|---|---|
| Experience | `experiences` | Newest first; `media` is the photo gallery |
| Projects | `rawProjects` | Newest first; the first project of the current filter is the featured card; numbers are automatic |
| Achievements | `achievements`, `achievementRows`, `certCards` | Rows are the main-page list, `achievements` feeds the modal |

Media helpers: `photos(dir, [files])`, `video(dir, file)`, `pdf(dir, file)` and `{ type: 'youtube', id }`.

Counts in the About section and tab labels are calculated from this data.

## Assets

```
public/assets/
  branding/     logos (navbar, favicon source)
  profile/      portrait used in the hero
  experience/   one folder per experience: logo + photos
  project/      one folder per project: photos, videos, PDFs
  achievement/  certificate images
public/rag/     text files the chatbot answers from
```

## AI chat assistant

`src/utils/documentLoader.js` reads `public/rag/experience.txt`, `projects.txt` and `achievement.txt` (one entry per blank-line-separated block). `src/services/retrieval.js` ranks entries with TF-IDF and a title boost, and `src/services/ragService.js` sends the best matches to Groq. After changing portfolio content, update these text files too, otherwise the chatbot keeps answering from old information.

## Project structure

```
src/
  App.jsx            page layout
  App.css            all styles
  data/portfolio.js  content
  sections/          Nav, Hero, About, Experience, Projects, Achievements, ContactPanel, Footer, ui
  services/          ragService.js, retrieval.js
  utils/             documentLoader.js, css.js
netlify/functions-disabled/   server-side chat functions, not deployed (rename to netlify/functions to enable)
```

## Deployment

Netlify: build command `npm run build`, publish directory `build` (already set in `netlify.toml`). The config sets `X-Frame-Options: SAMEORIGIN`, which the PDF viewer in the project modal needs.
