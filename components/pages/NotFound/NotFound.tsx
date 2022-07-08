import { NextPage } from 'next'
import { PageTitle } from '../../elements/PageTitle/PageTitle'
import classes from './NotFound.module.scss'

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
