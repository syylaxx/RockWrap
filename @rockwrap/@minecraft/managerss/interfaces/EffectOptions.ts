interface EffectOptions { 
    /**
     * Duration of an effect.
     * @default 400 ticks. (20 seconds)
     */
    duration?: number, 

    /**
     * Amplifier (level) of an effect.
     * @default 0 (base).
     */
    amplifier?: number, 

    /**
     * If effect should show particles.
     * @default true
     */
    showParticles?: boolean, 

    /**
     * If this effect should be infinite.
     * @default false
     */
    infinity?: boolean 
};

export { EffectOptions };