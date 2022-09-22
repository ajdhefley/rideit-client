import { IconProp } from '@fortawesome/fontawesome-svg-core';

/**
 * 
 **/
export interface InfoFieldProps {
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