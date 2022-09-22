import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { useState } from 'react'
import { PageTitle } from '../PageTitle/PageTitle'
import { LoadingIndicator } from '../LoadingIndicator/LoadingIndicator'
import classes from './SearchResultsPage.module.scss'
import { SearchResultsPageProps } from './SearchResultsPage.props'

/**
 * Displays results for query entered into header search bar.
 **/
export const SearchResultsPage: NextPage = ({ coasters }: SearchResultsPageProps) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    function clickResult() {
        setLoading(true)
        router.events.on('routeChangeComplete', () => setLoading(false))
    }

    return <>
        <PageTitle>{router.query['q'] as string}</PageTitle>
        {loading && <LoadingIndicator />}
        <div className={classes.searchContainer}>
            {coasters.length == 0 && <p>No results found.</p>}
            {coasters.map((coaster) => (
                <Link key={coaster.coasterId} href={`/ride-details/${coaster.url}`}>
                    <a onClick={clickResult} className={classes.searchResult}>
                        <div className={classes.searchResultImg}>
                            <Image
                                className={classes.pic} src={coaster.images[0].imageUrl} blurDataURL={coaster.images[0].base64}
                                placeholder="blur" 
                                layout="fill"
                                width={250}
                                height={250}
                            />
                        </div>
                        <div className={classes.searchResultText}>
                            <div className={classes.searchResultTitle}>{coaster.name}</div>
                            <div className={classes.searchResultSubTitle}>{coaster.park}</div>
                        </div>
                    </a>
                </Link>
            ))}
        </div>
    </>
}
