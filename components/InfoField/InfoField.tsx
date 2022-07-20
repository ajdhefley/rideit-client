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
     * Should display a loading placeholder if value is undefined.
     **/
    async?: boolean;

    /**
     * Should display the field.
     **/
    visible?: boolean;
}

/**
 * A single piece of coaster information with a label and value.
 **/
export const InfoField: React.FC<InfoFieldProps> = ({ icon, label, value, unit, async, visible }) => {
    function getUnloadedField() {
        // If not loaded and not async, don't show loading placeholder. Show nothing instead.
        if (!async) {
            return <></>
        }
        
        // If trying to get "unloaded field" but value is loaded, nothing to show here.
        if (typeof(value) != 'undefined') {
            return <></>
        }

        return <>
            <div className={classes.statSection}>
                <span className={classes.statLabel}><AsyncLoader size={5} /></span>
                <span className={classes.statValue}><AsyncLoader size={10} /></span>
            </div>
        </>
    }

    function getLoadedField() {
        // Show nothing if loaded but not visible.
        if (visible == false) {
            return <></>
        }

        return <>
            <div className={classes.statSection}>
                {icon && <span className={classes.statIcon}><FontAwesomeIcon icon={icon} /></span>}
                <span className={classes.statLabel}>{label}</span>
                <span className={classes.statValue}>{value} {unit}</span>
            </div>
        </>
    }

    return label && value ? getLoadedField() : getUnloadedField()
}
