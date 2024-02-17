# FenAster Recs

This project hosts the games recommendations list for Fenrir and Aster aka "iamyourmagician".

It is built in React, bundled with Vite, and written primarily in TypeScript. It uses Supabase for storing and loading data, and supports mock calls via JSON-server instance.

# Deploying Locally

Install dependencies using the following command

`npm install`

and run it locally using

`npm run dev`

The app expects game data as an array with this schema:

```
Game {
  id: number;
  title: string;
  genre: string;
  msrp: string;
  recBy: string;
  recTo: string;
  isSeconded: boolean | null;
  userScore: string;
  hasEnglishVO: string | boolean | null;
  notes: string;
  storeLink: string | null;
  wasCompleted: boolean;
  vodLink: string;
  isAuthorized: boolean;
}
```
