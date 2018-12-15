import { ArrayProperties, ArrayKeys, ObjectKeys } from "./types";

/**
 * An interface that is used by the form controls to refer to form state implementations.
 */

export interface FormState<FORM> {
	get<P extends keyof (FORM)>(name: P, defaultValue?: FORM[P]): FORM[P]
	set<P extends keyof FORM>(name: P, value: FORM[P]): FormState<FORM>
	push<P extends ArrayKeys<FORM>>(name: P, value: ArrayProperties<FORM>[P]): FormState<FORM>
	splice<P extends ArrayKeys<FORM>>(name: P, start: number, deleteCount?: number, ...values: Array<ArrayProperties<FORM>[P]>): FormState<FORM>
	apply(func: (form: FORM) => FORM): FormState<FORM>
	merge(other: Partial<FORM>): FormState<FORM>
	getValues(): FORM
	getValuesCopy(): FORM
	isEmpty(): boolean
	isSame(other: FormState<FORM>): boolean
	sub<SUBFORM extends object>(func: (form: FORM) => SUBFORM): any
	subProperty<P extends ObjectKeys<FORM>>(name: P, defaultValue?: FORM[P]): any
	subIndexProperty<P extends ArrayKeys<FORM>>(name: P, index: number): any
	mergeProperty<P extends ObjectKeys<FORM>>(name: P, values: Partial<FORM[P]>): FormState<FORM>
	mergeIndexProperty<P extends ArrayKeys<FORM>>(name: P, index: number, values: ArrayProperties<FORM>[P]): FormState<FORM>
}

export type OnNewFormState<FORM> = (newFormState: FormState<FORM>) => void

export type OnFormStateChange<FORM> = (change: FormStateChange<FORM>) => void

export type FormStateChange<T> = Partial<T>
