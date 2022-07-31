import { NextResponse, NextRequest } from 'next/server'

export async function middleware(req) {
    const { nextUrl, cookies } = req
    const { pathname, origin, } = nextUrl
    const authCookie = cookies['auth']

    switch (pathname) {
        case '/':
            return NextResponse.redirect(`${origin}/signin`)

        case '/signin':
            if (authCookie && (await verifyToken(authCookie)).status == 200) {
                return NextResponse.redirect(`${origin}/dashboard`)
            }
            break;

        case '/account': 
        case '/profile':
            if (!authCookie || (await verifyToken(authCookie)).status != 200) {
                return NextResponse.redirect(`${origin}/signin`)
            }
            break;
    }

    return NextResponse.next()
}

async function verifyToken(token) {
    const verifyUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/account/token-validation/${token}`
    const verified = await fetch(verifyUrl, { credentials: 'include', method: 'POST' })
    return verified
}
