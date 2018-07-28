export type ArrayProperties<T> = {
	[P in keyof T]: T[P] extends (infer R)[] ? R
	: never
}

export type Combined<SOURCE, PATCH> = {
	[P in keyof SOURCE & keyof PATCH]: SOURCE[P] & PATCH[P]
}
