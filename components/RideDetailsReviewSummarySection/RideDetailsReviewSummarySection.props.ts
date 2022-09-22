/**
 * 
 **/
export interface RideDetailsReviewSummarySectionProps {
    /**
     * Unique identifier for coaster whose review summary data is to be displayed, also serving as coaster's URL subdirectory.
     **/
    coasterUrl: string;

    /**
     * Max width of tag/keyword progress bar.
     * E.G. 90% of reviews mentioning a keyword means that keyword's progress bar width will be 90% of the max width.
     **/
    reviewTagLineMaxWidth?: number;
}