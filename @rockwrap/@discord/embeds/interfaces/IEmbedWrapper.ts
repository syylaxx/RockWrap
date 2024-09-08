import type { EmbedContentTypes } from "../types/EmbedContentTypes";

interface IEmbedWrapper {
    type: "rich",
    title: EmbedContentTypes,
    descripion: EmbedContentTypes,
    color: number,
};

export { IEmbedWrapper };