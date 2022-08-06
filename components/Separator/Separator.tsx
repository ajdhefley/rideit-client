import React from 'react'
import classes from './Separator.module.scss'

/**
 * 
 **/
interface SeparatorProps {
    /**
     * Custom styling.
     **/
     verticalAlign?: 'baseline'
        | 'bottom'
        | 'middle'
        | 'sub'
        | 'super'
        | 'text-bottom'
        | 'text-top'
        | 'top'
        | undefined;
}

/**
 * Inline symbol separating unrelated pieces of information on the same line.
 **/
export const Separator: React.FC<SeparatorProps> = ({ verticalAlign }: SeparatorProps) => {
    return <span className={classes.separator} style={{ verticalAlign }}>{String.fromCharCode(124)}</span>
}
