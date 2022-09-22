import classes from './LoadingIndicator.module.scss'

/**
 * Loading dialog (prevents user interactivity while visible.)
 **/
export const LoadingIndicator: React.FC = () => {
    return <>
        <div className={classes.backdrop}>
            <div className={classes.loadingIndicator}>
                Loading...
            </div>
        </div>
    </>
}
