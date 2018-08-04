import * as React from 'react'
import { FormState } from '../FormState'

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
type ElementAttributes = React.InputHTMLAttributes<HTMLInputElement>

interface OwnProps extends Omit<ElementAttributes, 'value' | 'onChange'> {
	value: ElementValueType
	onValue: (name: string, value: ElementValueType) => void
}

type ElementValueType = ElementAttributes['value']

export default class InputRaw<FORM> extends React.Component<OwnProps> {

	onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const name = evt.target.name
		const elementValue = evt.target.value
		this.props.onValue(name, elementValue)
	}

	render() {
		const { value, onValue, ...rest } = this.props

		return (
			<input onChange={this.onChange} value={value || ''} {...rest} />
		)
	}
}
