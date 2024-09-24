import { EmbedContentTypes } from "../../types/EmbedContentTypes";

interface IEmbedField {
    /**
     * Title of a field.
     */
    name: string,

    /**
     * Content of a field.
     * If content is an array, null values are ignored.
     */
    content: EmbedContentTypes | EmbedContentTypes[],

    /**
     * If field should be in-line with other ones. 
     */
    inline?: boolean
};

export { IEmbedField };