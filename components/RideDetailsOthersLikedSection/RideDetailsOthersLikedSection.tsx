import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { Coaster } from '../../models/Coaster'
import { Separator } from '../Separator/Separator'
import { AsyncLoader } from '../AsyncLoader/AsyncLoader'
import classes from './RideDetailsOthersLikedSection.module.scss'
import { StarRating } from '../StarRating/StarRating';

/**
 * 
 **/
interface RideDetailsOthersLikedSectionProps {
    /**
     * 
     **/
    coaster: Coaster;
}

/**
 * 
 */
export const RideDetailsOthersLikedSection: React.FC<RideDetailsOthersLikedSectionProps> = ({ coaster }: RideDetailsOthersLikedSectionProps) => {
    // const { data } = useQuery(gql`{
    //     TODO
    // }`)

    const data = {
        coasters: [
            {

                name: 'Top Thrill Dragster',
                url: 'top-thrill-dragster-cedar-point',
                image: {
                    url: 'https://rcdb.com/aafceye',
                    base64: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAfEAABBAICAwAAAAAAAAAAAAABAAIDEQQhBQYHFDH/xAAUAQEAAAAAAAAAAAAAAAAAAAAE/8QAGBEBAQEBAQAAAAAAAAAAAAAAAQIAETH/2gAMAwEAAhEDEQA/AIDz7yOTh98b6r2xibCgleBG2i4g2arXwaGkRE+ZE8ypXhv/2Q=='
                }
            },
            {

                name: 'Millennium Force',
                url: 'millennium-force-cedar-point',
                image: {
                    url: 'https://rcdb.com/aaawdda',
                    base64: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAfEAABAwUAAwAAAAAAAAAAAAABAAIDBAUGERMHUZH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAv/EABgRAAMBAQAAAAAAAAAAAAAAAAABAjFR/9oADAMBAAIRAxEAPwCY+Ts1yemkxk01/ucPWywyPEdS5oc7pKN6B9AfERFVaHK4f//Z'
                }
            },
            {

                name: 'Superman: Ride of Steel',
                url: 'superman-ride-of-steel-six-flags-new-england',
                image: {
                    url: 'https://rcdb.com/aabruva',
                    base64: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAgEAABAwMFAQAAAAAAAAAAAAABAAIDBQYRBAcTITFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAQT/xAAYEQADAQEAAAAAAAAAAAAAAAAAAQIRUf/aAAwDAQACEQMRAD8Akt1bi3gxlE4bjqcANNhJbp5zE0nLuyG4BP0+lERFN6TqJ4f/2Q=='
                }
            }
        ]
    }

    return <>
        {data && <>
            <div className={`${classes.pod} ${classes.othersLikedPod}`}>
                <div className={classes.podHeader}>Others liked</div>
                <div className={classes.podBody}>
                    {data.coasters.map((coaster, index) => <>
                        {index > 0 && <Separator />}
                        <div className={classes.similiarItem}>
                            <div className={classes.imgWrapper}>
                                <Image
                                    className={classes.pic}
                                    src={coaster.image.url}
                                    blurDataURL={coaster.image.base64}
                                    placeholder="blur" 
                                    layout="fill"
                                />
                            </div>
                            <div style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '10px' }}>
                                <StarRating rating={4.2} />
                                <br />
                                <Link href={`/ride-details/${coaster.url}`}>
                                    <a>
                                        {coaster.name}
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </>)}
                </div>
            </div>
        </>}

        {!data && <>
            <div className={`${classes.pod} ${classes.similarRidesPod}`}>
                <AsyncLoader size={20} />
                <br />
                <br />
                <AsyncLoader size={25} />
            </div>
        </>}
    </>
}