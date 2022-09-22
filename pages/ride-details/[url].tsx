import moment from 'moment'
import { gql } from '@apollo/client'
import { RideDetailsPage } from '../../components/RideDetailsPage/RideDetailsPage'
import { getMainLayout } from '../../layouts/MainLayout/MainLayout'
import { ServerGraphQLClient } from '../../graphql-client'

RideDetailsPage.getLayout = getMainLayout

export default RideDetailsPage

/**
 * Determines all coaster detail pages, at build time.
 **/
export async function getStaticPaths() {
    const { error, data } = await ServerGraphQLClient.query({
        query: gql`{
            coasters {
                url
            }
        }`
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
    const { error, data } = await ServerGraphQLClient.query({
        query: gql`{
            coaster(url: "${params.url}") {
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
                rank,
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
        }`
    })

    const age = (() => {
        const opened = moment(data.coaster.openingDate, data.coaster.openingDate.length == 4 ? 'YYYY' : 'MM/dd/YYYY')
        const closed = data.coaster.closeDate ? moment(data.coaster.closeDate, data.coaster.closeDate.length == 4 ? 'YYYY' : 'MM/dd/YYYY') : moment()
        const duration = moment.duration(closed.diff(opened))
        return Math.floor(duration.asYears())
    })()

    return {
        props: {
            coaster: data.coaster,
            coasterAge: age
        },
        revalidate: 3600 // Re-render page every hour (once requested)
    }
}
