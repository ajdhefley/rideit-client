import { NextPage } from 'next'
import { PageTitle } from '../PageTitle/PageTitle'
import classes from './NotFoundPage.module.scss'

/**
 * 
 **/
interface NotFoundPageProps {

}

/**
 * Automatically displayed for unresolvable URLs.
 **/
export const NotFoundPage: NextPage<NotFoundPageProps> = () => {
    return <>
        <PageTitle>Requested Resource Not Found</PageTitle>
    </>
}
