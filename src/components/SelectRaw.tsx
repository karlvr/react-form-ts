import * as React from 'react'

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
type ElementAttributes = React.InputHTMLAttributes<HTMLSelectElement>

interface OwnProps extends Omit<ElementAttributes, 'value' | 'onChange'> {
	value: ElementValueType
	onValue: (name: string, value: ElementValueType) => void
}

type ElementValueType = ElementAttributes['value']

export default class SelectRaw<FORM> extends React.Component<OwnProps> {

	render() {
		const { value, onValue, children, ...rest } = this.props

		return (
			<select onChange={this.onChange} value={value !== undefined ? value : ''} {...rest}>
				{children}
			</select>
		)
	}

	private onChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
		const name = evt.target.name
		const elementValue = evt.target.options[evt.target.selectedIndex].value
		this.props.onValue(name, elementValue)
	}

}
