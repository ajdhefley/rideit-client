/**
 * 
 **/
export interface StarRatingProps {
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