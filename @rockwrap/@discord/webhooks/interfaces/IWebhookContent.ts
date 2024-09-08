import { EmbedWrapper } from "../../embeds/EmbedWrapper";
import { IEmbedWrapper } from "../../embeds/interfaces/IEmbedWrapper";

interface IWebhookContent {
    content?: string,
    embeds: (EmbedWrapper | IEmbedWrapper)[]
};

export { IWebhookContent };