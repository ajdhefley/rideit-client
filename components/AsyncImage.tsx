import { useState } from 'react'
import classes from './AsyncImage.module.scss'

export default function AsyncImage({
    src,
    className
}: {
    src: string,
    className: string
}) {
    const [loaded, setLoaded] = useState(false)

    // const img = new Image();
    // img.src = src;
    // //img.onload = setLoaded.bind(null, true);
    // img.onload = () => {
    //     setTimeout(() => {
    //         setLoaded(true);
    //     }, 2000);
    // };

    return loaded
        ? <img className={className} src={src} />
        : <div className={`${className} ${classes.loader}`}></div>
}
