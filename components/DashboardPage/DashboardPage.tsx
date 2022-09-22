import { NextPage } from 'next'
import { PageTitle } from '../PageTitle/PageTitle'
import { PageDescription } from '../PageDescription/PageDescription'
import classes from './DashboardPage.module.scss'

/**
 * 
 **/
interface DashboardPageProps {

}

/**
 * Displays most recent reviews, comments, and uploaded images.
 **/
export const DashboardPage: NextPage = ({}: DashboardPageProps) => {
    return <>
        <PageTitle>Dashboard</PageTitle>
        <div>Welcome to the Dashboard</div>
    </>
}
