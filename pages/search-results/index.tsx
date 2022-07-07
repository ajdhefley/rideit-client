import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import { getMainLayout } from '../../components/layouts/MainLayout/MainLayout'
import { SearchResultsPage } from '../../components/pages/SearchResults/SearchResults'

SearchResultsPage.getLayout = getMainLayout

export default SearchResultsPage

/**
 * Load search results before the page is rendered so they
 * can be displayed with the rest of the content on page load.
 **/
export async function getServerSideProps({ query }) {
    const client = new ApolloClient({
        uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
        cache: new InMemoryCache()
    })

    const { data } = await client.query({
        query: gql`
            query {
                coasterFilter(name: "${query.q}") {
                    Name,
                    Park,
                    Type,
                    Model,
                    OpeningDate,
                    Manufacturer,
                    HeightInFt,
                    DropInFt,
                    LengthInFt,
                    SpeedInMph,
                    Inversions,
                    ColorPrimary,
                    ColorSecondary,
                    Url,
                    CarsPerTrain,
                    RowsPerCar,
                    InsideSeatsPerRow,
                    OutsideSeatsPerRow,
                    ImgList {
                        CoasterId,
                        ImageUrl,
                        Base64
                    }
                }
            }
        `
    })

    return {
        props: {
            coasters: data.coasterFilter
        }
    }
}
