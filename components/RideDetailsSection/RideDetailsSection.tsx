import classes from './RideDetailsSection.module.scss'

/**
 * 
 **/
interface RideDetailsSectionProps {
    /**
     * Required title of the section.
     **/
    title: string;

    /**
     * Inner JSX.
     **/
    children: React.ReactNode;
}

/**
 * 
 **/
export const RideDetailsSection: React.FC<RideDetailsSectionProps> = ({ title, children }) => {
    return <>
        <div className={classes.sectionBody} data-title={title}>
            {children}
        </div>
    </>
}