import * as React from 'react'
import { FormState } from '../FormState'

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
type ElementAttributes = React.InputHTMLAttributes<HTMLSelectElement>

interface OwnProps<FORM> extends Omit<ElementAttributes, 'name' | 'value' | 'onChange'> {
	name: keyof FORM & string
	formState: FormState<FORM>
	onNewFormState: (newState: FormState<FORM>, name: keyof FORM) => void
}

type ElementValueType = ElementAttributes['value']

export default class Select<FORM> extends React.Component<OwnProps<FORM>> {

	onChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
		const name = evt.target.name as {} as keyof FORM
		const value = evt.target.options[evt.target.selectedIndex].value as {} as FORM[keyof FORM]
		this.props.onNewFormState(this.props.formState.set(name, value), name)
	}

	render() {
		const { name, formState, onNewFormState, children, ...rest } = this.props
		const value = formState.get(name) as {} as ElementValueType

		return (
			<select name={name} onChange={this.onChange} value={value || ''} {...rest}>
				{children}
			</select>
		)
	}
}
