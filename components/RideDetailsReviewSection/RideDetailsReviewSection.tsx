import moment from 'moment'
import { useQuery } from '@apollo/client'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { CoasterReview } from '../../models/CoasterReview'
import { StarRating } from '../StarRating/StarRating'
import { Button } from '../Button/Button'
import classes from './RideDetailsReviewSection.module.scss'
import { GET_REVIEWS_BY_URL } from '../../queries/get-reviews-by-url'

/**
 * 
 **/
interface RideDetailsReviewSectionProps {
    /**
     * Unique identifier for coaster whose reviews are to be displayed, also serving as coaster's URL subdirectory.
     **/
    coasterUrl: string;
}

/**
 * Loads and renders paginated reviews for coaster with specified URL.
 **/
export const RideDetailsReviewSection: React.FC<RideDetailsReviewSectionProps> = ({ coasterUrl }: RideDetailsReviewSectionProps) => {
    const [loaded, setLoaded] = useState(false)
    const [reviews, setReviews] = useState(new Array<CoasterReview>())
    const [visibleReviews, setVisibleReviews] = useState(new Array<CoasterReview>())
    const signedIn = true // TODO

    const { data } = useQuery(GET_REVIEWS_BY_URL, {
        variables: { coasterUrl }
    })

    useEffect(() => {
        if (data) {
            setReviews(data.reviews)
            setLoaded(true)
        }
    }, [data])

    useEffect(() => {
        loadMoreReviews() // Show initial reviews for display
    }, [loaded])

    function loadMoreReviews() {
        const reviewsCopy = [...reviews]
        const moreReviews = reviewsCopy.splice(0, 6)
        setReviews(reviewsCopy)
        setVisibleReviews(visibleReviews.concat(moreReviews))
    }

    function getFriendlyTimestamp(timestamp) {
        return moment.unix(timestamp / 1000).fromNow()
    }

    return <>
        {reviews.length > 0 && <>
            <div className={classes.reviewWrapper}>
                {visibleReviews.map((review) => <div className={classes.review} key={review.reviewId}>
                    <div className={classes.reviewPhoto}>
                        <div className={classes.headerAccountIcon}><FontAwesomeIcon icon={faUser} /></div>
                    </div>
                    <div className={classes.reviewContent}>
                        <div className={classes.reviewAuthor}>{review.author.username}</div>
                        <div className={classes.reviewTimestamp}>{getFriendlyTimestamp(review.timestamp)}</div>
                        <div className={classes.reviewHeader}>
                            <div className={classes.reviewRating}><StarRating rating={review.rating} /></div>
                            <div className={classes.reviewTitle}>{review.title}</div>
                        </div>
                        <div className={classes.reviewBody}>{review.body}</div>
                        {review.body.length > 480 && <a className={classes.reviewBodySeeMore}>See More&nbsp;&raquo;</a>}
                    </div>
                    
                </div>)}
                {reviews.length > 0 && <button className={classes.moreReviewsButton} onClick={loadMoreReviews}>Load More Reviews</button>}
            </div>
        </>}
        {reviews.length == 0 && <>
            <div>
                <span>This coaster has not received any reviews.</span>
                &nbsp;
                {signedIn && <span>You could be the first one.</span>}
            </div>
            {signedIn && <Button>Review It</Button>}
        </>}
    </>
}
