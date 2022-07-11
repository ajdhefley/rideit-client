import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import classes from './StarRating.module.scss'

/**
 * 
 **/
interface StarRatingProps {
    /**
     * 
     **/
    rating: number;
}

/**
 * 
 **/
export const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
    const starObscurerMaxWidth = 19
    const ratingFloor = Math.floor(rating)
    const ratingDiff = (rating - ratingFloor) / 1

    return <>
        <div className={classes.starRating}>
            {[...Array(ratingFloor)].map((x, i) =>
                <FontAwesomeIcon icon={faStar} className={classes.icon} key={i} />
            )}
            <FontAwesomeIcon icon={faStar} className={classes.icon} />
            <div className={classes.starObscurer} style={{ width: `${starObscurerMaxWidth - ratingDiff * starObscurerMaxWidth}px` }}></div>
        </div>
    </>
}
