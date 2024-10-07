import { EmbedWrapper } from "../../embeds/EmbedWrapper";
import { IEmbedWrapper } from "../../embeds/interfaces/IEmbedWrapper";

/**
 * Fixed structure of a webhook.
 * @throws If you will not provide any of these parameters, request might throw an error.
 * @remarks You have to provide one of these parameters.
 */
interface IWebhookContent {
    /**
     * Content of a message.
     * @readonly
     */
    readonly content?: string,

    /**
     * Embeds in this message.
     * @readonly
     */
    readonly embeds?: (EmbedWrapper | IEmbedWrapper)[]
};

export { IWebhookContent };