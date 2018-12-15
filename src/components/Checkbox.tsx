import * as React from 'react'
import { FormState } from '../FormState'

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
type ElementAttributes = React.InputHTMLAttributes<HTMLInputElement>

interface OwnProps<FORM, K extends keyof FORM> extends Omit<ElementAttributes, 'name' | 'type' | 'onChange'> {
	name: K & string
	formState: FormState<FORM>
	onNewFormState: (newState: FormState<FORM>, name: K) => void
	onChange?: (name: K, value: boolean) => FormState<FORM> | undefined
}

export default class Checkbox<FORM, K extends keyof FORM> extends React.Component<OwnProps<FORM, K>> {

	render() {
		const { name, formState, onNewFormState, onChange, value, ...rest } = this.props
		const checked = !!formState.get(name)

		return (
			<input name={name} type="checkbox" onChange={this.onChange} value={value} checked={checked} {...rest} />
		)
	}

	private onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const name = evt.target.name as {} as K
		const elementValue = evt.target.checked

		if (this.props.onChange) {
			const newFormState = this.props.onChange(name, elementValue)
			if (newFormState) {
				this.props.onNewFormState(newFormState, name)
			}
		} else {
			this.props.onNewFormState(this.props.formState.set(name, elementValue as any), name)
		}
	}
}
