import { RockWrap } from "../../RockWrap";
import { IEmbedField } from "./interfaces/embed/IEmbedField";
import { IEmbedWrapper } from "./interfaces/IEmbedWrapper";
import type { EmbedContentTypes } from "./types/EmbedContentTypes";

class EmbedWrapper {
    private embedTitle: EmbedContentTypes = null;
    private embedDescription: EmbedContentTypes = null;
    private embedColor: number = RockWrap.config["@discord"].embeds.color;
    private embedFields: IEmbedField[] = [];

    public setTitle(title: EmbedContentTypes): EmbedWrapper {
        this.embedTitle = title;
        return this;  
    };

    public setDescription(description: EmbedContentTypes | EmbedContentTypes[]): EmbedWrapper {
        this.embedDescription = Array.isArray(description) ? description.filter((content: EmbedContentTypes) => content !== null).join("\n") : description;
        return this;
    };

    public setColor(color: number): EmbedWrapper {
        this.embedColor = color;
        return this;
    };

    public addFields(...fields: IEmbedField[]): EmbedWrapper {
        this.embedFields.push(...fields);
        return this;
    };

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