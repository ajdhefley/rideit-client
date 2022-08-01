import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { AsyncLoader } from '../AsyncLoader/AsyncLoader'
import classes from './InfoField.module.scss'

/**
 * 
 **/
interface InfoFieldProps {
    /**
     * Icon displayed next to the label.
     **/
    icon?: IconProp;

    /**
     * The field's bolded label.
     **/
    label: string;

    /**
     * The field's value.
     **/
    value: string | number;

    /**
     * The field's unit (if applicable.)
     **/
    unit?: string;

    /**
     * Should display the field.
     **/
    visible?: boolean;
}

/**
 * A single piece of coaster information with a label and value.
 **/
export const InfoField: React.FC<InfoFieldProps> = ({ icon, label, value, unit = '', visible = true }) => {
    const finalValue = !value || value === 0 ? '-' : `${value} ${unit}`

    return <>
        <div className={classes.statSection} hidden={!visible}>
            {icon && <span className={classes.statIcon}><FontAwesomeIcon icon={icon} /></span>}
            <span className={classes.statLabel}>{label}</span>
            <span className={classes.statValue}>{finalValue}</span>
        </div>
    </>
}
