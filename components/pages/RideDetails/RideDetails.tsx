import Head from 'next/head'
import Image from 'next/image'
import { NextPage } from 'next'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faUser, faComment } from '@fortawesome/free-solid-svg-icons'
import { Coaster } from '../../../models/Coaster'
import { InfoField } from '../../elements/InfoField/InfoField'
import { AsyncLoader } from '../../elements/AsyncLoader/AsyncLoader'
import { Separator } from '../../elements/Separator/Separator'
import { CoasterTrainViewer } from '../../elements/CoasterTrainViewer/CoasterTrainViewer'
import classes from './RideDetails.module.scss'
import { CoasterCommentSection } from '../../elements/CoasterCommentSection/CoasterCommentSection'
import { CoasterComment } from '../../../models/CoasterComment'

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
    const RatingTagLineMaxWidth = 100

    function scrollToRatings() {
        document.getElementById('ratingsContainer')?.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }

    function scrollToComments() {
        document.getElementById('commentsContainer')?.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }

    return <>
        <Head>
            <title>{coaster.Name} ({coaster.Park}) - RideIt</title>
        </Head>
        <div className={classes.coasterPageContainer}>
            <div className={classes.titleContainer}>
                <p className={classes.titleLarge}>{coaster.Name}</p>
                <Separator />
                <p className={classes.titleMedium}>{coaster.Park}</p>
            </div>
            <div className={classes.subTitleContainer}>
                <span className={classes.titleSmall} title={`Rated ${coaster.ratingAverage} out of 5`} onClick={scrollToRatings}>
                    <FontAwesomeIcon icon={faStar} className={classes.icon} /> {coaster.ratingAverage} 
                </span>
                <span className={classes.titleSmall} title={`Based on ${coaster.ratingCount} ratings`} onClick={scrollToRatings}>
                    <FontAwesomeIcon icon={faUser} className={classes.icon} /> {coaster.ratingCount}
                </span>
                <span className={classes.titleSmall} title={`${coaster.comments?.length} comments`} onClick={scrollToComments}>
                    <FontAwesomeIcon icon={faComment} className={classes.icon} /> {coaster.comments?.length}
                </span>
                <span className={classes.titleSmall}>
                    <Separator /> <a>Ranked #{coaster.rank}</a>
                </span>
                { coaster.goldenTicketAwards!! &&
                <span className={classes.titleSmall}>
                    <Separator /> <a>Won {coaster.goldenTicketAwards} awards</a>
                </span>}
                <div style={{ float: 'right' }}>
                    <a>Share</a>
                </div>
                <div style={{ clear: 'both' }}></div>
            </div>
            <div className={classes.picsContainer}>
                {coaster.ImgList.slice(0, 4).map((img) => (
                    <div key={img.ImageUrl} className={classes.pic}>
                        <Image className={classes.pic} src={img.ImageUrl} blurDataURL={img.Base64} placeholder="blur" 
                        layout="fill"
                        width={250}
                        height={250} />
                    </div>
                ))}
            </div>
            <div className={classes.mainPodContainer}>
                <div className={`${classes.pod} ${classes.statPod}`}>
                    <div className={classes.statPodSeparator}>
                        <InfoField label="Max Height" value={coaster.HeightInFt} unit="ft" />
                        <InfoField label="Max Drop" value={coaster.DropInFt} unit="ft" />
                        <InfoField label="Max Angle" value={coaster.AngleInDegrees} unit={String.fromCharCode(176)} />
                    </div>
                    <div className={classes.statPodSeparator}>
                        <InfoField label="Total Length" value={coaster.LengthInFt} unit="ft" />
                        <InfoField label="Top Speed" value={coaster.SpeedInMph} unit="mph" />
                        <InfoField label="Inversions" value={coaster.Inversions} visible={coaster.Inversions > 0} />
                    </div>
                </div>
                <div className={`${classes.pod} ${classes.infoPod}`}>
                    <InfoField label="Type" value={coaster.Type} />
                    <InfoField label="Manufacturer" value={coaster.Manufacturer} />
                    <InfoField label="Model" value={coaster.Model} />
                    <InfoField label="Location" value={coaster.Location} />
                    <InfoField label="Opened" value={moment(coaster.OpeningDate, 'MM/DD/YYYY').format('MMM D, YYYY')} />
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
                <div className={classes.ratingStatsContainer}>
                    <FontAwesomeIcon icon={faStar} className={classes.icon} /> {coaster.ratingAverage} <span className={classes.ratingStatsDescription}>out of 5</span>
                    &nbsp;<Separator />&nbsp;
                    <FontAwesomeIcon icon={faUser} className={classes.icon} /> {coaster.ratingCount} <span className={classes.ratingStatsDescription}>ratings</span>
                </div>
                <div className={classes.ratingTagContainer}>
                    {[
                        { name: 'Roughness', value: 67 },
                        { name: 'Head Banging', value: 74 },
                        { name: 'Laterals', value: 56 },
                        { name: 'Air Time', value: 23 },
                        { name: 'Low Capacity', value: 43 },
                        { name: 'Head Choppers', value: 54 },
                    ].map((ratingTag) => (
                    <div className={classes.ratingTag} key={ratingTag.toString()}>
                        <div className={classes.ratingTagName}>{ratingTag.name}</div>
                        <div className={classes.ratingTagPerc}>({ratingTag.value}%)</div>
                        <div className={classes.ratingTagLine} style={{ width: `${ratingTag.value / 100 * RatingTagLineMaxWidth}px` }}></div>
                    </div>))}
                </div>
            </div>
            <div className={`${classes.pod} ${classes.seatsPod}`}>
                <CoasterTrainViewer coaster={coaster} primaryColor={coaster.ColorPrimary} secondaryColor={coaster.ColorSecondary} />
            </div>
            {coaster.userRating ? <span>Your rating: {coaster.userRating}&nbsp;<a>Update</a></span> : <a>Review this coaster</a>}
            <div className={`${classes.pod} ${classes.commentsPod}`} id="commentsContainer">
                <CoasterCommentSection coasterId={coaster.CoasterId} />
            </div>
        </div>
    </>
}
