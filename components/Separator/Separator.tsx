import React from 'react'

/**
 * 
 **/
interface SeparatorProps {

}

/**
 * Inline symbol separating unrelated pieces of information on the same line.
 **/
export const Separator: React.FC<SeparatorProps> = () => {
    return <span>{String.fromCharCode(8901)}</span>
}
