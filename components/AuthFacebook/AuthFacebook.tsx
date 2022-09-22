import Script from 'next/script'
import ReactFacebookLoginWithButton from 'react-facebook-login'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import classes from './AuthFacebook.module.scss'

/**
 * Sign In With Facebook button for third-party authentication.
 **/
export const AuthFacebook: React.FC = () => {
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
