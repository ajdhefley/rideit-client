import React from 'react'
import { SeparatorProps } from './Separator.props'
import classes from './Separator.module.scss'

/**
 * Inline symbol separating unrelated pieces of information on the same line.
 **/
export const Separator: React.FC<SeparatorProps> = ({ verticalAlign }: SeparatorProps) => {
    return <span className={classes.separator} style={{ verticalAlign }}>{String.fromCharCode(124)}</span>
}
