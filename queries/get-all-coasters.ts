import { gql } from '@apollo/client';

export const GET_ALL_COASTERS = gql`{
    coasters {
        url
    }
}`