import { RockWrap } from "../../config";

/**
 * Special class, that allows you to send messages with headers.
 * @private
 */
class ConsoleManager {
    private constructor() {};

    /**
     * Sends a information in console.
     * @param message Content of a information.
     */
    public static info(message: any): void {
        console.info(RockWrap.config["@console"].info + message);
    };

    /**
     * Sends a warning to console.
     * @param message Content of a warning.
     */
    public static warn(message: any): void {
        console.warn(RockWrap.config["@console"].warn + message);
    };

    /**
     * Sends a debug message to console.
     * @param message Content of a debug message.
     */
    public static debug(message: any): void {
        console.debug(RockWrap.config["@console"].debug + message);
    };

    /**
     * Sends an error message to console.
     * @param message Content of an error.
     */
    public static error(message: any): void {
        console.error(RockWrap.config["@console"].error + message);
    };

    /**
     * Sends a basic messages, marked as log in console.
     * @param message Content of a message.
     */
    public static log(message: any): void {
        console.log(RockWrap.config["@console"].log + message);
    };
};

export { ConsoleManager };