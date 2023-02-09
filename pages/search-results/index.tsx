import { getMainLayout } from '../../layouts/MainLayout/MainLayout'
import { SearchResultsPage } from '../../components/SearchResultsPage/SearchResultsPage'
import { ServerGraphQLClient } from '../../graphql-client'
import { GET_COASTERS_BY_FILTER } from '../../queries/get-coasters-by-filter'

SearchResultsPage.getLayout = getMainLayout

export default SearchResultsPage

/**
 * Load search results before the page is rendered so they
 * can be displayed with the rest of the content on page load.
 **/
export async function getServerSideProps({ query }) {
    const { data, error } = await ServerGraphQLClient.query({
        query: GET_COASTERS_BY_FILTER,
        variables: { filter: query.q }
    })

    return {
        props: { coasters: data?.filteredCoaster ?? [] }
    }
}
