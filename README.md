> ### Frontend web application (Next.js, React, GraphQL) for a roller coaster ranking platform.

----------

# Getting started

## Installation

Clone the repository:

    git clone https://github.com/ajdhefley/coaster-ranker-client

Open the repository folder:

    cd coaster-ranker-client
    
Install the dependencies:
    
    npm install

Build the application:
    
    npm run build

The [coaster-ranker-api](https://github.com/ajdhefley/coaster-ranker-api) is required to be running at build time to serve static rendering.
    
----------

## NPM scripts

- `npm run dev` - Run development server
- `npm run lint` - Run linter
- `npm run build` - Build application
- `npm start` - Start application

----------

## Environment variables

Next.js natively supports the use of environment variables with a `.env.local` file. (see more [here](https://nextjs.org/docs/basic-features/environment-variables))

- `NEXT_PUBLIC_API_URL` - The [coaster-ranker-api](https://github.com/ajdhefley/coaster-ranker-api) host serving data used for static and server/client side rendering

----------

## Start application

- `npm start`
- Requires [coaster-ranker-api](https://github.com/ajdhefley/coaster-ranker-api) to be running
      
