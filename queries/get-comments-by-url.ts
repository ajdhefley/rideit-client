import { gql } from '@apollo/client';

export const GET_COMMENTS_BY_URL = gql`
    query GetCommentsByUrl($coasterUrl: String!) {
        comments(coasterUrl: $coasterUrl) {
            body,
            timestamp
        }
    }
`