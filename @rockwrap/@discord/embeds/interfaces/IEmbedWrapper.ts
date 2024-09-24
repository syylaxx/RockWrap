import type { EmbedContentTypes } from "../types/EmbedContentTypes";
import { IRawEmbedField } from "./raw/IRawEmbedField";

interface IEmbedWrapper {
    /**
     * Type of a embed.
     * Keep it "rich" at this moment.
     */
    type: "rich",

    /**
     * Title of a embed.
     * `null` means no title.
     */
    title: EmbedContentTypes,

    /**
     * Description of a embed. 
     * `null` means no description.
     */
    descripion: EmbedContentTypes,

    /**
     * Color of a embed.
     * Default color you can configure using `@rockwrap/config`.
     */
    color: number,

    /**
     * Fields of a embed.
     */
    fields: IRawEmbedField[]
};

export { IEmbedWrapper };