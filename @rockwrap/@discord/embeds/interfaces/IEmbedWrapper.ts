import type { EmbedContentTypes } from "../types/EmbedContentTypes";
import { IRawEmbedField } from "./raw/IRawEmbedField";

interface IEmbedWrapper {
    type: "rich",
    title: EmbedContentTypes,
    descripion: EmbedContentTypes,
    color: number,
    fields: IRawEmbedField[]
};

export { IEmbedWrapper };