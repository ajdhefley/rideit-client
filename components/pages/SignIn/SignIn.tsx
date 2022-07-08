import Link from 'next/link'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import { AuthFacebook } from '../../elements/AuthFacebook/AuthFacebook'
import { AuthGoogle } from '../../elements/AuthGoogle/AuthGoogle'
import classes from './SignIn.module.scss'
import { PageTitle } from '../../elements/PageTitle/PageTitle'
import { useRouter } from 'next/router'

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

        const client = new ApolloClient({
            uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
            cache: new InMemoryCache()
        })
    
        client.mutate({
            mutation: gql`
                mutation login($input: LoginInput!) {
                    login(loginData: $input) {
                        access_token
                    }
                }
            `,
            variables: {
                input: { username, password }
            }
        })
        .then(({ data }) => {
            // TODO: store access token
            console.log(data)
            router.push('/dashboard')
        })
        .catch((err) => {
            setPasswordError(true)
            setUsernameError(true)
            setValidationMessage('Invalid username/password.')
        })
    }
    
    return <>
        <PageTitle>Sign In</PageTitle>
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
        <p className={classes.center}>Don't have an account? Sign up <Link href="/signup"><a>here</a></Link>.</p>
    </>
}
