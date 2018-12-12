import { FormState } from './FormState'
import { ArrayProperties, Combined, ArrayKeys } from './types';

/**
 * A class to assist with a form that creates a patch request for an object.
 * 
 * SOURCE is the type of the original object. PATCH is the type of the patch request, which
 * should have every property as optional.
 * 
 * This object is immutable, so it is suitable to be put into a React component state.
 */
export class PatchFormState<SOURCE, PATCH> implements FormState<Combined<SOURCE, PATCH>> {

	private source: SOURCE
	private patch: PATCH

	constructor(source: SOURCE, patch: PATCH) {
		this.source = source
		this.patch = patch
	}

	/**
	 * Return the value of the given property from the patch, or from the source.
	 * @param name Property name
	 */
	get<PROPERTY extends keyof Combined<SOURCE, PATCH>>(name: PROPERTY, defaultValue?: Combined<SOURCE, PATCH>[PROPERTY]): Combined<SOURCE, PATCH>[PROPERTY] {
		const value = this.patch[name]
		if (value !== undefined) {
			return value as Combined<SOURCE, PATCH>[PROPERTY]
		}

		const sourceValue = this.source[name] as {} as PATCH[PROPERTY]
		if (sourceValue !== undefined) {
			return sourceValue as Combined<SOURCE, PATCH>[PROPERTY]
		}

		if (defaultValue !== undefined) {
			return defaultValue
		}

		return value
	}

	/**
	 * Return a new form state with the value of the given property set in the patch. If the patch value exactly
	 * matches the source value, the value in the patch is cleared.
	 * @param name Property name
	 * @param value New value
	 */
	set<PROPERTY extends keyof Combined<SOURCE, PATCH>>(name: PROPERTY, value: Combined<SOURCE, PATCH>[PROPERTY] | undefined): PatchFormState<SOURCE, PATCH> {
		return this.merge({ [name]: value } as {} as Partial<Combined<SOURCE, PATCH>>)
	}

	push<P extends ArrayKeys<Combined<SOURCE, PATCH>>>(name: P, value: ArrayProperties<Combined<SOURCE, PATCH>>[P]): PatchFormState<SOURCE, PATCH> {
		let array = this.patch[name] as any as Array<ArrayProperties<Combined<SOURCE, PATCH>>[P]>
		if (array) {
			array = [...array]
		} else {
			array = []
		}

		array.push(value)
		return this.set(name, array as any as Combined<SOURCE, PATCH>[P])
	}

	splice<P extends ArrayKeys<Combined<SOURCE, PATCH>>>(name: P, start: number, deleteCount?: number, ...values: Array<ArrayProperties<Combined<SOURCE, PATCH>>[P]>): PatchFormState<SOURCE, PATCH> {
		let array = this.patch[name] as any as Array<ArrayProperties<Combined<SOURCE, PATCH>>[P]>
		if (array) {
			array = [...array]
		} else {
			return this
		}

		if (deleteCount !== undefined) {
			array.splice(start, deleteCount, ...values)
		} else {
			array.splice(start)
		}
		return this.set(name, array as any as Combined<SOURCE, PATCH>[P])
	}

	apply(func: (form: Combined<SOURCE, PATCH>) => Combined<SOURCE, PATCH>): PatchFormState<SOURCE, PATCH> {
		let form = this.getValuesCopy()
		form = func(form)
		return new PatchFormState<SOURCE, PATCH>(this.source, form as {} as PATCH)
	}

	/**
	 * Return a new form state with the values from the given patch merged in to this state.
	 * @param other A patch object
	 */
	merge(other: Partial<Combined<SOURCE, PATCH>>): PatchFormState<SOURCE, PATCH> {
		let patch = this.getValuesCopy()
		for (let k in other) {
			if (other.hasOwnProperty(k)) {
				const otherValue = (other as any)[k]
				if (otherValue === (this.source as any)[k] || otherValue === undefined) {
					delete (patch as any)[k]
				} else {
					(patch as any)[k] = (other as any)[k]
				}
			}
		}

		return new PatchFormState<SOURCE, PATCH>(this.source, patch as {} as PATCH)
	}

	/**
	 * Returns a copy of the current patch state.
	 */
	getValues(): Combined<SOURCE, PATCH> {
		return this.patch as any
	}

	getValuesCopy(): Combined<SOURCE, PATCH> {
		return { ...(this.patch as {}) } as Combined<SOURCE, PATCH>
	}

	isSame(other: FormState<Combined<SOURCE, PATCH>>): boolean {
		return this.getValues() === other.getValues()
	}

	/**
	 * Returns true if the patch is empty.
	 */
	isEmpty(): boolean {
		for (let k in this.patch) {
			if (this.patch.hasOwnProperty(k)) {
				if (this.patch[k] !== undefined) {
					return false
				}
			}
		}
		return true
	}

	sub<SUBSOURCE, SUBPATCH>(func: (form: Combined<SOURCE, PATCH>) => Combined<SUBSOURCE, SUBPATCH>): PatchFormState<SUBSOURCE, SUBPATCH> {
		const patch = this.getValues()
		const source = { ...(this.source as {})} as SOURCE
		const subsource = func(source as {} as Combined<SOURCE, PATCH>) as {} as SUBSOURCE
		const subpatch = func(patch) as {} as SUBPATCH
		return new PatchFormState(subsource, subpatch)
	}

	subProperty<P extends keyof Combined<SOURCE, PATCH>>(name: P, defaultValue?: PATCH[P]): PatchFormState<SOURCE[P], Required<PATCH>[P]> {
		const form = this.getValues()
		if (form[name] !== undefined) {
			return new PatchFormState(this.source[name], form[name])
		} else if (defaultValue !== undefined) {
			return new PatchFormState(this.source[name], defaultValue)
		} else {
			return new PatchFormState(this.source[name], {} as PATCH[P])
		}
	}

	subIndexProperty<P extends ArrayKeys<Combined<SOURCE, PATCH>>>(name: P, index: number): PatchFormState<ArrayProperties<SOURCE>[P], ArrayProperties<Required<PATCH>>[P]> {
		const form = this.getValues()
		const formArray = form[name] as any as Array<ArrayProperties<Combined<SOURCE, PATCH>>[P]>
		const sourceArray = this.source[name] as any as Array<ArrayProperties<SOURCE>[P]>
		return new PatchFormState(sourceArray[index], formArray !== undefined ? formArray[index]: {} as any)
	}

	mergeProperty<P extends keyof Combined<SOURCE, PATCH>>(name: P, values: Combined<SOURCE, PATCH>[P]): PatchFormState<SOURCE, PATCH> {
		const merge = { [name]: values } as {} as Combined<SOURCE, PATCH>
		return this.merge(merge)
	}

	mergeIndexProperty<P extends ArrayKeys<Combined<SOURCE, PATCH>>>(name: P, index: number, values: ArrayProperties<Combined<SOURCE, PATCH>>[P]): PatchFormState<SOURCE, PATCH> {
		const array = this.patch[name] !== undefined ? [...this.patch[name] as any as Array<ArrayProperties<Combined<SOURCE, PATCH>>[P]>] : []
		const merge = { [name]: array } as {} as Combined<SOURCE, PATCH>
		array[index] = values
		return this.merge(merge)
	}

}
