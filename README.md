This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Docs

My approchaing about this, is to fetch data form APi using `getStaticProps` and `getStaticPaths` to generate static pages, and then use `getServerSideProps` to fetch data from API and render the page on the server side.

## Learn More

The request are async and the data is fetched from the API, and then the data is passed to the component as props.
For the API, I used Bloom API


