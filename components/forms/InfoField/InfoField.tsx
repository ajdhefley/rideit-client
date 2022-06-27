import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { AsyncLoader } from '../AsyncLoader/AsyncLoader'
import classes from './InfoField.module.scss'

export function InfoField({
    icon,
    label,
    value,
    unit,
    async = false,
    visible = true,
}: {
    icon?: IconProp,
    label: string,
    value: string | number,
    unit?: string,
    async?: boolean,
    visible?: boolean
}): JSX.Element {
    function getUnloadedField() {
        if (!async) {
            return <></>;
        }
        
        if (typeof(value) != 'undefined') {
            return <></>;
        }

        return (
            <div className={classes.statSection}>
                <span className={classes.statLabel}><AsyncLoader size={5} /></span>
                <span className={classes.statValue}><AsyncLoader size={10} /></span>
            </div>
        );
    }

    function getLoadedField() {
        if (!visible) {
            return <></>;
        }

        return (
            <div className={classes.statSection}>
                {icon && <span className={classes.statIcon}><FontAwesomeIcon icon={icon} /></span>}
                <span className={classes.statLabel}>{label}</span>
                <span className={classes.statValue}>{value} {unit}</span>
            </div>
        );
    }

    return label && value ? getLoadedField() : getUnloadedField()
}
