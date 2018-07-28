import { FormState } from "./FormState";
import { ArrayProperties, UndefinedIfUndefined, ArrayKeys } from "./types";

/**
 * A class to assist with a form that creates an object.
 * 
 * FORM is the type of the object to be populated. 
 * 
 * This object is immutable, so it is suitable to be put into a React component state.
 */
export class SimpleFormState<FORM> implements FormState<FORM> {

	private form: FORM

	constructor(source: FORM) {
		this.form = source
	}

	/**
	 * Return the value of the given property.
	 * @param name Property name
	 */
	get<PROPERTY extends keyof FORM>(name: PROPERTY, defaultValue?: FORM[PROPERTY]): FORM[PROPERTY] {
		const value = this.form[name]
		if (value !== undefined) {
			return value
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
	set<PROPERTY extends keyof FORM>(name: PROPERTY, value: FORM[PROPERTY]): SimpleFormState<FORM> {
		const form = { ...(this.form as {}), [name]: value } as FORM
		return new SimpleFormState<FORM>(form)
	}

	push<P extends ArrayKeys<FORM>>(name: P, value: ArrayProperties<FORM>[P]): SimpleFormState<FORM> {
		let array = this.form[name] as any as Array<ArrayProperties<FORM>[P]>
		if (array) {
			array = [...array]
		} else {
			array = []
		}

		array.push(value)
		return this.set(name, array as any as FORM[P])
	}

	splice<P extends ArrayKeys<FORM>>(name: P, start: number, deleteCount?: number, ...values: Array<ArrayProperties<FORM>[P]>): SimpleFormState<FORM> {
		let array = this.form[name] as any as Array<ArrayProperties<FORM>[P]>
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
		return this.set(name, array as any as FORM[P])
	}

	apply(func: (form: FORM) => FORM): SimpleFormState<FORM> {
		let form = this.getValues()
		form = func(form)
		return new SimpleFormState<FORM>(form)
	}

	/**
	 * Return a new form state with the values from the given patch merged in to this state.
	 * @param other A patch object
	 */
	merge(other: FORM): SimpleFormState<FORM> {
		let working: SimpleFormState<FORM> = this
		for (let k in other) {
			if (other.hasOwnProperty(k)) {
				/* tslint:disable-next-line:no-any */
				working = working.set(k as {} as keyof FORM, other[k] as any)
			}
		}
		return working
	}

	/**
	 * Returns a copy of the current patch state.
	 */
	getValues(): FORM {
		return { ...(this.form as {}) } as FORM
	}

	/**
	 * Returns true if the patch is empty.
	 */
	isEmpty(): boolean {
		if (!this.form) {
			return true
		}
		for (let k in this.form) {
			if (this.form.hasOwnProperty(k)) {
				if (this.form[k] !== undefined) {
					return false
				}
			}
		}
		return true
	}

	sub<SUBFORM>(func: (form: FORM) => SUBFORM): SimpleFormState<SUBFORM> {
		const form = this.getValues()
		const subform = func(form)
		return new SimpleFormState(subform)
	}

	subProperty<P extends keyof FORM>(name: P): SimpleFormState<Required<FORM>[P]> | UndefinedIfUndefined<FORM[P]> {
		const form = this.getValues()
		if (form[name] !== undefined) {
			return new SimpleFormState(form[name]) as SimpleFormState<NonNullable<FORM>[P]>
		} else {
			return undefined as any
		}
	}

	subIndexProperty<P extends ArrayKeys<FORM>>(name: P, index: number): SimpleFormState<Required<ArrayProperties<FORM>>[P]> | UndefinedIfUndefined<FORM[P]> {
		const form = this.getValues()
		const array = form[name] as any as Array<ArrayProperties<FORM>[P]>
		if (array !== undefined) {
			const value = array[index]
			if (value !== undefined) {
				return new SimpleFormState<Required<ArrayProperties<FORM>>[P]>(array[index] as any as Required<ArrayProperties<FORM>>[P])
			} else {
				return undefined as any
			}
		} else {
			return undefined as any
		}
	}

	mergeProperty<P extends keyof FORM>(name: P, values: FORM[P]): SimpleFormState<FORM> {
		const merge = { [name]: values } as {} as FORM
		return this.merge(merge)
	}

	mergeIndexProperty<P extends ArrayKeys<FORM>>(name: P, index: number, values: ArrayProperties<FORM>[P]): SimpleFormState<FORM> {
		const merge = { [name]: [...(this.form[name] ? this.form[name] : []) as any as Array<ArrayProperties<FORM>[P]>]} as {} as FORM
		const array = merge[name] as any as Array<ArrayProperties<FORM>[P]>
		array[index] = values
		return this.merge(merge)
	}

}
