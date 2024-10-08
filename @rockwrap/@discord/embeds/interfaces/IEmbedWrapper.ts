import type { EmbedContentTypes } from "../types/EmbedContentTypes";
import { IRawEmbedField } from "./raw/IRawEmbedField";

/**
 * JSON structure of an embed.
 */
interface IEmbedWrapper {
    /**
     * Type of a embed.
     * Keep it "rich" at this moment.
     */
    readonly type: "rich",

    /**
     * Title of a embed.
     * `null` means no title.
     */
    readonly title: EmbedContentTypes,

    /**
     * Description of a embed. 
     * `null` means no description.
     */
    readonly descripion: EmbedContentTypes,

    /**
     * Color of a embed.
     * @remarks Default color you can configure using `@rockwrap/config`.
     * @default rockWrapConfiguration["@discord"].embeds.color
     */
    readonly color: number,

    /**
     * Fields of a embed.
     */
    readonly fields: IRawEmbedField[]
};

export { IEmbedWrapper };