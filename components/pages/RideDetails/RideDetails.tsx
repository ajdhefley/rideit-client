import moment from 'moment'
import Image from 'next/image'
import { NextPage } from 'next'
import { Coaster } from '../../../models/Coaster'
import { InfoField } from '../../elements/InfoField/InfoField'
import { Separator } from '../../elements/Separator/Separator'
import { CoasterTrainViewer } from '../../elements/CoasterTrainViewer/CoasterTrainViewer'
import { CoasterCommentSection } from '../../elements/CoasterCommentSection/CoasterCommentSection'
import { CoasterComment } from '../../../models/CoasterComment'
import { PageTitle } from '../../elements/PageTitle/PageTitle'
import { CoasterReviewSummarySection } from '../../elements/CoasterReviewSummarySection/CoasterReviewSummarySection'
import { CoasterReviewSummaryMiniSection } from '../../elements/CoasterReviewSummaryMiniSection/CoasterReviewSummaryMiniSection'
import classes from './RideDetails.module.scss'
import { CoasterReviewSection } from '../../elements/CoasterReviewSection/CoasterReviewSection'

/**
 * 
 **/
interface RideDetailsPageProps {
    /**
     * 
     **/
    coaster: Coaster;

    /**
     * 
     **/
    coasterAge: number;

    /**
     * 
     **/
    comments: CoasterComment[];
}

/**
 * 
 **/
export const RideDetailsPage: NextPage<RideDetailsPageProps> = ({ coaster, coasterAge }) => {
    return <>
        <PageTitle>{`${coaster.name} (${coaster.park})`}</PageTitle>
        <div className={classes.coasterPageContainer}>
            <div className={classes.titleContainer}>
                <p className={classes.titleLarge}>{coaster.name}</p>
                <Separator />
                <p className={classes.titleMedium}>{coaster.park}</p>
            </div>
            <div className={classes.subTitleContainer}>
                <CoasterReviewSummaryMiniSection coasterUrl={coaster.url} />
            </div>
            <div className={classes.picsContainer}>
                {coaster.images.slice(0, 4).map((img) => (
                    <div key={img.ImageUrl} className={classes.pic}>
                        <Image className={classes.pic} src={img.imageUrl} blurDataURL={img.base64} placeholder="blur" 
                        layout="fill"
                        width={250}
                        height={250} />
                    </div>
                ))}
            </div>
            <div className={classes.mainPodContainer}>
                <div className={`${classes.pod} ${classes.statPod}`}>
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
                </div>
                <div className={`${classes.pod} ${classes.infoPod}`}>
                    <InfoField label="Type" value={coaster.type} />
                    <InfoField label="Manufacturer" value={coaster.manufacturer} />
                    <InfoField label="Model" value={coaster.model} />
                    <InfoField label="Location" value={coaster.location} />
                    <InfoField label="Opened" value={moment(coaster.openingDate, 'MM/DD/YYYY').format('MMM D, YYYY')} />
                    <InfoField label="Age" value={coasterAge} unit="years" />
                </div>
                {/* <div className={`${classes.pod} ${classes.othersLikedPod}`} style={{ display: coaster.park ? 'initial' : 'none' }}>
                    <div className={classes.podHeader}>Others who liked this also liked</div>
                    <a>Top Thrill Dragster</a> | <a>Millennium Force</a> | <a>Superman: Ride of Steel</a>
                </div>
                <div className={`${classes.pod} ${classes.otherParkPod}`} style={{ display: coaster.park ? 'initial' : 'none' }}>
                    <div className={classes.podHeader}>Other rides at {coaster.park}</div>
                    <a>Goliath</a> | <a>Raging Bull</a> | <a>Maxx Force</a>
                </div>
                <div className={`${classes.pod} ${classes.similarRidesPod}`} style={{ display: coaster.park ? 'initial' : 'none' }}>
                    <div className={classes.podHeader}>Similar rides</div>
                    <a>Top Thrill Dragster</a> | <a>Millennium Force</a> | <a>Superman: Ride of Steel</a>
                </div>
                <div className={`${classes.pod} ${classes.othersLikedPod}`} style={{ display: coaster.park ? 'none' : 'initial' }}>
                    <AsyncLoader size={20} />
                    <br />
                    <br />
                    <AsyncLoader size={25} />
                </div>
                <div className={`${classes.pod} ${classes.otherParkPod}`} style={{ display: coaster.park ? 'none' : 'initial' }}>
                    <AsyncLoader size={20} />
                    <br />
                    <br />
                    <AsyncLoader size={25} />
                </div>
                <div className={`${classes.pod} ${classes.similarRidesPod}`} style={{ display: coaster.park ? 'none' : 'initial' }}>
                    <AsyncLoader size={20} />
                    <br />
                    <br />
                    <AsyncLoader size={25} />
                </div> */}
            </div>
            <div className={`${classes.pod} ${classes.ratingsPod}`} id="ratingsContainer">
                <CoasterReviewSummarySection coasterUrl={coaster.url} />
            </div>
            <div className={`${classes.pod} ${classes.seatsPod}`}>
                <CoasterTrainViewer coaster={coaster} primaryColor={coaster.colorPrimary} secondaryColor={coaster.colorSecondary} />
            </div>
            {coaster.userRating ? <span>Your rating: {coaster.userRating}&nbsp;<a>Update</a></span> : <a>Review this coaster</a>}
            <div className={`${classes.pod} ${classes.commentsPod}`} id="commentsContainer">
                <CoasterReviewSection coasterUrl={coaster.url} />
            </div>
            <div className={`${classes.pod} ${classes.commentsPod}`} id="commentsContainer">
                <CoasterCommentSection coasterUrl={coaster.url} />
            </div>
        </div>
    </>
}
