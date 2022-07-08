import { faBars, faMagnifyingGlass, faUser, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import classes from './MainLayout.module.scss'

/**
 * 
 **/
function MainLayout({ children }) {
    const [searchValue, setSearchValue] = useState('')
    const [searchFocused, setSearchFocused] = useState(false)
    const [searchClearVisible, setSearchClearVisible] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setSearchClearVisible(searchFocused && searchValue.length > 0)
    }, [searchValue])

    useEffect(() => {
        setSearchClearVisible(searchFocused && searchValue.length > 0)
    }, [searchFocused])

    function clearSearch() {
        setSearchValue('')
    }

    function executeSearch() {
        if (searchValue.length > 0) {
            router.push(`/search-results?q=${searchValue}`)
        }
    }

    return <>
        <div className="app">
            <header>
                <div className={classes.headerContainer}>
                    <div className={classes.headerMenuContainer}>
                        <div className={classes.headerMenuIcon}><FontAwesomeIcon icon={faBars} /></div>
                    </div>
                    <div className={classes.headerSearchContainer}>
                        {searchClearVisible && <div onClick={clearSearch} className={classes.searchCancel}>
                            <FontAwesomeIcon icon={faX} />
                        </div>}
                        <input type="text"
                            className={classes.headerSearchBar}
                            value={searchValue}
                            onKeyDown={(e) => e.keyCode == 13 ? executeSearch() : null}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onFocus={() => setSearchFocused(true)}
                            onBlur={() => setSearchFocused(false)} />
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
