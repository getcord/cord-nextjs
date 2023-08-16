
![image](https://github.com/getcord/cord-remix/assets/529333/70205e83-79b3-44cf-9f30-3d34bd4ab8c1)
# Welcome to Next.js + Cord!

[Cord](https://www.cord.com) adds collaboration to your product in under an hour. Our SDK helps you re-imagine your app with a rich, real-time collaboration experience - in minutes, not months.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
It integrates [Cord](https://www.cord.com).
- [Cord Docs](https://docs.cord.com)
- [Next.js Docs](https://nextjs.org/docs)

This template follows [the cord integration guide](https://docs.cord.com/get-started/integration-guide) and adds page presence and a thread.
You can add more [components](https://docs.cord.com/components).

## Install
From your terminal, create a next.js + cord app:
```bash
npx create-next-app@latest --example https://github.com/getcord/cord-nextjs
```
And then `cd` into the new folder.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/(cord)/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Differences with normal next.js bootstrapped template

1. We've added a [Route Group](https://nextjs.org/docs/app/building-your-application/routing/route-groups) (`(cord)`) and moved the index page under it (`(cord).page.tsx`): The layout (`(cord).layout.tsx`) sets up collaboration for all nested routes.
2. The index route shows the [page presence](https://docs.cord.com/components/cord-page-presence) and a [thread](https://docs.cord.com/components/cord-thread): two very common collaboration features.
3. We've added an [Route Handler](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) for handling our [events webhooks](https://docs.cord.com/reference/events-webhook). You want to run our own code when a message is added or a notification is added? This is where you can do it.
4. When laoding the page, we randomly pick a user; having more than one user is necessary to truly showcase collaboration. You will want to replace this with your own authentication.

### Getting a Cord key
Cord requires a key to operate.
You can get a sample application key easily via the [console](https://console.cord.com) in the Getting Started section.
