import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { CoasterComment } from '../../../models/CoasterComment'
import classes from './CoasterCommentSection.module.scss'
import { gql, useQuery } from '@apollo/client';

/**
 * 
 **/
interface CoasterCommentSectionProps {
    /**
     * 
     **/
    coasterUrl: string;
}

/**
 * 
 **/
export const CoasterCommentSection: React.FC<CoasterCommentSectionProps> = ({ coasterUrl }) => {
    const { loading, error, data } = useQuery(gql`
        query {
            comments(coasterUrl: "${coasterUrl}") {
                body,
                timestamp
            }
        }
    `)

    return <>
        {data?.comments?.map((comment) => (
        <div className={classes.comment} key={comment.commentId}>
            <div className={classes.commentAvatar}></div>
            <div className={classes.fcommentTextWrapper}>
                <div className={classes.commentUsername}>{comment.author}</div>
                <div className={classes.commentTimestamp} title={comment.timestampStr}>{comment.timestampFromNow}</div>
                <div className={classes.commentText}>{comment.body}</div>
                <div className={classes.commentFooter}>
                    <FontAwesomeIcon icon={faThumbsUp} className={`${classes.commentLikeButton} ${classes.icon}`} /> {comment.likeCount}
                    <span className={classes.commentReplyButton}>Reply</span>
                </div>
            </div>
        </div>))}
        <FontAwesomeIcon icon={faAngleDown} className={`${classes.showMoreComments} ${classes.icon}`} title="Show more comments" />
    </>
}
