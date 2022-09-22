import moment from 'moment'
import { RideDetailsPage } from '../../components/RideDetailsPage/RideDetailsPage'
import { getMainLayout } from '../../layouts/MainLayout/MainLayout'
import { ServerGraphQLClient } from '../../graphql-client'
import { GET_ALL_COASTERS } from '../../queries/get-all-coasters'
import { GET_COASTER_BY_URL } from '../../queries/get-coaster-by-url'

RideDetailsPage.getLayout = getMainLayout

export default RideDetailsPage

/**
 * Determines all coaster detail pages, at build time.
 **/
export async function getStaticPaths() {
    const { error, data } = await ServerGraphQLClient.query({
        query: GET_ALL_COASTERS
    })

    return {
        paths: data.coasters.map(coaster => ({
            params: { url: coaster.url.toString() }
        })),
        fallback: false
    }
}

/**
 * Fetches static data and pre-renders each coaster detail page, at build time.
 **/
export async function getStaticProps({ params }) {
    const { error, data } = await ServerGraphQLClient.query({
        query: GET_COASTER_BY_URL,
        variables: { coasterUrl: params.url }
    })

    const { coaster } = data
    const { openingDate, closeDate } = coaster

    let opened = moment(openingDate, openingDate.length == 4 ? 'YYYY' : 'MM/dd/YYYY')
    let closed = closeDate ? moment(closeDate, closeDate.length == 4 ? 'YYYY' : 'MM/dd/YYYY') : moment()
    let duration = moment.duration(closed.diff(opened))
    const coasterAge = Math.floor(duration.asYears())

    return {
        revalidate: 3600, // Re-render page every hour
        props: { coaster, coasterAge }
    }
}
