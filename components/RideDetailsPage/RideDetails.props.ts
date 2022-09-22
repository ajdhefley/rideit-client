import { Coaster } from '../../models/Coaster';

/**
 * 
 **/
export interface RideDetailsPageProps {
    /**
     * The coaster data to be displayed on the details page.
     **/
    coaster: Coaster;

    /**
     * The coaster's age, calculated at build time as a prop.
     **/
    coasterAge: number;
}