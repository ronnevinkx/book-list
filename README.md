# Book List

A TypeScript React CRUD app with GraphQL. A Node.js backend provides data through Mongoose and GraphQL.

## Client Technologies

-   React
-   TypeScript
-   Apollo Client with `useQuery` and `useMutation` hooks
-   Material UI
-   React Masonry CSS

## Backend Technologies

-   GraphQL
-   Node.js
-   Mongoose

## Installation

1. Clone repo, cd into folder
2. Install server and client dependencies: `npm i && cd client npm i`
3. Fill in `.env` according to `.env.example`
4. Start both client and server in dev mode: `npm run dev`

## Scripts

| Description                  | Command          | Value                                                |
| ---------------------------- | ---------------- | ---------------------------------------------------- |
| Start server                 | `npm run start`  | `node server.js`                                     |
| Start server with Nodemon    | `npm run server` | `nodemon server.js`                                  |
| Start client                 | `npm run client` | `npm start --prefix client`                          |
| Start both client and server | `npm run dev`    | `concurrently \"npm run server\" \"npm run client\"` |

## Notes

Based on [this](https://www.youtube.com/playlist?list=PL4cUxeGkcC9iK6Qhn-QLcXCXPQUov1U7f) NetNinja tutorial, but with the following adjustments:

-   TypeScript
-   Hooks instead of higher order components
-   Functional components instead of class components
-   MongoDB Atlas instead of mLabs
-   Edit and delete functionality
-   Add author functionality
-   Responsive layout with Material UI and React Masonry CSS

## Issues

When deleting from `BookDetail`: `Warning: Can't perform a React state update on an unmounted component.`
Solved by using `useLazyQuery` instead of `useQuery` in `Home` component.

## Material UI Docs

https://material-ui.com/
