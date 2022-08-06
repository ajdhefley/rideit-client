import Head from 'next/head'

interface PageTitleProps {
    children: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ children }: PageTitleProps) => {
    return <>
        <Head>
            <title>{children} - RideIt</title>
        </Head>
    </>
}
