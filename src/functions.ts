import { DeepPartial } from "./types";

export function mergeObjects<T extends object>(existing: T, incoming: Partial<T>): T {
	let result = { ...existing }

	for (let k in incoming) {
		if (incoming.hasOwnProperty(k)) {
			const value = incoming[k] as any
			if (value !== undefined) {
				result[k] = value
			} else {
				delete result[k]
			}
		}
	}

	return result
}

export function deepMergeObjects<T extends object>(existing: T, incoming: DeepPartial<T>): T {
	let result = { ...existing }

	for (let k in incoming) {
		if (incoming.hasOwnProperty(k)) {
			const value = incoming[k] as any
			if (value !== undefined) {
				if (typeof value === 'object') {
					result[k] = deepMergeObjects(result[k] as any, value) as any
				} else {
					result[k] = value
				}
			} else {
				delete result[k]
			}
		}
	}

	return result
}
