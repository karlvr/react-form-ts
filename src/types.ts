/** Convert an interface so that all array properties turn into their component type, and non-array properties turn to never. */
export type ArrayProperties<T> = {
	[P in keyof T]-?: Required<T>[P] extends (infer R)[] ? R
	: never
}

/* The set of key names that are array properties */
export type ArrayKeys<T> = {
	[K in keyof T]-?: Required<T>[K] extends (infer R)[] ? K : never
}[keyof T]

export type Combined<SOURCE, PATCH> = {
	[P in keyof SOURCE & keyof PATCH]: SOURCE[P] & PATCH[P]
}

/** Type is undefined if the given type can be undefined, otherwise never. */
export type UndefinedIfUndefined<T> = T extends undefined | null ? undefined : never
