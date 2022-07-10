import { gql, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react';
import { CoasterReview } from '../../../models/CoasterReview';
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
    const { data } = useQuery(gql`
        query {
            reviews(coasterUrl: "${coasterUrl}") {
                title,
                body,
                rating,
                reviewTags {
                    tag
                },
                author {
                    username
                }
            }
        }
    `)
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

    return <>
        <div className={classes.reviewWrapper}>
            {visibleReviews.map((review) => <div className={classes.review}>
                <div className={classes.reviewTitle}>{review.title}</div>
                <div className={classes.reviewAuthor}>{review.author.username}</div>
                <div className={classes.reviewBody}>{review.body}</div>
                {review.body.length > 480 && <div>See more</div>}
            </div>)}
            <button onClick={loadMoreReviews}>Load More Reviews</button>
        </div>
    </>
}
