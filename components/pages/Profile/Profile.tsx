import { NextPage } from 'next'
import { PageTitle } from '../../elements/PageTitle/PageTitle'
import classes from './Profile.module.scss'

/**
 * 
 **/
interface ProfilePageProps {

}

/**
 * 
 **/
export const ProfilePage: NextPage<ProfilePageProps> = () => {
    return <>
        <PageTitle>Profile</PageTitle>
    </>
}
