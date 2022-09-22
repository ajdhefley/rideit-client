import { Coaster } from '../../models/Coaster';

/**
 * 
 **/
export interface CoasterTrainViewerProps {
    /**
     * Contains train data for the coaster needed to determine number of rows and seats.
     **/
    coaster: Coaster;

    /**
     * Color of the train background.
     **/
    primaryColor: string;
    
    /**
     * Color of the train seats.
     **/
    secondaryColor: string;
}