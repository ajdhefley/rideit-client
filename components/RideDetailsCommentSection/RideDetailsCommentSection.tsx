import moment from 'moment'
import { gql, useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import classes from './RideDetailsCommentSection.module.scss'

/**
 * 
 **/
interface RideDetailsCommentSectionProps {
    /**
     * Unique identifier for coaster whose comments are to be displayed, also serving as coaster's URL subdirectory.
     **/
    coasterUrl: string;
}

/**
 * Loads and renders paginated comments for coaster with specified URL.
 **/
export const RideDetailsCommentSection: React.FC<RideDetailsCommentSectionProps> = ({ coasterUrl }: RideDetailsCommentSectionProps) => {
    // const { loading, error, data } = useQuery(gql`{
    //     comments(coasterUrl: "${coasterUrl}") {
    //         author {
    //             username
    //         },
    //         body,
    //         likeCount,
    //         timestamp
    //     }
    // }`)

    function getFriendlyTimestamp(timestamp) {
        return moment.unix(timestamp / 1000).fromNow()
    }

    return <>
        {/* {data?.comments?.map((comment) => (
        <div className={classes.comment} key={comment.commentId}>
            <div className={classes.commentAvatar}></div>
            <div className={classes.fcommentTextWrapper}>
                <div className={classes.commentUsername}>{comment.author.username}</div>
                <div className={classes.commentTimestamp}>{getFriendlyTimestamp(comment.timestamp)}</div>
                <div className={classes.commentText}>{comment.body}</div>
                <div className={classes.commentFooter}>
                    <FontAwesomeIcon icon={faThumbsUp} className={`${classes.commentLikeButton} ${classes.icon}`} /> {comment.likeCount}
                    <span className={classes.commentReplyButton}>Reply</span>
                </div>
            </div>
        </div>))} */}
        <FontAwesomeIcon icon={faAngleDown} className={`${classes.showMoreComments} ${classes.icon}`} title="Show more comments" />
    </>
}
