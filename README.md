## Introduction

Final Project for CIS 7000: Interactive Reading. 

- built with Next.js (frontend), FastAPI (backend)

### Papers Referenced

Fok, Raymond, Hita Kambhamettu, Luca Soldaini, Jonathan Bragg, Kyle Lo, Marti Hearst, Andrew Head, and Daniel S. Weld. "Scim: Intelligent skimming support for scientific papers." In Proceedings of the 28th International Conference on Intelligent User Interfaces, pp. 476-490. 2023.

Kim, Tae Soo, Matt Latzke, Jonathan Bragg, Amy X. Zhang, and Joseph Chee Chang. "Papeos: Augmenting Research Papers with Talk Videos." In Proceedings of the 36th Annual ACM Symposium on User Interface Software and Technology, pp. 1-19. 2023.

## How It Works

The Python/FastAPI server is mapped into to Next.js app under `/api/`.

This is implemented using [`next.config.js` rewrites](https://github.com/digitros/nextjs-fastapi/blob/main/next.config.js) to map any request to `/api/:path*` to the FastAPI API, which is hosted in the `/api` folder.

On localhost, the rewrite will be made to the `127.0.0.1:8000` port, which is where the FastAPI server is running.

In production, the FastAPI server is hosted as [Python serverless functions](https://vercel.com/docs/concepts/functions/serverless-functions/runtimes/python) on Vercel.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The FastApi server will be running on [http://127.0.0.1:8000](http://127.0.0.1:8000) – feel free to change the port in `package.json` (you'll also need to update it in `next.config.js`).
