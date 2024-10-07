import { EmbedContentTypes } from "../../types/EmbedContentTypes";

/**
 * Interface, which is a fixed structure of an embed field.
 * @example
 * ```ts
 * import { EmbedWrapper } from "@rockwrap/discord";
 * 
 * const embed = new EmbedWrapper();
 * embed.addFields({
 *      name: "Name of a field.",
 *      content: [
 *          "Description of a field."
 *      ],
 * 
 *      // If embed should be displayed in grid with other ones.
 *      inline: false
 * });
 * ```
 */
interface IEmbedField {
    /**
     * Title of a field.
     */
    readonly name: string,

    /**
     * Content of a field.
     * If content is an array, null values are ignored.
     */
    readonly content: EmbedContentTypes | EmbedContentTypes[],

    /**
     * If field should be in-line with other ones.
     * @default false
     */
    readonly inline?: boolean
};

export { IEmbedField };