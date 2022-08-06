import { Button } from '../Button/Button';
import classes from './ButtonLink.module.scss'

/**
 * 
 **/
interface ButtonLinkProps {
    /**
     * 
     **/
    href: string;

    /**
     * Inner JSX.
     **/
    children: React.ReactNode;
}

/**
 * 
 **/
export const ButtonLink: React.FC<ButtonLinkProps> = ({ href, children }: ButtonLinkProps) => {
    return <>
        <a href={href}>
            <Button>{children}</Button>
        </a> 
    </>
}
