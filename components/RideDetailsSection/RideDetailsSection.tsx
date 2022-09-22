import classes from './RideDetailsSection.module.scss'
import { RideDetailsSectionProps } from './RideDetailsSection.props'

/**
 * 
 **/
export const RideDetailsSection: React.FC<RideDetailsSectionProps> = ({ title, children }: RideDetailsSectionProps) => {
    return <>
        <div className={classes.sectionBody} data-title={title}>
            {children}
        </div>
    </>
}