/**
 *  ------------------------------------
 *  ROCKWRAP: CONFIG
 *  ------------------------------------
 * 
 *  In this file you can mess around with our config.
 *  You can find more information about config at: https://github.com/syylaxx/RockWrap/blob/main/docs/config/index.md
 */

const rockWrapConfiguration = {
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
        /**
         * Default color of Discord embeds.
         * @type {number}
         * @default 0x000000
         */
        embeds: {
            color: 0x000000
        }
    },

    "@minecraft": {
        messages: {
            /**
             * Default prefix of messages sent via our wrapper.
             * @type {string}
             * @default "§8 » §7"
             */
            prefix: "§8 » §7"
        }
    },

    /**
     * Flags for special console of @rockwrap.
     * @remarks We do not recommend changing these values.
     */
    "@console": {
        error: "\x1b[31m[ERROR] ",
        warn: "\x1b[33m[WARN] ",
        info: "\x1b[314[INFO] ",
        log: "\x1b[32m[LOG] "
    }
};

export { rockWrapConfiguration };