import { CoasterImage } from './CoasterImage';
import { CoasterPageComment } from './CoasterPageComment';

export class CoasterPageModel {
    ImgList: CoasterImage[];
    CoasterId: number;
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
    CarsPerTrain: number;
    RowsPerCar: number;
    InsideSeatsPerRow: number;
    OutsideSeatsPerRow: number;
    EntrySide: 'right' | 'left';
    Url: string;

    get TotalRows() {
        return this.CarsPerTrain * this.RowsPerCar;
    }
    
    get TotalSeats() {
        return this.TotalRows * (this.InsideSeatsPerRow + this.OutsideSeatsPerRow);
    }

    // TODO
    AngleInDegrees: number;
    ratingAverage: number;
    ratingCount: number;
    rank: number;
    goldenTicketAwards: string;
    userRating: number;
    comments: CoasterPageComment[];
}
