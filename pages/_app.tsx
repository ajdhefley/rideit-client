import Head from 'next/head'
import { ApolloProvider } from '@apollo/client'
import { PublicGraphQLClient } from '../graphql-client'

import '../styles/_globals.scss'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

export default function App({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page)

    return getLayout(
        <ApolloProvider client={PublicGraphQLClient}>
            <div className="app">
                <Head>
                    <meta name="description" content="RideIt is the number one place to look up, review, and rank roller coasters." />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300&family=Nunito:wght@400&family=Kanit:wght@600&display=swap" rel="stylesheet" />
                </Head>
                <Component {...pageProps} />
            </div>
        </ApolloProvider>
    )
}
