import { http, HttpHeader, HttpRequest, HttpRequestMethod } from "@minecraft/server-net";
import { IWebhookContent } from "./interfaces/IWebhookContent";
import { IEmbedWrapper } from "../embeds/interfaces/IEmbedWrapper";
import { EmbedWrapper } from "../embeds/EmbedWrapper";
import { RockWrap } from "../../config";

class WebhookWrapper {
    private constructor() {};

    /**
     * Send webhooks on Discord channels.
     * @param uri URL of a webhook.
     * @param param1 Content of message.
     * @throws Function can throw error if you have not added `@minecraft/server-net` to your modules in config, or request was not send correct.
     */
    public static sendWebhook(uri: string, { content = "", embeds = [] }: IWebhookContent): void {
        if (!RockWrap.config["@server"].modules.includes("@minecraft/server-net")) throw new Error("ModuleError: You cannot use WebhookWrapper, if you have not added @minecraft/server-net to you modules.");
        if (!content && embeds.length === 0) throw new Error("DataError: You must provide content ");

        try {
            http.request(
                new HttpRequest(uri)
                    .setBody(JSON.stringify({
                        content,
                        embeds: embeds.map((embed: IEmbedWrapper | EmbedWrapper) => embed instanceof EmbedWrapper ? embed.toJSON() : embed)
                    }))

                    .setHeaders([
                        new HttpHeader("Content-Type", "application/json"),
                        new HttpHeader("Accept", "application/json")
                    ])

                    .setMethod(HttpRequestMethod.Post)
            );
        } catch {};
    };
};

export { WebhookWrapper };