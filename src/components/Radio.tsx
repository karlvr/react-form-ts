import * as React from 'react'
import { FormState } from '../FormState'

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
type ElementAttributes = React.InputHTMLAttributes<HTMLInputElement>

interface OwnProps<FORM, K extends keyof FORM> extends Omit<ElementAttributes, 'name' | 'value' | 'type' | 'onChange'> {
	name: K & string
	group: string
	value: FORM[K]
	formState: FormState<FORM>
	onNewFormState: (newState: FormState<FORM>, name: K) => void
	onChange?: (name: K, value: boolean) => FormState<FORM> | undefined
}

export default class Radio<FORM, K extends keyof FORM> extends React.Component<OwnProps<FORM, K>> {

	onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const { name } = this.props
		const elementValue = evt.target.checked

		if (this.props.onChange) {
			const newFormState = this.props.onChange(name, elementValue)
			if (newFormState) {
				this.props.onNewFormState(newFormState, name)
			}
		} else {
			this.props.onNewFormState(this.props.formState.set(name, this.props.value), name)
		}
	}

	render() {
		const { name, group, formState, onNewFormState, onChange, value, ...rest } = this.props
		const checked = formState.get(name) === value

		return (
			<input name={group} type="radio" onChange={this.onChange} value={value as any} checked={checked} {...rest} />
		)
	}
}
