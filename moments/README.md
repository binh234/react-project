# Moments - Social video sharing platform

[![Live](demo/live_button.png)](https://next-moments.vercel.app/)

![homepage](demo/homepage.png)

Moments is a modern Social Media Website developed using React, Nextjs, TypeScript, and Sanity (database). This application includes the ability to upload, publish, share, comment on, and like videos; filter by categories and advanced search functionalities, profile pages, suggested accounts, custom responsive design, and much more. The user data is secure by default using [`next-auth`](https://next-auth.js.org/getting-started/introduction) session promoted with many OAuth services like Google/GitHub.

**Technologies**:

- Next.js, TypeScript, Tailwind CSS, Zustand, next-auth, OAuth2, JWT, GraphQL
- Database: [Sanity](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)

**Features**:

- [x] Simple but secure login with Google/GitHub OAuth
- [x] Suggested users using suggest pool
- [x] Full security with next-auth session
- [x] Drag and drop video uploading
- [x] Upload new post
- [x] Update/Delete existing post (post's owner only)
- [x] Markdown supported for post content
- [x] Like functionality
- [x] View post comments
- [x] Real-time comment
- [x] Search functionality
- [x] View profile
- [x] Lazy loading
- [x] Infinite loading
- [x] Various APIs for fetching data
- [x] Mobile responsive

## Demo

Post detail page:
![Detail](demo/post_detail.png)

Profile detail page:
![Profile](demo/profile_page.png)

Upload post:
![Drag](demo/drag_video.png)
![Markdown](demo/mardown_content.png)

Search page:
![search](demo/search_page.png)

**Mobile device**:

![MobileHome](demo/surface_homepage.png)
![MobileProfile](demo/mobile_profile_page.png)

## APIs

`GET https://next-moments.vercel.app/api/hello`

`GET https://next-moments.vercel.app/api/comment/{id}`

`GET https://next-moments.vercel.app/api/discover/{topic}`

`GET https://next-moments.vercel.app/api/post`

`GET https://next-moments.vercel.app/api/post/{id}`

`GET https://next-moments.vercel.app/api/profile/{id}`

`GET https://next-moments.vercel.app/api/profile/liked/{id}`

`GET https://next-moments.vercel.app/api/profile/video/{id}`

`GET https://next-moments.vercel.app/api/search/{searchTerm}`

`GET https://next-moments.vercel.app/api/suggested-user`

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Setting up enviroment variables

First, create a secret key for your application. You can quickly create a good value via this `openssl` command.

```bash
openssl rand -base64 32
```

For all the enviroment variables required, see `.env.sample` file

## Start development

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [https://next-moments.vercel.app/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
