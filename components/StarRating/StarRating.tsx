import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import classes from './StarRating.module.scss'

/**
 * 
 **/
interface StarRatingProps {
    /**
     * The actual rating (out of 5.)
     **/
    rating: number;

    /**
     * Used to hide stars, the width being proportional to the rating.
     * E.G. 3/5 stars means 2 stars get covered by the obscurer element. 4.5/5 stars means only half a star is covered.
     * Half-star icon is not available, so this is the solution.
     **/
    starObscurerMaxWidth?: number;
}

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
