import Link from 'next/link'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AuthFacebook } from '../../elements/AuthFacebook/AuthFacebook'
import { AuthGoogle } from '../../elements/AuthGoogle/AuthGoogle'
import { PageTitle } from '../../elements/PageTitle/PageTitle'
import { LoadingIndicator } from '../../elements/LoadingIndicator/LoadingIndicator'
import classes from './SignIn.module.scss'

/**
 * 
 **/
interface SignInPageProps {

}

/**
 * 
 **/
export const SignInPage: NextPage<SignInPageProps> = () => {
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [validationMessage, setValidationMessage] = useState('Error')

    useEffect(() => setUsernameError(false), [username])
    useEffect(() => setPasswordError(false), [password])

    function signIn() {
        if (username.length == 0) {
            setUsernameError(true)
            return setValidationMessage('Username is required.')
        }

        if (password.length == 0) {
            setPasswordError(true)
            return setValidationMessage('Password is required.')
        }

        setLoading(true)

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/account/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include'
            })
            .then((res) => {
                switch (res.status) {
                    case 200:
                        return res.json()
                    case 401:
                    case 403:
                    case 404:
                        throw new Error('Invalid username/password.')
                    default:
                        throw new Error('There was a problem contacting the server. Please try again later.')
                }
            })
            .then((res) => {
                router.push('/dashboard').then(() => setLoading(false))
            })
            .catch((err) => {
                setLoading(false)
                setPasswordError(true)
                setUsernameError(true)
                setValidationMessage(err.message)
            })
    }
    
    return <>
        <PageTitle>Sign In</PageTitle>
        {loading && <LoadingIndicator />}
        <div className={classes.validationMessage} style={{ visibility: usernameError || passwordError ? 'visible' : 'hidden' }}>
            {validationMessage}
        </div>
        <div className={classes.formContainer}>
            <div className={classes.formInner}>
                <h2 className={classes.center}>Sign In</h2>

                <div className={classes.formFieldContainer}>
                    <label className={classes.formLabel}>Username</label>
                    <input type="text"
                        className={classes.formInput}
                        value={username}
                        style={{ borderColor: usernameError ? 'red' : 'initial' }}
                        onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className={classes.formFieldContainer}>
                    <label className={classes.formLabel}>Password</label>
                    <input type="password"
                        className={classes.formInput}
                        value={password}
                        style={{ borderColor: passwordError ? 'red' : 'initial' }}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button className={`${classes.center} ${classes.signinButton}`} onClick={signIn}>Sign In</button>
                
                <p className={`${classes.center} ${classes.orDivider}`}>&mdash; OR &mdash;</p>
                <AuthGoogle />
                <AuthFacebook />
            </div>
        </div>
        <p className={classes.center}>Don&apos;t have an account? Sign up <Link href="/signup"><a>here</a></Link>.</p>
    </>
}
