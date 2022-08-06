import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { Coaster } from '../../models/Coaster'
import { Separator } from '../Separator/Separator'
import { AsyncLoader } from '../AsyncLoader/AsyncLoader'
import { StarRating } from '../StarRating/StarRating'
import classes from './RideDetailsRelatedSection.module.scss'

/**
 * 
 **/
interface RideDetailsRelatedSectionProps {
    /**
     * 
     **/
    coaster: Coaster;
}

/**
 * 
 */
export const RideDetailsRelatedSection: React.FC<RideDetailsRelatedSectionProps> = ({ coaster }: RideDetailsRelatedSectionProps) => {
    // const { data } = useQuery(gql`{
    //     TODO
    // }`)

    const otherRidesData = {
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
            },
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
            },
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

    const similarRidesData = {
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
        {otherRidesData && <>
            <div className={`${classes.pod} ${classes.otherParkPod}`}>
                <div className={classes.podHeader}>Other rides at {coaster.park}</div>
                <div className={classes.podBody}>
                    {otherRidesData.coasters.map((coaster, index) => <>
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

        {similarRidesData && <>
            <div className={`${classes.pod} ${classes.similarRidesPod}`}>
                <div className={classes.podHeader}>Similar rides</div>
                <div className={classes.podBody}>
                    {similarRidesData.coasters.map((coaster, index) => <>
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

        {!otherRidesData && <>
            <div className={`${classes.pod} ${classes.otherParkPod}`}>
                <AsyncLoader size={20} />
                <br />
                <br />
                <AsyncLoader size={25} />
            </div>
        </>}

        {!similarRidesData && <>
            <div className={`${classes.pod} ${classes.similarRidesPod}`}>
                <AsyncLoader size={20} />
                <br />
                <br />
                <AsyncLoader size={25} />
            </div>
        </>}
    </>
}