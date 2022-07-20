import { NextPage } from 'next'
import { PageTitle } from '../PageTitle/PageTitle'
import classes from './DashboardPage.module.scss'

/**
 * 
 **/
interface DashboardPageProps {

}

/**
 * 
 **/
export const DashboardPage: NextPage<DashboardPageProps> = () => {
    return <>
        <PageTitle>Dashboard</PageTitle>
        <div>Welcome to the Dashboard</div>
    </>
}
