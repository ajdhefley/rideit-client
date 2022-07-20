import React from 'react'
import { Coaster } from '../../models/Coaster'
import classes from './CoasterTrainViewer.module.scss'

/**
 * 
 **/
 interface CoasterTrainViewerProps {
    /**
     * Contains train data for the coaster needed to determine number of rows and seats.
     **/
    coaster: Coaster;

    /**
     * Color of the train background.
     **/
    primaryColor: string;
    
    /**
     * Color of the train seats.
     **/
    secondaryColor: string;
}

/**
 * Widget used to rate the best seat on a coaster. Dynamically renders train based on coaster model/manufacturer.
 **/
export const CoasterTrainViewer: React.FC<CoasterTrainViewerProps> = ({ coaster, primaryColor, secondaryColor }) => {
    const carContainerStyle = { 
        gridTemplateColumns: Array.from({ length: coaster?.carsPerTrain ?? 1 }).map(() => 'auto').join(' ')
    }

    const rowContainerStyle = { 
        gridTemplateColumns: Array.from({ length: coaster?.rowsPerCar ?? 1 }).map(() => 'auto').join(' ')
    }

    const rowNumContainerStyle = { 
        top: ((coaster?.insideSeatsPerRow + coaster?.outsideSeatsPerRow) * 30) + 'px'
    }

    const carInsideStyle = {
        background: primaryColor
    }

    const seatStyle = {
        background: secondaryColor
    }

    return <>
        <div className={classes.seatViewer} style={carContainerStyle}>
            {[...Array(coaster?.carsPerTrain)].map((x, carIndex) =>
                <div className={classes.car} key={carIndex} style={rowContainerStyle}>
                    {[...Array(coaster?.rowsPerCar)].map((x, rowIndex) =>
                        <div key={rowIndex} className={classes.rowContainer}>
                            {coaster?.outsideSeatsPerRow > 0 &&
                            <div>
                                {[...Array((coaster?.outsideSeatsPerRow || 0) / 2)].map((x, i) =>
                                    <div className={classes.seat} style={seatStyle} key={i}></div>
                                )}
                            </div>}
                            <div className={classes.carInside} style={carInsideStyle}>
                                {[...Array(coaster?.insideSeatsPerRow || 0)].map((x, i) =>
                                    <div className={classes.seat} style={seatStyle} key={i}></div>
                                )}
                            </div>
                            {coaster?.outsideSeatsPerRow > 0 &&
                            <div>
                                {[...Array((coaster?.outsideSeatsPerRow) / 2)].map((x, i) =>
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
}
