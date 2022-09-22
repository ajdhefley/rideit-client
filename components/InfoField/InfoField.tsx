import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from './InfoField.module.scss'
import { InfoFieldProps } from './InfoField.props'

/**
 * A single piece of coaster information with a label and value.
 **/
export const InfoField: React.FC<InfoFieldProps> = ({ icon, label, value, unit = '', visible = true }: InfoFieldProps) => {
    const finalValue = !value || value === 0 ? '-' : `${!isNaN(value as any) ? value.toLocaleString() : value} ${unit}`

    return <>
        <div className={classes.statSection} hidden={!visible}>
            {icon && <span className={classes.statIcon}><FontAwesomeIcon icon={icon} /></span>}
            <span className={classes.statLabel}>{label}</span>
            <span className={classes.statValue}>{finalValue}</span>
        </div>
    </>
}
