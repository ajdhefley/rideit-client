import moment from 'moment'
import { gql, useQuery } from '@apollo/client'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { CoasterReview } from '../../models/CoasterReview'
import { StarRating } from '../StarRating/StarRating'
import classes from './CoasterReviewSection.module.scss'

/**
 * 
 **/
interface CoasterReviewSectionProps {
    /**
     * 
     **/
    coasterUrl: string;
}

/**
 * 
 **/
export const CoasterReviewSection: React.FC<CoasterReviewSectionProps> = ({ coasterUrl }) => {
    const { data } = useQuery(gql`{
        reviews(coasterUrl: "${coasterUrl}") {
            title,
            body,
            rating,
            timestamp,
            reviewTags {
                tag
            },
            author {
                username
            }
        }
    }`)
    const [loaded, setLoaded] = useState(false)
    const [reviews, setReviews] = useState(new Array<CoasterReview>())
    const [visibleReviews, setVisibleReviews] = useState(new Array<CoasterReview>())

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
    </>
}
