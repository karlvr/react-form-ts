import * as React from 'react'
import { SimpleFormState } from '../SimpleFormState'
import { ArrayKeys, ArrayProperties } from '../types';

interface OwnProps<FORM, P extends keyof FORM> {
	formState: SimpleFormState<FORM>
	name: P
	onNewFormState: (newState: SimpleFormState<FORM>) => void
	render: (formState: SimpleFormState<FORM[P]>, onNewFormState: (newState: SimpleFormState<FORM[P]>) => void) => React.ReactNode
	renderEmpty?: () => React.ReactNode
}

export default class Child<FORM, P extends ArrayKeys<FORM>> extends React.Component<OwnProps<FORM, P>> {

	onNewFormState = (newState: SimpleFormState<FORM[P]>) => {
		this.props.onNewFormState(this.props.formState.mergeProperty(this.props.name, newState.getValues()))
	}

	render() {
		const formState = this.props.formState.subProperty(this.props.name)
		if (!formState) {
			return this.props.renderEmpty ? this.props.renderEmpty() : null
		}
		return this.props.render(formState, this.onNewFormState)
	}
}
