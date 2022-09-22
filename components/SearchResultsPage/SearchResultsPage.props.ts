import { Coaster } from '../../models/Coaster';

/**
 * 
 **/
export interface SearchResultsPageProps {
    /**
     * The coasters to be listed, returned by the search query.
     **/
    coasters: Coaster[];
}