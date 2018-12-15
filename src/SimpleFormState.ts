import { FormState } from "./FormState";
import { ArrayProperties, UndefinedIfUndefined, ArrayKeys, DeepPartial, ObjectKeys, ObjectProps } from "./types";
import { mergeObjects, deepMergeObjects } from "./functions";

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
		return this.merge({ [name]: value } as {} as Partial<FORM>)
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
		let form = this.getValuesCopy()
		form = func(form)
		return new SimpleFormState<FORM>(form)
	}

	/**
	 * Return a new form state with the values from the given patch merged in to this state.
	 * @param other A patch object
	 */
	merge(other: Partial<FORM>): SimpleFormState<FORM> {
		return new SimpleFormState(mergeObjects(this.getValues() as {} as object, other) as {} as FORM)
	}

	deepMerge(other: DeepPartial<FORM>): SimpleFormState<FORM> {
		return new SimpleFormState(deepMergeObjects(this.getValues() as {} as object, other) as {} as FORM)
	}

	/**
	 * Returns a copy of the current patch state.
	 */
	getValues(): FORM {
		return this.form
	}

	getValuesCopy(): FORM {
		return {...(this.form as any)}
	}

	isSame(other: FormState<FORM>): boolean {
		return this.getValues() === other.getValues()
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

	sub<SUBFORM extends object>(func: (form: FORM) => SUBFORM): SimpleFormState<SUBFORM> {
		const form = this.getValues()
		const subform = func(form)
		return new SimpleFormState(subform)
	}

	subProperty<P extends ObjectKeys<FORM>>(name: P, defaultValue?: FORM[P]): SimpleFormState<Required<FORM>[P]> | UndefinedIfUndefined<FORM[P]> {
		const form = this.getValues()
		if (form[name] !== undefined) {
			return new SimpleFormState(form[name] as any) as SimpleFormState<NonNullable<ObjectProps<FORM>>[P]>
		} else if (defaultValue !== undefined) {
			return new SimpleFormState(defaultValue as any) as SimpleFormState<NonNullable<ObjectProps<FORM>>[P]>
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
