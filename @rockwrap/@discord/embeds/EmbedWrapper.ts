import { RockWrap } from "../../RockWrap";
import { IEmbedWrapper } from "./interfaces/IEmbedWrapper";
import type { EmbedContentTypes } from "./types/EmbedContentTypes";

class EmbedWrapper {
    private embedTitle: EmbedContentTypes = null;
    private embedDescription: EmbedContentTypes = null;
    private embedColor: number = RockWrap["@discord"].embeds.color;

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

    public toJSON(): IEmbedWrapper {
        return {
            type: "rich",
            title: this.embedTitle,
            descripion: this.embedDescription,
            color: this.embedColor
        };
    };
};

export { EmbedWrapper };