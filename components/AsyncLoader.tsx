import classes from './AsyncLoader.module.scss'

export default function AsyncLoader({
    size
}: {
    size: number
}): JSX.Element {
    return (
        <span className={classes.asyncLoaderBlock}>
            {[...Array(size)].map(() => String.fromCharCode(9608)).join('')}
        </span>
    )
}
