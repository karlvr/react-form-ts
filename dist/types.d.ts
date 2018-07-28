export declare type ArrayProperties<T> = {
    [P in keyof T]: T[P] extends (infer R)[] ? R : never;
};
export declare type Combined<SOURCE, PATCH> = {
    [P in keyof SOURCE & keyof PATCH]: SOURCE[P] & PATCH[P];
};
