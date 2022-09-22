import { NextPage } from 'next'
import { PageTitle } from '../PageTitle/PageTitle'
import classes from './NotFoundPage.module.scss'

/**
 * Automatically displayed for unresolvable URLs.
 **/
export const NotFoundPage: NextPage = () => {
    return <>
        <PageTitle>Requested Resource Not Found</PageTitle>
    </>
}
