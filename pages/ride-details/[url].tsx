import moment from 'moment'
import { RideDetailsPage } from '../../components/pages/RideDetails/RideDetails'

export default RideDetailsPage

/**
 * Determines all coaster detail pages, at build time.
 **/
export async function getStaticPaths() {
    const res = await fetch(`${process.env.API_URL}/coasters`)
    const json = await res.json()

    return {
        paths: json.map(c => ({
            params: { url: c.Url.toString() }
        })),
        fallback: false
    }
}

/**
 * Fetches static data and pre-renders each coaster detail page, at build time.
 **/
export async function getStaticProps({ params }) {
    const res = await fetch(`${process.env.API_URL}/coasters/${params.url}`)
    const json = await res.json()

    const age = (() => {
        const opened = moment(json.OpeningDate, json.OpeningDate.length == 4 ? 'YYYY' : 'MM/dd/YYYY')
        const closed = json.CloseDate ? moment(json.CloseDate, json.CloseDate.length == 4 ? 'YYYY' : 'MM/dd/YYYY') : moment()
        const duration = moment.duration(closed.diff(opened))
        return Math.floor(duration.asYears())
    })()

    return {
        props: {
            coaster: json,
            coasterAge: age
        }
    }
}
