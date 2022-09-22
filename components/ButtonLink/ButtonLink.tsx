import { Button } from '../Button/Button'
import classes from './ButtonLink.module.scss'
import { ButtonLinkProps } from './ButtonLink.props'

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
