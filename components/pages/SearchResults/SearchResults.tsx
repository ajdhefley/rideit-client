import Head from 'next/head';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { CoasterPageModel } from '../../../models/CoasterPageModel'
import classes from './SearchResults.module.scss'

/**
 * 
 **/
interface SearchResultsPageProps {
    /**
     * 
     **/
    coasters: CoasterPageModel[];
}

/**
 * 
 **/
export const SearchResultsPage: NextPage<SearchResultsPageProps> = ({ coasters }) => {
    const router = useRouter()

    return <>
        <Head>
            <title>{router.query['q']} - RideIt</title>
        </Head>
        <div className={classes.sidePanel} style={{ width: '66.66%' }}>
            {coasters.map((coaster) => (
                <Link key={coaster.CoasterId} href={`/ride-details/${coaster.Url}`}>
                    <a className={classes.searchResult}>
                        <div className={classes.searchResultImg}>
                            <Image
                                className={classes.pic} src={coaster.ImgList[0].ImageUrl} blurDataURL={coaster.ImgList[0].Base64}
                                placeholder="blur" 
                                layout="fill"
                                width={250}
                                height={250}
                            />
                        </div>
                        <div className={classes.searchResultText}>
                            <div className={classes.searchResultTitle}>{coaster.Name}</div>
                            <div className={classes.searchResultSubTitle}>{coaster.Park}</div>
                        </div>
                    </a>
                </Link>
            ))}
        </div>
        <div className={classes.sidePanel} style={{ width: '33.33%', background: '#aaa', position: 'fixed' }}>
            map here
        </div>
    </>
}
