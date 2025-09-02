interface IEnv {
    BACKEND_URL: string;
}

export const getEnvs = (): IEnv => {
    return {
        BACKEND_URL: import.meta.env.VITE_BACKEND_URL
    };
}