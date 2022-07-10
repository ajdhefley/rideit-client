import { gql, useQuery } from '@apollo/client'
import classes from './CoasterReviewSection.module.scss'

/**
 * 
 **/
interface CoasterReviewSectionProps {
    /**
     * 
     **/
    coasterUrl: string;
}

/**
 * 
 **/
export const CoasterReviewSection: React.FC<CoasterReviewSectionProps> = ({ coasterUrl }) => {
    const { data } = useQuery(gql`
        query {
            reviews(coasterUrl: "${coasterUrl}") {
                body,
                timestamp
            }
        }
    `)

    return <>
    </>
}
