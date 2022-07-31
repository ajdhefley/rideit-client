import { gql } from '@apollo/client'
import { getMainLayout } from '../../layouts/MainLayout/MainLayout'
import { SearchResultsPage } from '../../components/SearchResultsPage/SearchResultsPage'
import { GraphQLClient } from '../../graphql-client'

SearchResultsPage.getLayout = getMainLayout

export default SearchResultsPage

/**
 * Load search results before the page is rendered so they
 * can be displayed with the rest of the content on page load.
 **/
export async function getServerSideProps({ query }) {
    const { data, error } = await GraphQLClient.query({
        query: gql`{
            filteredCoaster(filter: "${query.q}") {
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
        }`
    })

    return {
        props: { coasters: data?.filteredCoaster ?? [] }
    }
}
