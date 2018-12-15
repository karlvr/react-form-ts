import * as React from 'react'
import { FormState } from '../FormState'

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
type ElementAttributes = React.InputHTMLAttributes<HTMLInputElement>

interface OwnProps<FORM, K extends keyof FORM> extends Omit<ElementAttributes, 'name' | 'value' | 'onChange' | 'type'> {
	name: K & string
	formState: FormState<FORM>
	onNewFormState: (newState: FormState<FORM>, name: K) => void
	onValue?: (name: K, value: ElementValueType) => FormState<FORM> | undefined
}

type ElementValueType = ElementAttributes['value']

/** Equivalent to the Input component, except only for password input types and it doesn't populate
 * the value attribute so the user's password isn't exposed in the DOM while they are typing.
 */
export default class Password<FORM, K extends keyof FORM> extends React.Component<OwnProps<FORM, K>> {

	render() {
		const { name, formState, onNewFormState, onValue, ...rest } = this.props

		return (
			<input type="password" name={name} onChange={this.onChange} value={undefined} {...rest} />
		)
	}

	private onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const name = evt.target.name as {} as K
		const elementValue = evt.target.value

		if (this.props.onValue) {
			const newFormState = this.props.onValue(name, elementValue)
			if (newFormState) {
				this.props.onNewFormState(newFormState, name)
			}
		} else {
			const value = elementValue as {} as FORM[keyof FORM]
			this.props.onNewFormState(this.props.formState.set(name, value), name)
		}
	}
}
