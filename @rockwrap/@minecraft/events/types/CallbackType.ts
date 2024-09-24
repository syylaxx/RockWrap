type CallbackType<T> = {
    identifier: string,
    event: string,
    isSubscribed: boolean,
    callbacks: ((args: T) => void)[]
};

export { CallbackType };