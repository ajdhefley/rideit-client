import moment from 'moment'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { RideDetailsPage } from '../../components/pages/RideDetails/RideDetails'
import { getMainLayout } from '../../components/layouts/MainLayout/MainLayout';

RideDetailsPage.getLayout = getMainLayout

export default RideDetailsPage

/**
 * Determines all coaster detail pages, at build time.
 **/
export async function getStaticPaths() {
    const client = new ApolloClient({
        uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
        cache: new InMemoryCache()
    })

    const { data } = await client.query({
        query: gql`
            query {
                coasters {
                    url
                }
            }
        `
    })

    return {
        paths: data.coasters.map(c => ({
            params: { url: c.url.toString() }
        })),
        fallback: false
    }
}

/**
 * Fetches static data and pre-renders each coaster detail page, at build time.
 **/
export async function getStaticProps({ params }) {
    const client = new ApolloClient({
        uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
        cache: new InMemoryCache()
    })

    const { data } = await client.query({
        query: gql`
            query {
                coaster(url: "${params.url}") {
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
                    outsideSeatsPerRow
                }
                coasterImages(coasterUrl: "${params.url}") {
                    imageUrl,
                    base64
                }
            }
        `
    })

    const coaster = { ...data.coaster, imgList: data.coasterImages }

    const coasterAge = (() => {
        const opened = moment(data.coaster.openingDate, data.coaster.openingDate.length == 4 ? 'YYYY' : 'MM/dd/YYYY')
        const closed = data.coaster.closeDate ? moment(data.coaster.closeDate, data.coaster.closeDate.length == 4 ? 'YYYY' : 'MM/dd/YYYY') : moment()
        const duration = moment.duration(closed.diff(opened))
        return Math.floor(duration.asYears())
    })()

    return {
        props: {
            coaster,
            coasterAge
        }
    }
}
