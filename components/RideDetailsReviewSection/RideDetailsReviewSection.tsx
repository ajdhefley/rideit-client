import moment from 'moment'
import { gql, useQuery } from '@apollo/client'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { CoasterReview } from '../../models/CoasterReview'
import { StarRating } from '../StarRating/StarRating'
import { Button } from '../Button/Button'
import classes from './RideDetailsReviewSection.module.scss'

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
    const [reviewPageCount, setReviewPageCount] = useState(0)
    const signedIn = true // TODO

    const { data } = useQuery(gql`{
        reviews(coasterUrl: "${coasterUrl}") {
            title,
            body,
            rating,
            timestamp,
            author {
                username
            }
        }
    }`)

    // TODO: paginate reviews

    function getFriendlyTimestamp(timestamp) {
        const time = new Date(timestamp).getTime()
        return moment.unix(time / 1000).fromNow()
    }

    return <>
        {data?.reviews.length > 0 && <>
            <div className={classes.reviewWrapper}>
                {data.reviews.map((review) => <>
                    <div className={classes.review} key={review.reviewId}>
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
                    </div>
                </>)}
                {reviews.length > 0 && <button className={classes.moreReviewsButton}>Load More Reviews</button>}
            </div>
        </>}
        {data?.reviews.length == 0 && <>
            <div>
                <span>This coaster has not received any reviews.</span>
                {signedIn && <span>&nbsp;You could be the first one.</span>}
            </div>
            {signedIn && <Button>Review It</Button>}
        </>}
    </>
}
