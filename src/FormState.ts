import { ArrayProperties, ArrayKeys } from "./types";

/**
 * An interface that is used by the form controls to refer to form state implementations.
 */

export interface FormState<FORM> {
	get<P extends keyof (FORM)>(name: P, defaultValue?: FORM[P]): FORM[P]
	set<P extends keyof FORM>(name: P, value: FORM[P]): FormState<FORM>
	push<P extends ArrayKeys<FORM>>(name: P, value: ArrayProperties<FORM>[P]): FormState<FORM>
	splice<P extends ArrayKeys<FORM>>(name: P, start: number, deleteCount?: number, ...values: Array<ArrayProperties<FORM>[P]>): FormState<FORM>
	apply(func: (form: FORM) => FORM): FormState<FORM>
	getValues(): FORM
	isEmpty(): boolean
	sub<SUBFORM>(func: (form: FORM) => SUBFORM): any
	subProperty<P extends keyof FORM>(name: P): any
	subIndexProperty<P extends ArrayKeys<FORM>>(name: P, index: number): any
	mergeProperty<P extends keyof FORM>(name: P, values: FORM[P]): FormState<FORM>
	mergeIndexProperty<P extends ArrayKeys<FORM>>(name: P, index: number, values: ArrayProperties<FORM>[P]): FormState<FORM>
}
