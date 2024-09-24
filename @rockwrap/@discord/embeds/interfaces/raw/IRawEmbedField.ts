/**
 * Raw embed. Consider using IEmbedField interface instead.
 */

interface IRawEmbedField {
    /**
     * Title of a field. 
     */
    name: string,
    
    /**
     * Content of a field.
     */
    value: string,
    
    /**
     * If field should be in-line with other ones. 
     */
    inline: boolean
};

export { IRawEmbedField };