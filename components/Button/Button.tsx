import classes from './Button.module.scss'
import { ButtonProps } from './Button.props'

/**
 * 
 **/
export const Button: React.FC<ButtonProps> = ({ children, className = 'button', onClick }: ButtonProps) => {
    return <>
        <div className={`${classes.button} ${className}`} onClick={onClick}>
            {children}
        </div> 
    </>
}
