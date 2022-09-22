import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { StarRatingProps } from './StarRating.props'
import classes from './StarRating.module.scss'

/**
 * 
 **/
export const StarRating: React.FC<StarRatingProps> = ({ rating, starObscurerMaxWidth = 90 }: StarRatingProps) => {
    const maxRating = 5
    const ratingDiff = (maxRating - rating) / maxRating

    return <>
        <div className={classes.starRating}>
            {[...Array(maxRating-1)].map((x, i) =>
                <FontAwesomeIcon icon={faStar} className={classes.icon} key={i} />
            )}
            <FontAwesomeIcon icon={faStar} className={classes.icon} />
            <div className={classes.starObscurer} style={{ width: `${ratingDiff * starObscurerMaxWidth}px` }}></div>
        </div>
    </>
}
