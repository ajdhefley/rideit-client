import { gql } from '@apollo/client';

export const GET_REVIEW_STATS_BY_URL = gql`
    query GetReviewStatsByUrl($coasterUrl: String!) {
        reviews(coasterUrl: $coasterUrl) {
            title,
            body,
            rating,
            reviewTags {
                tag
            }
        }
    }
`