import * as React from 'react'
import { FormState } from '../FormState'

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
type ElementAttributes = React.InputHTMLAttributes<HTMLSelectElement>

interface OwnProps<FORM> extends Omit<ElementAttributes, 'name' | 'value' | 'onChange'> {
	formState: FormState<FORM>
	onNewFormState: (newState: FormState<FORM>, name: keyof FORM) => void
	toValue: (formState: FormState<FORM>) => ElementValueType
	fromValue: (value: ElementValueType, formState: FormState<FORM>) => FormState<FORM>
}

type ElementValueType = ElementAttributes['value']

export default class SelectRaw<FORM> extends React.Component<OwnProps<FORM>> {

	onChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
		const name = evt.target.name as {} as keyof FORM
		const elementValue = evt.target.options[evt.target.selectedIndex].value
		const newState = this.props.fromValue(elementValue, this.props.formState)
		this.props.onNewFormState(newState, name)
	}

	render() {
		const { formState, onNewFormState, toValue, fromValue, children, ...rest } = this.props
		const value = this.props.toValue(formState)

		return (
			<select name={name} onChange={this.onChange} value={value || ''} {...rest}>
				{children}
			</select>
		)
	}
}
