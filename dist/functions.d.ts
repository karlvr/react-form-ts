import { DeepPartial } from "./types";
export declare function mergeObjects<T extends object>(existing: T, incoming: Partial<T>): T;
export declare function deepMergeObjects<T extends object>(existing: T, incoming: DeepPartial<T>): T;
