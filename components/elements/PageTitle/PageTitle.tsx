import Head from 'next/head'

interface PageTitleProps {
    children: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ children }) => {
    return <>
        <Head>
            <title>{children} - RideIt</title>
        </Head>
    </>
}
