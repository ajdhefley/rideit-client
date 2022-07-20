import Script from 'next/script'
import classes from './AuthGoogle.module.scss'

/**
 * 
 **/
interface AuthGoogleProps {

}

/**
 * Sign In With Google button for third-party authentication.
 **/
export const AuthGoogle: React.FC<AuthGoogleProps> = () => {
    return <>
        <Script src="https://accounts.google.com/gsi/client" async defer />
        <div id="g_id_onload"
            data-client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
            data-login_uri={`${process.env.NEXT_PUBLIC_API_URL}/oauth/google`}
            data-auto_prompt="false">
        </div>
        <div className="g_id_signin"
            data-type="standard"
            data-size="large"
            data-theme="outline"
            data-text="sign_in_with"
            data-shape="rectangular"
            data-logo_alignment="left">
        </div>
    </>
}
