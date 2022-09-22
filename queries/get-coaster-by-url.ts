import { gql } from '@apollo/client';

export const GET_COASTER_BY_URL = gql`
    query GetCoasterByUrl($coasterUrl: String!) {
        coaster(url: $coasterUrl) {
            name,
            park,
            location,
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
                base64,
                width,
                height
            }
        }
    }
`