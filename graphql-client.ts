import { ApolloClient, InMemoryCache } from '@apollo/client'

export const PublicGraphQLClient = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
    cache: new InMemoryCache()
})
console.log(process.env.NEXT_SERVER_API_URL)
export const ServerGraphQLClient = new ApolloClient({
    uri: `${process.env.NEXT_SERVER_API_URL}/graphql`,
    cache: new InMemoryCache()
})