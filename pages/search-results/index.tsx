import { SearchResultsPage } from '../../components/pages/SearchResults/SearchResults'

export default SearchResultsPage

/**
 * Load search results before the page is rendered so they
 * can be displayed with the rest of the content on page load.
 **/
export async function getServerSideProps({ query }) {
    const q = query['q']
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coasters?filter=${q}`)
    const json = await res.json()

    return {
        props: {
            coasters: json
        }
    }
}
