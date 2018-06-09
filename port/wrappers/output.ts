export function error(message?: any, ...params: any[]) {
    console.error(message, params);
}

export function trace(message?: any, ...params: any[]) {
    console.trace(message, params);
}