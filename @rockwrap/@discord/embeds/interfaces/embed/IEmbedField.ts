import { EmbedContentTypes } from "../../types/EmbedContentTypes";

interface IEmbedField {
    name: string,
    content: EmbedContentTypes | EmbedContentTypes[],
    inline?: boolean
};

export { IEmbedField };