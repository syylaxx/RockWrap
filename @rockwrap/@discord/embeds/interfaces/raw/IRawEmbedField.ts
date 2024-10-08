/**
 * Raw embed. Consider using IEmbedField interface instead.
 */
interface IRawEmbedField {
    /**
     * Title of a field. 
     */
    readonly name: string,
    
    /**
     * Content of a field.
     */
    readonly value: string,
    
    /**
     * If field should be in-line with other ones. 
     * @default false
     */
    readonly inline: boolean
};

export { IRawEmbedField };