import moment from 'moment'
import Image from 'next/image'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Coaster } from '../../models/Coaster'
import { InfoField } from '../InfoField/InfoField'
import { Separator } from '../Separator/Separator'
import { CoasterTrainViewer } from '../CoasterTrainViewer/CoasterTrainViewer'
import { RideDetailsCommentSection } from '../RideDetailsCommentSection/RideDetailsCommentSection'
import { CoasterComment } from '../../models/CoasterComment'
import { PageTitle } from '../PageTitle/PageTitle'
import { RideDetailsReviewSummarySection } from '../RideDetailsReviewSummarySection/RideDetailsReviewSummarySection'
import { RideDetailsReviewSummaryMiniSection } from '../RideDetailsReviewSummaryMiniSection/RideDetailsReviewSummaryMiniSection'
import { RideDetailsReviewSection } from '../RideDetailsReviewSection/RideDetailsReviewSection'
import { RideDetailsOthersLikedSection } from '../RideDetailsOthersLikedSection/RideDetailsOthersLikedSection';
import { RideDetailsRelatedSection } from '../RideDetailsRelatedSection/RideDetailsRelatedSection'
import { RideDetailsSection } from '../RideDetailsSection/RideDetailsSection'
import { Button } from '../Button/Button'
import { ImagePreview } from '../ImagePreview/ImagePreview'
import { CoasterImage } from '../../models/CoasterImage'
import classes from './RideDetailsPage.module.scss'

/**
 * 
 **/
interface RideDetailsPageProps {
    /**
     * The coaster data to be displayed on the details page.
     **/
    coaster: Coaster;

    /**
     * The coaster's age, calculated at build time as a prop.
     **/
    coasterAge: number;
}

/**
 * Page containing coaster information, comments, reviews, and images.
 **/
export const RideDetailsPage: NextPage = ({ coaster, coasterAge }: RideDetailsPageProps) => {
    const [allImagesVisible, setAllImagesVisible] = useState(false)
    const [previewedImage, setPreviewedImage] = useState<CoasterImage>()

    const MaxImagesOnMainDisplay = 4

    return <>
        <PageTitle>{`${coaster.name} (${coaster.park})`}</PageTitle>

        <div className={classes.coasterPageContainer}>
            <div className={classes.titleContainer}>
                <p className={classes.titleLarge}>{coaster.name}</p>
                <Separator verticalAlign="middle" />
                <p className={classes.titleMedium}>{coaster.park}</p>
            </div>
            <div className={classes.subTitleContainer}>
                {coaster.location || 'Todo City, Todo State, United States'}
            </div>
            <div className={classes.subTitleContainer}>
                <RideDetailsReviewSummaryMiniSection coasterUrl={coaster.url} />
            </div>

            <ImagePreview image={previewedImage} visible={!!previewedImage} />

            {allImagesVisible && <>
                <div className={classes.moreImagesExit} onClick={() => setAllImagesVisible(false)}>x</div>
                <div className={classes.moreImagesContainer}>
                    {coaster.images.map((img, imgIndex) => (
                        <div key={img.imageUrl} className={classes.pic + ' ' + (imgIndex == 0 ? classes.picFirst : imgIndex == 3 ? classes.picLast : '')}>
                            <Image
                                onClick={() => setPreviewedImage(img)}
                                className={classes.pic}
                                src={img.imageUrl}
                                blurDataURL={img.base64}
                                placeholder="blur" 
                                layout="fill"
                            />
                        </div>
                    ))}
                </div>
                <Button className={classes.backToDetailsBtn} onClick={() => setAllImagesVisible(false)}>Back To Details</Button>
            </>}

            {!allImagesVisible && <>
                <div className={classes.picsContainer}>
                    {coaster.images.slice(0, MaxImagesOnMainDisplay).map((img, imgIndex) => (
                        <div key={img.imageUrl} className={classes.pic + ' ' + classes.photoAnimated + ' ' + (imgIndex == 0 ? classes.picFirst : imgIndex == 3 ? classes.picLast : '')}>
                            <Image
                                onClick={() => setPreviewedImage(img)}
                                className={classes.pic}
                                src={img.imageUrl}
                                blurDataURL={img.base64}
                                placeholder="blur" 
                                layout="fill"
                            />
                        </div>
                    ))}
                    {coaster.images.length > MaxImagesOnMainDisplay && <>
                        <div className={classes.moreImagesBtnContainer}>
                            <Button onClick={() => setAllImagesVisible(true)}>See {coaster.images.length - MaxImagesOnMainDisplay} More</Button>
                        </div>
                    </>}
                    {coaster.images.length == 0 && <>
                        No photos have been uploaded for this coaster yet.
                        <br />
                        <Button>Upload Photo</Button>
                    </>}
                </div>
                <div className={classes.mainPodContainer}>
                    <div className={`${classes.pod} ${classes.statPod}`}>
                        <RideDetailsSection title="Stats">
                            <div className={classes.statPodSeparator}>
                                <InfoField label="Max Height" value={coaster.heightInFt} unit="ft" />
                                <InfoField label="Max Drop" value={coaster.dropInFt} unit="ft" />
                                <InfoField label="Max Angle" value={coaster.angleInDegrees} unit={String.fromCharCode(176)} />
                            </div>
                            <div className={classes.statPodSeparator}>
                                <InfoField label="Total Length" value={coaster.lengthInFt} unit="ft" />
                                <InfoField label="Top Speed" value={coaster.speedInMph} unit="mph" />
                                <InfoField label="Inversions" value={coaster.inversions} visible={coaster.inversions > 0} />
                            </div>
                        </RideDetailsSection>
                    </div>
                    <div className={`${classes.pod} ${classes.infoPod}`}>
                        <RideDetailsSection title="Facts">
                            <InfoField label="Type" value={coaster.type} />
                            <InfoField label="Manufacturer" value={coaster.manufacturer} />
                            <InfoField label="Model" value={coaster.model} />
                            <InfoField label="Opened" value={moment(coaster.openingDate, 'MM/DD/YYYY').format('MMM D, YYYY')} />
                            <InfoField label="Age" value={coasterAge} unit="years" />
                        </RideDetailsSection>
                    </div>
                </div>

                <RideDetailsRelatedSection coaster={coaster} />

                <div className={`${classes.pod} ${classes.reviewSummaryPod}`} id="ratingsContainer">
                    <RideDetailsReviewSummarySection coasterUrl={coaster.url} />
                </div>
                <div className={`${classes.pod} ${classes.othersLikedPod}`}>
                    <RideDetailsOthersLikedSection coaster={coaster} />
                </div>
                {coaster.userRating ? <span>Your rating: {coaster.userRating}&nbsp;<button>Update</button></span> : <Button>Review This Coaster</Button>}
                <div className={`${classes.pod} ${classes.reviewsPod}`} id="reviewsContainer">
                    <RideDetailsReviewSection coasterUrl={coaster.url} />
                </div>
                {/* <div className={`${classes.pod} ${classes.commentsPod}`} id="commentsContainer">
                    <RideDetailsCommentSection coasterUrl={coaster.url} />
                </div> */}
            
            </>}
            
        </div>
    </>
}
