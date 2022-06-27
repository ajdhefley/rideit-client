import { CoasterPageModel } from '../../models/CoasterPageModel'
import classes from './coasterTrainViewer.module.scss'

export default function CoasterPageSeatViewer({
    coaster,
    primaryColor,
    secondaryColor
}: {
    coaster: CoasterPageModel,
    primaryColor: string,
    secondaryColor: string
}): JSX.Element {
    const carContainerStyle = { 
        gridTemplateColumns: Array.from({ length: coaster?.CarsPerTrain }).map(() => 'auto').join(' ')
    }

    const rowContainerStyle = { 
        gridTemplateColumns: Array.from({ length: coaster?.RowsPerCar }).map(() => 'auto').join(' ')
    }

    const rowNumContainerStyle = { 
        top: ((coaster?.InsideSeatsPerRow + coaster?.OutsideSeatsPerRow) * 30) + 'px'
    }

    const carInsideStyle = {
        background: primaryColor
    }

    const seatStyle = {
        background: secondaryColor
    }

    return <>
        <div className={classes.seatViewer} style={carContainerStyle}>
            {[...Array(coaster?.CarsPerTrain)].map((x, carIndex) =>
                <div className={classes.car} key={carIndex} style={rowContainerStyle}>
                    {[...Array(coaster?.RowsPerCar)].map((x, rowIndex) =>
                        <div key={rowIndex} className={classes.rowContainer}>
                            {coaster?.OutsideSeatsPerRow > 0 &&
                            <div>
                                {[...Array((coaster?.OutsideSeatsPerRow || 0) / 2)].map((x, i) =>
                                    <div className={classes.seat} style={seatStyle} key={i}></div>
                                )}
                            </div>}
                            <div className={classes.carInside} style={carInsideStyle}>
                                {[...Array(coaster?.InsideSeatsPerRow || 0)].map((x, i) =>
                                    <div className={classes.seat} style={seatStyle} key={i}></div>
                                )}
                            </div>
                            {coaster?.OutsideSeatsPerRow > 0 &&
                            <div>
                                {[...Array((coaster?.OutsideSeatsPerRow) / 2)].map((x, i) =>
                                    <div className={classes.seat} style={seatStyle} key={i}></div>
                                )}
                            </div>}
                            <div className={classes.rowNum} style={rowNumContainerStyle}>{(carIndex + 1)}-{rowIndex+1}</div>
                        </div>
                    )}
                </div>
            )}
        </div>
    </>;
}
