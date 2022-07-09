import Head from 'next/head';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { Coaster } from '../../../models/Coaster'
import classes from './SearchResults.module.scss'
import { PageTitle } from '../../elements/PageTitle/PageTitle';

/**
 * 
 **/
interface SearchResultsPageProps {
    /**
     * 
     **/
    coasters: Coaster[];
}

/**
 * 
 **/
export const SearchResultsPage: NextPage<SearchResultsPageProps> = ({ coasters }) => {
    const router = useRouter()

    return <>
        <PageTitle>{router.query['q'] as string}</PageTitle>
        <div className={classes.sidePanel} style={{ width: '66.66%' }}>
            {coasters.map((coaster) => (
                <Link key={coaster.coasterId} href={`/ride-details/${coaster.url}`}>
                    <a className={classes.searchResult}>
                        <div className={classes.searchResultImg}>
                            <Image
                                className={classes.pic} src={coaster.imgList[0].imageUrl} blurDataURL={coaster.imgList[0].base64}
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
        <div className={classes.sidePanel} style={{ width: '33.33%', background: '#aaa', position: 'fixed' }}>
            map here
        </div>
    </>
}
