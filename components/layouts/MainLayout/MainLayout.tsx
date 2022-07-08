import { faBars, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import classes from './MainLayout.module.scss'

/**
 * 
 **/
function MainLayout({ children }) {
    const [searchValue, setSearchValue] = useState('')
    const router = useRouter()

    function executeSearch() {
        router.push(`/search-results?q=${searchValue}`)
    }

    return <>
        <div className="app">
            <header>
                <div className={classes.headerContainer}>
                    <div className={classes.headerMenuContainer}>
                        <div className={classes.headerMenuIcon}><FontAwesomeIcon icon={faBars} /></div>
                    </div>
                    <div className={classes.headerSearchContainer}>
                        <input type="text" className={classes.headerSearchBar} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                        <button className={classes.headerSearchButton} onClick={executeSearch}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                    <div className={classes.headerAccountContainer}>
                        <div className={classes.headerAccountIcon}><FontAwesomeIcon icon={faUser} /></div>
                    </div>
                </div>
            </header>
            <main>
                <div className={classes.mainContent}>{children}</div>
            </main>
            <footer>
                <div className={classes.footerContainer}>
                    <ul>
                        <li><a>About</a></li>
                        <li><a>Terms</a></li>
                        <li><a>Contact</a></li>
                    </ul>
                    <p>&copy; 2022 Ashton Hefley. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    </>
}

export function getMainLayout(page: NextPage, props?: { }) {
    return <MainLayout {...props}>{page}</MainLayout>
}
