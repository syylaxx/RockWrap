type CallbackType<T> = {
    identifier: string,
    event: any,
    isSubscribed: boolean,
    callbacks: ((args: T) => void)[]
};

export { CallbackType };