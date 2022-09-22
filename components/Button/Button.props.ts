/**
 * 
 **/
export interface ButtonProps {
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