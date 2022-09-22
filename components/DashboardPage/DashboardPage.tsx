import { NextPage } from 'next'
import { PageTitle } from '../PageTitle/PageTitle'
import classes from './DashboardPage.module.scss'

/**
 * Displays most recent reviews, comments, and uploaded images.
 **/
export const DashboardPage: NextPage = () => {
    return <>
        <PageTitle>Dashboard</PageTitle>
        <div>Welcome to the Dashboard</div>
    </>
}
