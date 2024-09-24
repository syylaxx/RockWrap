import { RockWrap } from "../../config";
import { IEmbedField } from "./interfaces/embed/IEmbedField";
import { IEmbedWrapper } from "./interfaces/IEmbedWrapper";
import type { EmbedContentTypes } from "./types/EmbedContentTypes";

class EmbedWrapper {
    private embedTitle: EmbedContentTypes = null;
    private embedDescription: EmbedContentTypes = null;
    private embedColor: number = RockWrap.config["@discord"].embeds.color;
    private embedFields: IEmbedField[] = [];

    /**
     * Sets a title for this embed.
     * @param title Title of a embed.
     * @returns Instance of this class.
     */
    public setTitle(title: EmbedContentTypes): EmbedWrapper {
        this.embedTitle = title;
        return this;  
    };

    /**
     * Sets a description for this embed.
     * @param description Description of a embed.
     * @returns Instance of this class.
     */
    public setDescription(description: EmbedContentTypes | EmbedContentTypes[]): EmbedWrapper {
        this.embedDescription = Array.isArray(description) ? description.filter((content: EmbedContentTypes) => content !== null).join("\n") : description;
        return this;
    };

    /**
     * Sets a color for this embed.
     * @param color Color of a embed. Provide this value in HEX.
     * @returns Instance of this class.
     */
    public setColor(color: number): EmbedWrapper {
        this.embedColor = color;
        return this;
    };

    /**
     * Adds field to your embed.
     * @param fields Field to add.
     * @returns Instance of this class.
     */
    public addFields(...fields: IEmbedField[]): EmbedWrapper {
        this.embedFields.push(...fields);
        return this;
    };

    /**
     * JSON data, which is required to send a webhook.
     * @returns JSON object of a raw embed.
     */
    public toJSON(): IEmbedWrapper {
        return {
            type: "rich",
            title: this.embedTitle,
            descripion: this.embedDescription,
            color: this.embedColor,
            fields: this.embedFields.map(({ name, content, inline = false }: IEmbedField) => {
                return {
                    name, inline,
                    value: Array.isArray(content) ? content.filter((line: EmbedContentTypes) => line !== null).join("\n") : content
                };
            })
        };
    };
};

export { EmbedWrapper };