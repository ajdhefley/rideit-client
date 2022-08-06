import classes from './AsyncLoader.module.scss'

/**
 * 
 **/
interface AsyncLoaderProps {
    /**
     * The width of the placeholder element.
     **/
    size: number;
}

/**
 * Placeholder element that temporarily appears in place of element that is still loading data.
 * Horizontal width is controlled by "size" prop. Vertical height is determined by "font-size"
 * CSS property of parent element.
 **/
export const AsyncLoader: React.FC<AsyncLoaderProps> = ({ size }: AsyncLoaderProps) => {
    return <>
        <span className={classes.asyncLoaderBlock}>
            {[...Array(size)].map(() => String.fromCharCode(9608)).join('')}
        </span>
    </>
}
