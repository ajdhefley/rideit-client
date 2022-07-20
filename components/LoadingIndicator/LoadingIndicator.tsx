import classes from './LoadingIndicator.module.scss'

/**
 * 
 **/
interface LoadingIndicatorProps {

}

/**
 * Loading dialog (prevents user interactivity while visible.)
 **/
export const LoadingIndicator: React.FC<LoadingIndicatorProps> = () => {
    return <>
        <div className={classes.backdrop}>
            <div className={classes.loadingIndicator}>
                Loading...
            </div>
        </div>
    </>
}
