
import { gql, useQuery } from '@apollo/client'
import { faStar, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { AsyncLoader } from '../AsyncLoader/AsyncLoader'
import { Separator } from '../Separator/Separator'
import classes from './CoasterReviewSummarySection.module.scss'

/**
 * 
 **/
interface CoasterReviewSummarySectionProps {
    /**
     * 
     **/
    coasterUrl: string;

    /**
     * 
     **/
    reviewTagLineMaxWidth?: number;
}

/**
 * 
 **/
export const CoasterReviewSummarySection: React.FC<CoasterReviewSummarySectionProps> = ({ coasterUrl, reviewTagLineMaxWidth = 100 }) => {
    const [reviewRatingAverage, setReviewRatingAverage] = useState<number>(0)
    const [reviewCount, setReviewCount] = useState<number>(0)
    const [reviewTags, setReviewTags] = useState<any[]>()
    const [loaded, setLoaded] = useState<boolean>(false)

    const { data } = useQuery(gql`
        query {
            reviews(coasterUrl: "${coasterUrl}") {
                title,
                body,
                rating,
                reviewTags {
                    tag
                }
            }
        }
    `)

    useEffect(() => {
        if (!data)
            return
            
        const reviews = [...data?.reviews]
        const dbReviewCount = reviews.length
        const dbReviewRatingAverage = reviews.reduce((sum, r) => sum + r.rating, 0) / dbReviewCount

        const dbReviewTags = {}
        reviews.forEach((review) => {
            review.reviewTags.forEach((reviewTag) => {
                dbReviewTags[reviewTag.tag] = (dbReviewTags[reviewTag.tag] || 0) + 1
            })
        })
        Object.keys(dbReviewTags).forEach((tag) => {
            dbReviewTags[tag] = Math.round(dbReviewTags[tag] / dbReviewCount * 100)
        })

        const dbReviewTagsList = Object.keys(dbReviewTags).map((tag) => Object.create({
            name: tag,
            value: dbReviewTags[tag]
        }))

        setReviewCount(dbReviewCount)
        setReviewRatingAverage(dbReviewRatingAverage)
        setReviewTags(dbReviewTagsList)
        setLoaded(true)
    }, [data])

    return <>
        {loaded && <>
            <div className={classes.ratingStatsContainer}>
                <FontAwesomeIcon icon={faStar} className={classes.icon} />
                {reviewCount > 0  && <>{reviewRatingAverage.toFixed(1)} <span className={classes.ratingStatsDescription}>out of 5</span></>}
                {reviewCount == 0 && <span className={classes.ratingStatsDescription}>&nbsp;No Ratings</span>}
                &nbsp;<Separator />&nbsp;
                <FontAwesomeIcon icon={faUser} className={classes.icon} /> {reviewCount} <span className={classes.ratingStatsDescription}>reviews</span>
            </div>
            <div className={classes.reviewTagContainer}>
                {reviewTags?.map((reviewTag) => (
                <div className={classes.reviewTag} key={reviewTag.name}>
                    <div className={classes.reviewTagName}>{reviewTag.name}</div>
                    <div className={classes.reviewTagPerc}>({reviewTag.value}%)</div>
                    <div className={classes.reviewTagLine} style={{ width: `${reviewTag.value / 100 * reviewTagLineMaxWidth}px` }}></div>
                </div>))}
            </div>
        </>}

        {!loaded && <div className={classes.async}>
            <div className={classes.ratingStatsContainer}>
                <FontAwesomeIcon icon={faStar} className={classes.icon} />
                <AsyncLoader size={4} />
                &nbsp;<Separator />&nbsp;
                <AsyncLoader size={3} />
            </div>
            <div className={classes.reviewTagContainer}>
                <div className={classes.reviewTag}><AsyncLoader size={12} /></div>
                <div className={classes.reviewTag}><AsyncLoader size={12} /></div>
                <div className={classes.reviewTag}><AsyncLoader size={12} /></div>
                <div className={classes.reviewTag}><AsyncLoader size={12} /></div>
                <div className={classes.reviewTag}><AsyncLoader size={12} /></div>
                <div className={classes.reviewTag}><AsyncLoader size={12} /></div>
            </div>
        </div>}
    </>
}
