import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

/**
 * 
 **/
interface SignInRedirectPageProps {

}

/**
 * 
 **/
export const SignInRedirectPage: NextPage<SignInRedirectPageProps> = () => {
    const router = useRouter()

    useEffect(() => {
        if (router.query.code) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/oauth/google/token?code=${router.query.code}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                router.push('/dashboard')
            })
            .catch((err) => {
                router.push('/signin')
            })
        }
    }, [router.query.code])

    return <>
        <p>Signing you in...</p>
    </>
}

export default SignInRedirectPage
