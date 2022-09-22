import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { CoasterImage } from '../../models/CoasterImage'
import { Button } from '../Button/Button'
import classes from './ImagePreview.module.scss'
import { ImagePreviewProps } from './ImagePreview.props'

/**
 *
 **/
export const ImagePreview: React.FC<ImagePreviewProps> = ({ image = {} as CoasterImage, visible }: ImagePreviewProps) => {
    const [visibleState, setVisibleState] = useState(visible)

    useEffect(() => setVisibleState(visible), [visible])

    return <>
        {visibleState && <>
            <div className={classes.imagePreviewContainer}>
                <div style={{
                    position: 'relative',
                    width: `${image.width}px`,
                    height: `${image.height}px`,
                    left: `calc(50% - ${image.width/2}px)`,
                    top: `calc(50% - ${image.height/2}px)`,
                }}>
                    <Image 
                        src={image.imageUrl}
                        blurDataURL={image.base64}
                        placeholder="blur" 
                        layout="fill"
                        width={image.width}
                        height={image.height}
                    />
                </div>
                <div className={classes.imageClose} onClick={() => setVisibleState(false)}>x Close</div>
                <Button className={classes.imageSelectorLeft}><FontAwesomeIcon icon={faChevronLeft} /></Button>
                <Button className={classes.imageSelectorRight}><FontAwesomeIcon icon={faChevronRight} /></Button>
            </div>
        </>}
    </>
}
