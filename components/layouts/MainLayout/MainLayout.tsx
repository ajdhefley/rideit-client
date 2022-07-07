import { NextPage } from 'next'
import classes from './MainLayout.module.scss'

/**
 * 
 **/
function MainLayout({ children }) {
    return <>
        <div className="app">
            <header>
                <div className={classes.headerContainer}>
                <div className={classes.headerTop}><a>top header</a></div>
                <div>bottom header</div>
                </div>
            </header>
            <main>
                <div className={classes.mainContent}>{children}</div>
            </main>
            <footer>
                <div className={classes.footerContainer}>footer</div>
            </footer>
        </div>
    </>
}

export function getMainLayout(page: NextPage, props?: { }) {
    console.log('get ma');
    return <MainLayout {...props}>{page}</MainLayout>
}
