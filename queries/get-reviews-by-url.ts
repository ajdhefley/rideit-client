import { gql } from '@apollo/client';

export const GET_REVIEWS_BY_URL = gql`
    query GetReviewsByUrl($coasterUrl: String!) {
        reviews(coasterUrl: $coasterUrl) {
            title,
            body,
            rating,
            timestamp,
            reviewTags {
                tag
            },
            author {
                username
            }
        }
    }
`