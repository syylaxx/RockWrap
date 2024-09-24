import { RockWrap } from "../../config";

class ConsoleManager {
    private constructor() {};

    public static info(message: any) {
        console.info(RockWrap.config["@console"].info + message);
    };

    public static warn(message: any) {
        console.warn(RockWrap.config["@console"].warn + message);
    };

    public static debug(message: any) {
        console.debug(RockWrap.config["@console"].debug + message);
    };

    public static error(message: any) {
        console.error(RockWrap.config["@console"].error + message);
    };

    public static log(message: any) {
        console.log(RockWrap.config["@console"].log + message);
    };
};

export { ConsoleManager };