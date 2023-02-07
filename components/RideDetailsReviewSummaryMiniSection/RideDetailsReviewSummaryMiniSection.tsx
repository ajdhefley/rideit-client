
import { useQuery } from '@apollo/client'
import { faComment, faShare, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { GET_COMMENTS_BY_URL } from '../../queries/get-comments-by-url'
import { GET_REVIEW_STATS_BY_URL } from '../../queries/get-review-stats-by-url'
import { AsyncLoader } from '../AsyncLoader/AsyncLoader'
import { Separator } from '../Separator/Separator'
import { StarRating } from '../StarRating/StarRating'
import classes from './RideDetailsReviewSummaryMiniSection.module.scss'

/**
 * 
 **/
interface RideDetailsReviewSummaryMiniSectionProps {
    /**
     * Unique identifier for coaster whose mini review summary is to be displayed, also serving as coaster's URL subdirectory.
     **/
    coasterUrl: string;
}

/**
 * Concisely displays total comments, total reviews, and average rating.
 **/
export const RideDetailsReviewSummaryMiniSection: React.FC<RideDetailsReviewSummaryMiniSectionProps> = ({ coasterUrl }: RideDetailsReviewSummaryMiniSectionProps) => {
    const [loaded, setLoaded] = useState(false)
    const [commentCount, setCommentCount] = useState<number>(0)
    const [reviewCount, setReviewCount] = useState<number>(0)
    const [reviewRatingAverage, setReviewRatingAverage] = useState<number>(0)

    const reviewQuery = useQuery(GET_REVIEW_STATS_BY_URL, {
        variables: { coasterUrl }
    })
    const commentQuery = useQuery(GET_COMMENTS_BY_URL, {
        variables: { coasterUrl }
    })

    const rank = 13 // TODO: rank needs to be dynamically calculated on backend with scheduled job

    useEffect(() => {
        if (!commentQuery.data)
            return
            
        setCommentCount(commentQuery.data.comments.length)
        setLoaded(reviewQuery.data && commentQuery.data)
    }, [commentQuery])

    useEffect(() => {
        if (!reviewQuery.data) return;
        setReviewCount(reviewQuery.data.coaster.reviews.length)
        setReviewRatingAverage(reviewQuery.data.coaster.reviews.reduce((sum, r) => sum + r.rating, 0) / reviewQuery.data.coaster.reviews.length)
        setLoaded(true)
    }, [reviewQuery])

    function scrollToRatings() {
        document.getElementById('ratingsContainer')?.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }

    function scrollToComments() {
        document.getElementById('commentsContainer')?.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }

    return <>
        {loaded && <>
            <span className={classes.summarySection} title={`Rated ${reviewRatingAverage.toFixed(1)} out of 5`} onClick={scrollToRatings}>
                <StarRating rating={reviewRatingAverage} /> {reviewRatingAverage.toFixed(1)} 
            </span>
            <span className={classes.summarySection} title={`Based on ${reviewCount.toLocaleString()} reviews`} onClick={scrollToRatings}>
                <Separator /> <FontAwesomeIcon icon={faUser} className={classes.icon} /> {reviewCount.toLocaleString()}
            </span>
            <span className={classes.summarySection} title={`${commentCount.toLocaleString()} comments`} onClick={scrollToComments}>
                <Separator /> <FontAwesomeIcon icon={faComment} className={classes.icon} /> {commentCount.toLocaleString()}
            </span>
            <span className={classes.summarySection}>
                <Separator /> <a>Ranked #{rank.toLocaleString()}</a>
            </span>
            {/* { coaster.goldenTicketAwards!! &&
            <span className={classes.summarySection}>
                <Separator /> <a>Won {coaster.goldenTicketAwards} awards</a>
            </span>} */}
            <div style={{ float: 'right' }}>
                <FontAwesomeIcon icon={faShare} /> Share
            </div>
            <div style={{ clear: 'both' }}></div>
        </>}

        {!loaded && <>
            <AsyncLoader size={15} />
        </>}
    </>
}
