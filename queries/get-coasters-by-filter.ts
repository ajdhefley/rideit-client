import { gql } from '@apollo/client';

export const GET_COASTERS_BY_FILTER = gql`
    query GetCoastersByFilter($filter: String!) {
        filteredCoaster(filter: $filter) {
            name,
            park,
            type,
            model,
            openingDate,
            manufacturer,
            heightInFt,
            dropInFt,
            lengthInFt,
            speedInMph,
            inversions,
            colorPrimary,
            colorSecondary,
            url,
            carsPerTrain,
            rowsPerCar,
            insideSeatsPerRow,
            outsideSeatsPerRow,
            images {
                imageUrl,
                base64
            }
        }
    }
`