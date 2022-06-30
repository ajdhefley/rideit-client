import classes from './AsyncLoader.module.scss'

/**
 * 
 **/
interface AsyncLoaderProps {
    /**
     * 
     **/
    size: number;
}

/**
 * 
 **/
export const AsyncLoader: React.FC<AsyncLoaderProps> = ({ size }) => {
    return <>
        <span className={classes.asyncLoaderBlock}>
            {[...Array(size)].map(() => String.fromCharCode(9608)).join('')}
        </span>
    </>
}
