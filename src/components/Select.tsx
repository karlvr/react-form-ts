import * as React from 'react'
import { FormState } from '../FormState'

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
type ElementAttributes = React.InputHTMLAttributes<HTMLSelectElement>

interface OwnProps<FORM, K extends keyof FORM> extends Omit<ElementAttributes, 'name' | 'value' | 'onChange'> {
	name: K & string
	formState: FormState<FORM>
	onNewFormState: (newState: FormState<FORM>, name: K) => void
	onValue?: (name: K, value: ElementValueType) => FormState<FORM> | undefined
}

type ElementValueType = ElementAttributes['value']

export default class Select<FORM, K extends keyof FORM> extends React.Component<OwnProps<FORM, K>> {

	render() {
		const { name, formState, onNewFormState, onValue, children, ...rest } = this.props
		const value = formState.get(name) as {} as ElementValueType

		return (
			<select name={name} onChange={this.onChange} value={value !== undefined ? value : ''} {...rest}>
				{children}
			</select>
		)
	}

	private onChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
		const name = evt.target.name as {} as K
		const elementValue = evt.target.options[evt.target.selectedIndex].value
		
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
