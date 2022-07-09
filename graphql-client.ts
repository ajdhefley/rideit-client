import { ApolloClient, InMemoryCache } from '@apollo/client'

export const GraphQLClient = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
    cache: new InMemoryCache()
})