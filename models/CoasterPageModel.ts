import moment from 'moment';
import { CoasterPageComment } from './CoasterPageComment';
import { CoasterTrain } from './CoasterTrain';

export class CoasterPageModel {
    Name: string;
    Park: string;
    HeightInFt: number;
    DropInFt: number;
    LengthInFt: number;
    SpeedInMph: number;
    Inversions: number;
    ColorPrimary: string;
    ColorSecondary: string;
    Type: string;
    Manufacturer: string;
    Model: string;
    OpeningDate: string;
    CloseDate: string;
    Location: string;
    AgeInYears: number;

    // get AgeInYears() {
    //     const opened = moment(this.OpeningDate, this.OpeningDate.length == 4 ? 'YYYY' : 'MM/dd/YYYY');
    //     const closed = this.CloseDate ? moment(this.CloseDate, this.CloseDate.length == 4 ? 'YYYY' : 'MM/dd/YYYY') : moment();
    //     const duration = moment.duration(closed.diff(opened));
    //     return Math.floor(duration.asYears());
    // }

    // TODO
    AngleInDegrees: number;
    imgSrcList: Array<string>;
    ratingAverage: number;
    ratingCount: number;
    rank: number;
    goldenTicketAwards: string;
    userRating: number;
    train: CoasterTrain;
    comments: CoasterPageComment[];
}
