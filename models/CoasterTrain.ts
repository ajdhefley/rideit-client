export class CoasterTrain {
    numCars: number;
    numRowsPerCar: number;
    numInsideSeatsPerRow: number;
    numOutsideSeatsPerRow: number;
    entrySide: 'right' | 'left';

    get numRows() {
        return this.numCars * this.numRowsPerCar;
    }
    
    get numSeats() {
        return this.numRows * (this.numInsideSeatsPerRow + this.numOutsideSeatsPerRow);
    }
}
