import { NextPage } from 'next'
import { PageTitle } from '../PageTitle/PageTitle'
import classes from './ProfilePage.module.scss'

/**
 * 
 **/
interface ProfilePageProps {

}

/**
 * Contains user preferences and account settings.
 **/
export const ProfilePage: NextPage<ProfilePageProps> = () => {
    return <>
        <PageTitle>Profile</PageTitle>
    </>
}
