import Head from 'next/head'
import { PageTitleProps } from './PageTitle.props'

export const PageTitle: React.FC<PageTitleProps> = ({ children }: PageTitleProps) => {
    return <>
        <Head>
            <title>{children} - RideIt</title>
        </Head>
    </>
}
