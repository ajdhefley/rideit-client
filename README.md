Frontend web application [Next.js, React, GraphQL] for a roller coaster enthusiast platform. :roller_coaster:

To run RideIt locally, see [here](https://github.com/ajdhefley/rideit).

# Getting started

## Installation

Clone the repository:

    git clone https://github.com/ajdhefley/rideit-client

Open the repository folder:

    cd rideit-client
    
Install the dependencies:
    
    npm install

Build the application:
    
    npm run build

The [rideit-api](https://github.com/ajdhefley/rideit-api) is required to be running at build time for static site generation.
    
----------

## NPM scripts

| Name | Description |
| :--- | :--- |
| `npm run build` | Builds application |
| `npm start` | Starts application |
| `npm run dev` | Starts application in development mode (hot reloading and errors reported on client) |
| `npm run test` | Runs Cypress tests |
| `npm run lint` | Runs linter (static code analysis) |

----------

## Environment variables

Next.js natively supports development [environment variables](https://nextjs.org/docs/basic-features/environment-variables) with a `.env.local` file.

| Name | Description |
| :--- | :--- |
| `NEXT_PUBLIC_API_URL` | The [host](https://github.com/ajdhefley/rideit-api) serving data used for static site generation and server/client side rendering |

----------

## Start application

- `npm start`
- Requires [rideit-api](https://github.com/ajdhefley/rideit-api) to be running
