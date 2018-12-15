import * as React from 'react'
import { FormState, OnFormStateChange, FormStateChange } from '../FormState'
import { ObjectKeys } from '../types'

interface OwnProps<FORM, P extends ObjectKeys<FORM>> {
	formState: FormState<FORM>
	name: P
	defaultValue?: FORM[P]
	onFormStateChange: OnFormStateChange<FORM>
	render: (formState: FormState<FORM[P]>, onChange: OnFormStateChange<FORM[P]>) => React.ReactNode
	renderEmpty?: () => React.ReactNode
}

export default class Child2<FORM, P extends ObjectKeys<FORM>> extends React.Component<OwnProps<FORM, P>> {

	render() {
		const formState = this.props.formState.subProperty(this.props.name, this.props.defaultValue)
		if (!formState) {
			return this.props.renderEmpty ? this.props.renderEmpty() : null
		}
		return this.props.render(formState, this.onChange)
	}

	shouldComponentUpdate(nextProps: Readonly<OwnProps<FORM, P>>) {
		if (!this.props.formState.isSame(nextProps.formState)) {
			return true
		}
		if (this.props.name !== nextProps.name) {
			return true
		}
		if (this.props.defaultValue !== nextProps.defaultValue) {
			return true
		}
		if (this.props.onFormStateChange !== nextProps.onFormStateChange) {
			return true
		}
		if (this.props.render !== nextProps.render) {
			return true
		}
		if (this.props.renderEmpty !== nextProps.renderEmpty) {
			return true
		}
		return true
	}

	private onChange = (change: FormStateChange<FORM[P]>) => {
		const formState = this.props.formState.subProperty(this.props.name, this.props.defaultValue) as FormState<FORM[P]>
		const newFormState = formState.merge(change)
		const mergeUp = { [this.props.name]: newFormState.getValues() } as {} as FormStateChange<FORM>
		this.props.onFormStateChange(mergeUp)
	}

}
