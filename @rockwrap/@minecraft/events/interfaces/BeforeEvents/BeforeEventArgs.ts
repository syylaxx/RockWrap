interface BeforeEventArgs {
    /**
     * Cancels out an event default interaction.
     * @returns Function returns void.
     */
    readonly cancelEvent: () => void
};

export { BeforeEventArgs };