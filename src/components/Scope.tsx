import * as React from 'react'
import { FormState } from '../FormState'
import { SimpleFormState } from '../SimpleFormState'

interface OwnProps<INFORM, OUTFORM> {
	formState: FormState<INFORM>
	onNewFormState: (newState: FormState<INFORM>) => void

	chooseFormState: (values: INFORM) => FormState<OUTFORM>
	applyNewFormState: (formState: FormState<INFORM>, newFormState: FormState<OUTFORM>) => FormState<INFORM>
	
	render: (formState: FormState<OUTFORM>, onNewFormState: (newState: FormState<OUTFORM>) => void) => JSX.Element
}

export default class Scope<INFORM, OUTFORM> extends React.Component<OwnProps<INFORM, OUTFORM>> {

	onNewFormState = (newState: FormState<OUTFORM>) => {
		const newParentState = this.props.applyNewFormState(this.props.formState, newState)
		this.props.onNewFormState(newParentState)
	}

	render() {
		const formState = this.props.chooseFormState(this.props.formState.getValues())
		return this.props.render(formState, this.onNewFormState)
	}
}
