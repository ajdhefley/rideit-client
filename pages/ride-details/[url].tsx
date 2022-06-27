import moment from 'moment'
import { RideDetailsPage } from '../../components/views/RideDetails/RideDetails'

export default RideDetailsPage

export async function getStaticPaths() {
    // Pre-renders coaster page for each entry

    const res = await fetch('http://localhost:4040/coasters')
    const json = await res.json()

    return {
        paths: json.map(c => ({
            params: { url: c.Url.toString() }
        })),
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    // Pre-fetches coaster page details for each entry

    const res = await fetch(`http://localhost:4040/coasters/${params.url}`)
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
