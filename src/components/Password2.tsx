import * as React from 'react'
import { FormState, OnFormStateChange, FormStateChange } from '../FormState'

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
type ElementAttributes = React.InputHTMLAttributes<HTMLInputElement>

interface OwnProps<FORM, K extends keyof FORM> extends Omit<ElementAttributes, 'name' | 'value' | 'onChange' | 'type'> {
	name: K & string
	formState: FormState<FORM>
	onFormStateChange: OnFormStateChange<FORM>
	onValue?: (name: K, value: ElementValueType) => FormStateChange<FORM> | undefined
}

type ElementValueType = ElementAttributes['value']

/** Equivalent to the Input component, except only for password input types and it doesn't populate
 * the value attribute so the user's password isn't exposed in the DOM while they are typing.
 */
export default class Password2<FORM, K extends keyof FORM> extends React.Component<OwnProps<FORM, K>> {

	render() {
		const { name, formState, onFormStateChange, onValue, ...rest } = this.props

		return (
			<input type="password" name={name} onChange={this.onChange} value={undefined} {...rest} />
		)
	}

	private onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const name = evt.target.name as {} as K
		const elementValue = evt.target.value

		if (this.props.onValue) {
			const merge = this.props.onValue(name, elementValue)
			if (merge) {
				this.props.onFormStateChange(merge)
			}
		} else {
			const merge: FormStateChange<FORM> = {}
			merge[name] = elementValue as any
			this.props.onFormStateChange(merge)
		}
	}

}
