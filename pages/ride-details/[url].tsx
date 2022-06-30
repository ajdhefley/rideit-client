import moment from 'moment'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { RideDetailsPage } from '../../components/pages/RideDetails/RideDetails'

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
                    Url
                }
            }
        `
    })

    return {
        paths: data.coasters.map(c => ({
            params: { url: c.Url.toString() }
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

    const age = (() => {
        const opened = moment(data.coaster.OpeningDate, data.coaster.OpeningDate.length == 4 ? 'YYYY' : 'MM/dd/YYYY')
        const closed = data.coaster.CloseDate ? moment(data.coaster.CloseDate, data.coaster.CloseDate.length == 4 ? 'YYYY' : 'MM/dd/YYYY') : moment()
        const duration = moment.duration(closed.diff(opened))
        return Math.floor(duration.asYears())
    })()

    return {
        props: {
            coaster: data.coaster,
            coasterAge: age
        }
    }
}
