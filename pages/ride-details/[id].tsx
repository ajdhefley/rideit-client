import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faUser, faComment, faAngleDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { CoasterPageModel } from '../../models/CoasterPageModel'
import AsyncImage from '../../components/AsyncImage'
import InfoField from '../../components/InfoField'
import AsyncLoader from '../../components/AsyncLoader'
import Separator from '../../components/Separator'
import CoasterTrainViewer from '../../components/CoasterTrainViewer'
import classes from './ride-details.module.scss'
import asyncImageClasses from '../../components/AsyncImage.module.scss'

export default function CoasterDetails({
    coaster
}: {
    coaster: CoasterPageModel
}) {
    const ratingTagLineMaxWidth = 100;

    let ratingTags = [
        { name: 'Roughness', value: 67 },
        { name: 'Head Banging', value: 74 },
        { name: 'Laterals', value: 56 },
        { name: 'Air Time', value: 23 },
        { name: 'Low Capacity', value: 43 },
        { name: 'Head Choppers', value: 54 },
    ]

    function scrollToRatings() {
        document.getElementById('ratingsContainer')?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }

    function scrollToComments() {
        document.getElementById('commentsContainer')?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }

    return <>
        <Head>
            <title>{coaster.Name} ({coaster.Park}) - RideIt</title>
        </Head>
        <div className={classes.coasterPageContainer}>
            <div className={classes.titleContainer}>
                <p className={classes.titleLarge}>{coaster.Name || (<AsyncLoader size={5} />)}</p>
                <Separator />
                <p className={classes.titleMedium}>{coaster.Park || (<AsyncLoader size={15} />)}</p>
            </div>
            <div className={classes.subTitleContainer} style={{ display: coaster.ratingAverage ? 'initial' : 'none' }}>
                <span className={classes.titleSmall} title={`Rated ${coaster.ratingAverage} out of 5`} onClick={scrollToRatings}>
                    <FontAwesomeIcon icon={faStar} className={classes.icon} /> {coaster.ratingAverage} 
                </span>
                <span className={classes.titleSmall} title={`Based on ${coaster.ratingCount} ratings`} onClick={scrollToRatings}>
                    <FontAwesomeIcon icon={faUser} className={classes.icon} /> {coaster.ratingCount}
                </span>
                <span className={classes.titleSmall} title={`${coaster.comments?.length} comments`} onClick={scrollToComments}>
                    <FontAwesomeIcon icon={faComment} className={classes.icon} /> {coaster.comments?.length}
                </span>
                { coaster.rank!! &&
                <span className={classes.titleSmall}>
                    <Separator /> <a>Ranked #{coaster.rank}</a>
                </span>}
                { coaster.goldenTicketAwards!! &&
                <span className={classes.titleSmall}>
                    <Separator /> <a>Won {coaster.goldenTicketAwards} awards</a>
                </span>}
            </div>
            <div className={classes.subTitleContainer} style={{ display: coaster.ratingAverage ? 'none' : 'initial' }}>
                <AsyncLoader size={15} />
            </div>
            <div className={classes.picsContainer}>
                {coaster.imgSrcList?.slice(0, 4).map((imgSrc) => (
                    <AsyncImage className={classes.pic} src={imgSrc} key={imgSrc} />
                ))}
                {
                    !coaster.imgSrcList && (
                        <>
                            <div className={`${asyncImageClasses.loader} ${classes.pic}`}></div>
                            <div className={`${asyncImageClasses.loader} ${classes.pic}`}></div>
                            <div className={`${asyncImageClasses.loader} ${classes.pic}`}></div>
                            <div className={`${asyncImageClasses.loader} ${classes.pic}`}></div>
                        </>
                    )
                }
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
                    <InfoField label="Age" value={coaster.AgeInYears} unit="years" />
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
                    {ratingTags.map((ratingTag) => (
                    <div className={classes.ratingTag} key={ratingTag.toString()}>
                        <div className={classes.ratingTagName}>{ratingTag.name}</div>
                        <div className={classes.ratingTagPerc}>({ratingTag.value}%)</div>
                        <div className={classes.ratingTagLine} style={{ width: `${ratingTag.value / 100 * ratingTagLineMaxWidth}px` }}></div>
                    </div>))}
                </div>
            </div>
            <div className={`${classes.pod} ${classes.seatsPod}`}>
                <CoasterTrainViewer train={coaster.train} primaryColor={coaster.ColorPrimary} secondaryColor={coaster.ColorSecondary} />
            </div>
            {coaster.userRating ? <span>Your rating: {coaster.userRating}&nbsp;<a>Update</a></span> : <a>Review this coaster</a>}
            <div className={`${classes.pod} ${classes.commentsPod}`} id="commentsContainer">
                {coaster.comments?.map((comment) => (
                <div className={classes.comment} key={comment.commentId}>
                    <div className={classes.commentAvatar}></div>
                    <div className={classes.fcommentTextWrapper}>
                        <div className={classes.commentUsername}>{comment.author}</div>
                        <div className={classes.commentTimestamp} title={comment.timestampStr}>{comment.timestampFromNow}</div>
                        <div className={classes.commentText}>{comment.body}</div>
                        <div className={classes.commentFooter}>
                            <FontAwesomeIcon icon={faThumbsUp} className={`${classes.commentLikeButton} ${classes.icon}`} /> {comment.likeCount}
                            <span className={classes.commentReplyButton}>Reply</span>
                        </div>
                    </div>
                </div>))}
                <FontAwesomeIcon icon={faAngleDown} className={`${classes.showMoreComments} ${classes.icon}`} title="Show more comments" />
            </div>
        </div>
    </>
}

export async function getStaticPaths() {
    // Pre-renders coaster page for each entry

    const res = await fetch('http://localhost:4040/coasters')
    const json = await res.json()

    return {
        paths: json.map(c => ({
            params: { id: c.CoasterId.toString() }
        })),
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    // Pre-fetches coaster page details for each entry

    const res = await fetch(`http://localhost:4040/coasters/${params.id}`)
    const json = await res.json()

    return {
        props: {
            coaster: json
        }
    }
}
