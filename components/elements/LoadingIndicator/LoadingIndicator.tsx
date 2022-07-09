import classes from './LoadingIndicator.module.scss'

/**
 * 
 **/
interface LoadingIndicatorProps {

}

/**
 * 
 **/
export const LoadingIndicator: React.FC<LoadingIndicatorProps> = () => {
    return <>
        <div className={classes.backdrop}>
            <div className={classes.loadingIndicator}>
                Loading ...
            </div>
        </div>
    </>
}
