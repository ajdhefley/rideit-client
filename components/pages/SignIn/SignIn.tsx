import Link from 'next/link'
import { NextPage } from 'next'
import { useState } from 'react'
import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import { AuthFacebook } from '../../elements/AuthFacebook/AuthFacebook'
import { AuthGoogle } from '../../elements/AuthGoogle/AuthGoogle'
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
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function signIn() {
        const client = new ApolloClient({
            uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
            cache: new InMemoryCache()
        })
    
        const { data } = await client.mutate({
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

        console.log(data)
    }
    
    return <>
        <div className={classes.formContainer}>
            <div className={classes.formInner}>
                <h2 className={classes.center}>Sign In</h2>

                <div className={classes.formFieldContainer}>
                    <label className={classes.formLabel}>Username</label>
                    <input type="text" className={classes.formInput} value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className={classes.formFieldContainer}>
                    <label className={classes.formLabel}>Password</label>
                    <input type="password" className={classes.formInput} value={password} onChange={(e) => setPassword(e.target.value)} />
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


