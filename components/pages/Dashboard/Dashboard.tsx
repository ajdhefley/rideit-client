import { NextPage } from 'next'
import { PageTitle } from '../../elements/PageTitle/PageTitle'
import classes from './Dashboard.module.scss'

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
