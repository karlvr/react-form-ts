import * as React from 'react'
import { FormState } from '../FormState'
import { ArrayKeys, ArrayProperties } from '../types';

interface OwnProps<FORM, P extends ArrayKeys<FORM>> {
	formState: FormState<FORM>
	name: P
	onNewFormState: (newState: FormState<FORM>) => void
	render: (index: number, formState: FormState<ArrayProperties<FORM>[P]>, onNewFormState: (newState: FormState<ArrayProperties<FORM>[P]>) => void) => React.ReactNode
	renderBefore?: () => React.ReactNode
	renderAfter?: () => React.ReactNode
	renderEmpty?: () => React.ReactNode
}

export default class List<FORM, P extends ArrayKeys<FORM>> extends React.Component<OwnProps<FORM, P>> {

	onNewFormState = (index: number, newState: FormState<ArrayProperties<FORM>[P]>) => {
		this.props.onNewFormState(this.props.formState.mergeIndexProperty(this.props.name, index, newState.getValues()))
	}

	render() {
		const array = this.props.formState.get(this.props.name) as any as Array<any>
		if (!array) {
			return this.props.renderEmpty ? this.props.renderEmpty() : null
		}

		return (
			<React.Fragment>
				{this.props.renderBefore && this.props.renderBefore()}
				{array.map((el, index) => {
					const formState = this.props.formState.subIndexProperty(this.props.name, index)
					return this.props.render(index, formState as any as FormState<ArrayProperties<FORM>[P]>, this.onNewFormState.bind(this, index))
				})}
				{this.props.renderAfter && this.props.renderAfter()}
			</React.Fragment>
		)
	}
}
