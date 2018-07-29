import * as React from 'react'
import { FormState } from '../FormState'

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
type ElementAttributes = React.InputHTMLAttributes<HTMLInputElement>

interface OwnProps<FORM> extends Omit<ElementAttributes, 'name' | 'value' | 'onChange'> {
	formState: FormState<FORM>
	onNewFormState: (newState: FormState<FORM>, name: keyof FORM) => void
	toValue: (formState: FormState<FORM>) => ElementValueType
	fromValue: (value: ElementValueType, formState: FormState<FORM>) => FormState<FORM>
}

type ElementValueType = ElementAttributes['value']

export default class InputRaw<FORM> extends React.Component<OwnProps<FORM>> {

	onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const name = evt.target.name as {} as keyof FORM
		const elementValue = evt.target.value
		const newState = this.props.fromValue(elementValue, this.props.formState)
		this.props.onNewFormState(newState, name)
	}

	render() {
		const { formState, onNewFormState, toValue, fromValue, ...rest } = this.props
		const value = this.props.toValue(formState)

		return (
			<input name={name} onChange={this.onChange} value={value || ''} {...rest} />
		)
	}
}
