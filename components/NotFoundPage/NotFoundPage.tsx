import { NextPage } from 'next'
import { PageTitle } from '../PageTitle/PageTitle'
import classes from './NotFoundPage.module.scss'

/**
 * 
 **/
interface NotFoundPageProps {

}

/**
 * 
 **/
export const NotFoundPage: NextPage<NotFoundPageProps> = () => {
    return <>
        <PageTitle>Requested Resource Not Found</PageTitle>
    </>
}
