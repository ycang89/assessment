## Assumptions

1. The title of the results in the mock was not highlighted; therefore, it is assumed not to be part of the requirement.
2. It is assumed that the BeginOffset values in the Highlight object are always sorted in ascending order.
3. Pagination was not shown in the mock, so it is assumed not to be part of the requirement for this assessment.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Dependencies

### Install dependencies

```bash
# Ensure that you have at least Node v20.11.1 installed
yarn install
```

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Testing
Ensure that your application is running at http://localhost:3000 before executing the tests.

### Run both e2e tests and component tests in headless mode
```bash
yarn test
```

### Run component testing in headless mode
```bash
yarn cy:run:ct
```

### Run e2e testing in headless mode
```bash
yarn cy:run:e2e
```

### Run cypress test visually
```bash
yarn cy:open
```

## Learn More
To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

