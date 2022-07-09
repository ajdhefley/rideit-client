import { gql } from '@apollo/client'
import { getMainLayout } from '../../components/layouts/MainLayout/MainLayout'
import { SearchResultsPage } from '../../components/pages/SearchResults/SearchResults'
import { GraphQLClient } from '../../graphql-client'

SearchResultsPage.getLayout = getMainLayout

export default SearchResultsPage

/**
 * Load search results before the page is rendered so they
 * can be displayed with the rest of the content on page load.
 **/
export async function getServerSideProps({ query }) {
    const { data } = await GraphQLClient.query({
        query: gql`
            query {
                coasterFilter(name: "${query.q}") {
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
    })

    return {
        props: { coasters: data.coasterFilter }
    }
}
