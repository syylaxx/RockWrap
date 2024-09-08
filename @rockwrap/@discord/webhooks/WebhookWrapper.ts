import { http, HttpHeader, HttpRequest, HttpRequestMethod } from "@minecraft/server-net";
import { IWebhookContent } from "./interfaces/IWebhookContent";
import { IEmbedWrapper } from "../embeds/interfaces/IEmbedWrapper";
import { EmbedWrapper } from "../embeds/EmbedWrapper";

class WebhookWrapper {
    private constructor() {};

    public static sendWebhook(uri: string, { content = "", embeds = [] }: IWebhookContent): void {
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