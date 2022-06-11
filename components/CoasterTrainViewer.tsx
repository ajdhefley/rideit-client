import { CoasterTrain } from '../models/CoasterTrain'
import classes from './CoasterTrainViewer.module.scss'

export default function CoasterPageSeatViewer({
    train,
    primaryColor,
    secondaryColor
}: {
    train: CoasterTrain,
    primaryColor: string,
    secondaryColor: string
}): JSX.Element {
    const carContainerStyle = { 
        gridTemplateColumns: Array.from({ length: train?.numCars }).map(() => 'auto').join(' ')
    }

    const rowContainerStyle = { 
        gridTemplateColumns: Array.from({ length: train?.numRowsPerCar }).map(() => 'auto').join(' ')
    }

    const rowNumContainerStyle = { 
        top: ((train?.numInsideSeatsPerRow + train?.numOutsideSeatsPerRow) * 30) + 'px'
    }

    const carInsideStyle = {
        background: primaryColor
    }

    const seatStyle = {
        background: secondaryColor
    }

    return (
        <>
            <div className={classes.seatViewer} style={carContainerStyle}>
                {[...Array(train?.numCars)].map((x, carIndex) =>
                    <div className={classes.car} key={carIndex} style={rowContainerStyle}>
                        {[...Array(train?.numRowsPerCar)].map((x, rowIndex) =>
                            <div key={rowIndex} className={classes.rowContainer}>
                                {train?.numOutsideSeatsPerRow > 0 &&
                                <div>
                                    {[...Array((train?.numOutsideSeatsPerRow || 0) / 2)].map((x, i) =>
                                        <div className={classes.seat} style={seatStyle} key={i}></div>
                                    )}
                                </div>}
                                <div className={classes.carInside} style={carInsideStyle}>
                                    {[...Array(train?.numInsideSeatsPerRow || 0)].map((x, i) =>
                                        <div className={classes.seat} style={seatStyle} key={i}></div>
                                    )}
                                </div>
                                {train?.numOutsideSeatsPerRow > 0 &&
                                <div>
                                    {[...Array((train?.numOutsideSeatsPerRow) / 2)].map((x, i) =>
                                        <div className={classes.seat} style={seatStyle} key={i}></div>
                                    )}
                                </div>}
                                <div className={classes.rowNum} style={rowNumContainerStyle}>{(carIndex + 1)}-{rowIndex+1}</div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}
