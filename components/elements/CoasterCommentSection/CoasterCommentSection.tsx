import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import classes from './CoasterCommentSection.module.scss';
import { CoasterComment } from '../../../models/CoasterComment';

/**
 * 
 **/
interface CoasterCommentSectionProps {
    /**
     * 
     **/
    coasterId: number;
}

/**
 * 
 **/
export const CoasterCommentSection: React.FC<CoasterCommentSectionProps> = ({ coasterId }) => {
    const comments: Array<CoasterComment> = []; // TODO

    return <>
        {comments?.map((comment) => (
        <div className={classes.comment} key={comment.CommentId}>
            <div className={classes.commentAvatar}></div>
            <div className={classes.fcommentTextWrapper}>
                <div className={classes.commentUsername}>{comment.Author}</div>
                <div className={classes.commentTimestamp} title={comment.TimestampStr}>{comment.TimestampFromNow}</div>
                <div className={classes.commentText}>{comment.Body}</div>
                <div className={classes.commentFooter}>
                    <FontAwesomeIcon icon={faThumbsUp} className={`${classes.commentLikeButton} ${classes.icon}`} /> {comment.LikeCount}
                    <span className={classes.commentReplyButton}>Reply</span>
                </div>
            </div>
        </div>))}
        <FontAwesomeIcon icon={faAngleDown} className={`${classes.showMoreComments} ${classes.icon}`} title="Show more comments" />
    </>
}
