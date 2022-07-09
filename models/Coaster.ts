import { CoasterImage } from './CoasterImage'
import { CoasterComment } from './CoasterComment'

export class Coaster {
    coasterId: number;
    name: string;
    park: string;
    heightInFt: number;
    dropInFt: number;
    lengthInFt: number;
    speedInMph: number;
    inversions: number;
    colorPrimary: string;
    colorSecondary: string;
    type: string;
    manufacturer: string;
    model: string;
    openingDate: string;
    closeDate: string;
    location: string;
    ageInYears: number;
    carsPerTrain: number;
    rowsPerCar: number;
    insideSeatsPerRow: number;
    outsideSeatsPerRow: number;
    url: string;
    images: CoasterImage[];

    get totalRows() {
        return this.carsPerTrain * this.rowsPerCar;
    }
    
    get totalSeats() {
        return this.totalRows * (this.insideSeatsPerRow + this.outsideSeatsPerRow);
    }

    // TODO
    angleInDegrees: number;
    ratingAverage: number;
    ratingCount: number;
    rank: number;
    goldenTicketAwards: string;
    userRating: number;
    comments: CoasterComment[];
}
