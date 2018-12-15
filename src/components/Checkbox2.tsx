import * as React from 'react'
import { FormState, OnFormStateChange, FormStateChange } from '../FormState'

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
type ElementAttributes = React.InputHTMLAttributes<HTMLInputElement>

interface OwnProps<FORM, K extends keyof FORM> extends Omit<ElementAttributes, 'name' | 'type' | 'onChange'> {
	name: K & string
	formState: FormState<FORM>
	onFormStateChange: OnFormStateChange<FORM>
	onValue?: (name: K, value: boolean) => FormStateChange<FORM> | undefined
}

export default class Checkbox2<FORM, K extends keyof FORM> extends React.Component<OwnProps<FORM, K>> {

	render() {
		const { name, formState, onFormStateChange, onValue, value, ...rest } = this.props
		const checked = !!formState.get(name)

		return (
			<input name={name} type="checkbox" onChange={this.onChange} value={value} checked={checked} {...rest} />
		)
	}

	shouldComponentUpdate(nextProps: Readonly<OwnProps<FORM, K>>) {
		const { name, formState, onFormStateChange, onValue, ...rest } = this.props
		const { name: name_, formState: formState_, onFormStateChange: onFormStateChange_, onValue: onValue_, ...rest_ } = nextProps

		if (name !== name_) {
			return true
		}
		if (formState.get(name) !== formState_.get(name)) {
			return true
		}
		if (onFormStateChange !== onFormStateChange_) {
			return true
		}
		if (onValue !== onValue_) {
			return true
		}
		if (rest != rest_) {
			return true
		}
		return false
	}

	private onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const name = evt.target.name as {} as K
		const elementValue = evt.target.checked

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
