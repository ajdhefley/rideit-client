
import { gql, useQuery } from '@apollo/client'
import { faComment, faStar, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { AsyncLoader } from '../AsyncLoader/AsyncLoader'
import { Separator } from '../Separator/Separator'
import classes from './CoasterReviewSummaryMiniSection.module.scss'

/**
 * 
 **/
interface CoasterReviewSummaryMiniSectionProps {
    /**
     * 
     **/
    coasterUrl: string;
}

/**
 * 
 **/
export const CoasterReviewSummaryMiniSection: React.FC<CoasterReviewSummaryMiniSectionProps> = ({ coasterUrl }) => {
    const [loaded, setLoaded] = useState(false)
    const [commentCount, setCommentCount] = useState<number>(0)
    const [reviewCount, setReviewCount] = useState<number>(0)
    const [reviewRatingAverage, setReviewRatingAverage] = useState<number>(0)

    const reviewQuery = useQuery(gql`
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

    const commentQuery = useQuery(gql`
        query {
            comments(coasterUrl: "${coasterUrl}") {
                body,
                timestamp
            }
        }
    `)
    const rank = 13 // TODO

    useEffect(() => {
        if (!commentQuery.data)
            return
            
        setCommentCount(commentQuery.data.comments.length)
        setLoaded(reviewQuery.data && commentQuery.data)
    }, [commentQuery])

    useEffect(() => {
        if (!reviewQuery.data)
            return
            
        setReviewCount(reviewQuery.data.reviews.length)
        setReviewRatingAverage(reviewQuery.data.reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount)
        setLoaded(reviewQuery.data && commentQuery.data)
    }, [reviewQuery])

    function scrollToRatings() {
        document.getElementById('ratingsContainer')?.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }

    function scrollToComments() {
        document.getElementById('commentsContainer')?.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }

    return <>
        {loaded && <>
            <span className={classes.titleSmall} title={`Rated ${reviewRatingAverage.toFixed(1)} out of 5`} onClick={scrollToRatings}>
                <FontAwesomeIcon icon={faStar} className={classes.icon} /> {reviewRatingAverage.toFixed(1)} 
            </span>
            <span className={classes.titleSmall} title={`Based on ${reviewCount} ratings`} onClick={scrollToRatings}>
                <FontAwesomeIcon icon={faUser} className={classes.icon} /> {reviewCount}
            </span>
            <span className={classes.titleSmall} title={`${commentCount} comments`} onClick={scrollToComments}>
                <FontAwesomeIcon icon={faComment} className={classes.icon} /> {commentCount}
            </span>
            <span className={classes.titleSmall}>
                <Separator /> <a>Ranked #{rank}</a>
            </span>
            {/* { coaster.goldenTicketAwards!! &&
            <span className={classes.titleSmall}>
                <Separator /> <a>Won {coaster.goldenTicketAwards} awards</a>
            </span>} */}
            <div style={{ float: 'right' }}>
                <a>Share</a>
            </div>
            <div style={{ clear: 'both' }}></div>
        </>}

        {!loaded && <>
            <AsyncLoader size={15} />
        </>}
    </>
}
