import { RockWrap } from "../../config";

class ConsoleManager {
    private constructor() {};

    public static info(message: string) {
        console.info(RockWrap.config["@console"].info + message);
    };

    public static warn(message: string) {
        console.warn(RockWrap.config["@console"].warn + message);
    };

    public static debug(message: string) {
        console.debug(RockWrap.config["@console"].debug + message);
    };

    public static error(message: string) {
        console.error(RockWrap.config["@console"].error + message);
    };

    public static log(message: string) {
        console.log(RockWrap.config["@console"].log + message);
    };
};

export { ConsoleManager };