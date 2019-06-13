/** Convert an interface so that all array properties turn into their component type, and non-array properties turn to never. */
export declare type ArrayProperties<T> = {
    [P in keyof T]-?: Required<T>[P] extends (infer R)[] ? R : never;
};
export declare type ArrayKeys<T> = {
    [K in keyof T]-?: Required<T>[K] extends (infer R)[] ? K : never;
}[keyof T];
export declare type ObjectKeys<T> = {
    [K in keyof T]-?: Required<T>[K] extends object ? K : never;
}[keyof T];
export declare type ObjectProps<T> = {
    [K in keyof T]-?: Required<T>[K] extends object ? T[K] : never;
};
export declare type Combined<SOURCE, PATCH> = {
    [P in keyof SOURCE & keyof PATCH]: SOURCE[P] & PATCH[P];
};
/** Type is undefined if the given type can be undefined, otherwise never. */
export declare type UndefinedIfUndefined<T> = T extends undefined | null ? undefined : never;
export declare type DeepPartial<T> = {
    [K in keyof T]?: T extends object ? DeepPartial<T[K]> : T[K];
};
