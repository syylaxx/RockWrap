import { EmbedWrapper } from "../../embeds/EmbedWrapper";
import { IEmbedWrapper } from "../../embeds/interfaces/IEmbedWrapper";

/**
 * Fixed structure of a webhook.
 * @throws If you will not provide any of these parameters, request might throw an error.
 */
interface IWebhookContent {
    /**
     * Content of a message.
     */
    content?: string,

    /**
     * Embeds in this message.
     */
    embeds?: (EmbedWrapper | IEmbedWrapper)[]
};

export { IWebhookContent };