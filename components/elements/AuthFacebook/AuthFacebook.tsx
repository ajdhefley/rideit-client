import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Script from 'next/script'
import ReactFacebookLoginWithButton from 'react-facebook-login';
import classes from './AuthFacebook.module.scss'

/**
 * 
 **/
interface AuthFacebookProps {

}

/**
 * 
 **/
export const AuthFacebook: React.FC<AuthFacebookProps> = () => {
    return <>
        <ReactFacebookLoginWithButton
            appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
            autoLoad={true}
            fields="name,email,picture"
            textButton="Sign in with Facebook"
            icon={<FontAwesomeIcon icon={faFacebook} />}
            cssClass={classes.fbButton}
             />
    </>
}
