import classes from './Button.module.scss'

/**
 * 
 **/
interface ButtonProps {
    /**
     * Inner JSX.
     **/
    children: React.ReactNode;
    
    /**
     * 
     **/
    className?: string;

    /**
     * 
     **/
    onClick?: () => void;
}

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
