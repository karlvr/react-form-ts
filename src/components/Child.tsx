import * as React from 'react'
import { FormState, OnNewFormState } from '../FormState'
import { ObjectKeys } from '../types';

interface OwnProps<FORM, P extends keyof FORM> {
	formState: FormState<FORM>
	name: P
	defaultValue?: FORM[P]
	onNewFormState: (newState: FormState<FORM>) => void
	render: (formState: FormState<FORM[P]>, onNewFormState: OnNewFormState<FORM[P]>) => React.ReactNode
	renderEmpty?: () => React.ReactNode
}

export default class Child<FORM, P extends ObjectKeys<FORM>> extends React.Component<OwnProps<FORM, P>> {

	onNewFormState = (newState: FormState<FORM[P]>) => {
		this.props.onNewFormState(this.props.formState.mergeProperty(this.props.name, newState.getValues()))
	}

	render() {
		const formState = this.props.formState.subProperty(this.props.name, this.props.defaultValue)
		if (!formState) {
			return this.props.renderEmpty ? this.props.renderEmpty() : null
		}
		return this.props.render(formState, this.onNewFormState)
	}
}
