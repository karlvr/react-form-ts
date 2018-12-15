import * as React from 'react'
import { FormState } from '../FormState'

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
type ElementAttributes = React.InputHTMLAttributes<HTMLInputElement>

interface OwnProps<FORM, P extends keyof FORM> extends Omit<ElementAttributes, 'name' | 'value' | 'onChange'> {
	name: P & string
	formState: FormState<FORM>
	onNewFormState: (newState: FormState<FORM>, name: keyof FORM) => void
	onValue?: (name: P, value: FORM[P]) => FormState<FORM> | undefined
	children: (value: FORM[P], onValueChange: (newValue: FORM[P]) => void) => React.ReactNode
}

export default class InputWrapper<FORM, P extends keyof FORM> extends React.Component<OwnProps<FORM, P>> {

	render() {
		const { name, formState, onNewFormState, onValue } = this.props
		const value = formState.get(name)

		return this.props.children(value, this.onValueChange)
	}

	private onValueChange = (newValue: FORM[P]) => {
		if (this.props.onValue) {
			const newFormState = this.props.onValue(name, newValue)
			if (newFormState) {
				this.props.onNewFormState(newFormState, name)
			}
		} else {
			this.props.onNewFormState(this.props.formState.set(this.props.name, newValue), name)
		}
	}
}
