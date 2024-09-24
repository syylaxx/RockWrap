/**
 *  ------------------------------------
 *  ROCKWRAP: CONFIG
 *  ------------------------------------
 * 
 *  In this file you can mess around with our config.
 *  You can find more information about config at: https://github.com/syylaxx/RockWrap/blob/main/docs/config/index.md
 */

const rockWrapConfiguration = Object.freeze({
    "@server": {
        /**
         * Activated modules on your world or server.
         * This might be required to use some of our modules.
         * @default 
         * ```json
         *  [
         *      "@minecraft/server", 
         *      "@minecraft/server-ui"
         *  ]
         * ```
         */
        modules: [
            "@minecraft/server",
            "@minecraft/server-ui"
        ]
    },

    "@discord": {
        embeds: {
            color: 0x000000
        }
    },

    "@minecraft": {
        messages: {
            prefix: "§8 » §7"
        }
    },

    "@console": {
        debug: "[DEBUG] ",
        error: "[ERROR] ",
        warn: "[WARN] ",
        info: "[INFO] ",
        log: "[LOG] "
    }
});

export { rockWrapConfiguration };