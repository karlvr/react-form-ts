import * as React from 'react'
import { FormState } from '../FormState'
import { ArrayKeys, ArrayProperties } from '../types';

interface OwnProps<FORM, P extends ArrayKeys<FORM>> {
	formState: FormState<FORM>
	name: P
	start?: number
	howMany?: number
	onNewFormState: (newState: FormState<FORM>) => void
	render: (info: ListIterationInfo, formState: FormState<ArrayProperties<FORM>[P]>, 
		onNewFormState: (newState: FormState<ArrayProperties<FORM>[P]> | undefined, name?: keyof ArrayProperties<FORM>[P]) => void) => React.ReactNode
	renderBefore?: () => React.ReactNode
	renderAfter?: () => React.ReactNode
	renderEmpty?: () => React.ReactNode
	processChange?: (index: number, newState: ArrayProperties<FORM>[P], name?: keyof ArrayProperties<FORM>[P]) => ArrayProperties<FORM>[P] | undefined
}

export interface ListIterationInfo {
	index: number
	count: number
	first: boolean
	last: boolean
}

export default class List<FORM, P extends ArrayKeys<FORM>> extends React.Component<OwnProps<FORM, P>> {

	onNewFormState = (index: number, newState: FormState<ArrayProperties<FORM>[P]> | undefined, name?: keyof ArrayProperties<FORM>[P]) => {
		if (newState === undefined) {
			this.props.onNewFormState(this.props.formState.splice(this.props.name, index, 1))
			return
		}
		let values = newState.getValues()
		if (this.props.processChange) {
			const processedValues = this.props.processChange(index, values, name)
			if (!processedValues) {
				return
			}
			values = processedValues
		}
		this.props.onNewFormState(this.props.formState.mergeIndexProperty(this.props.name, index, values))
	}

	render() {
		const array = this.props.formState.get(this.props.name) as any as Array<any>
		if (!array) {
			return this.props.renderEmpty ? this.props.renderEmpty() : null
		}

		let count = 0
		const startIndex = this.props.start !== undefined ? this.props.start : 0
		const endIndex = this.props.howMany !== undefined ? startIndex + this.props.howMany : array.length

		if (startIndex >= endIndex) {
			return this.props.renderEmpty ? this.props.renderEmpty() : null
		}

		return (
			<React.Fragment>
				{this.props.renderBefore && this.props.renderBefore()}
				{array.map((el, index) => {
					if (index < startIndex || index >= endIndex) {
						return
					}

					const formState = this.props.formState.subIndexProperty(this.props.name, index)
					const info: ListIterationInfo = {
						index,
						count,
						first: count === 0,
						last: index === endIndex - 1,
					}
					count += 1
					return this.props.render(info, formState as any as FormState<ArrayProperties<FORM>[P]>, this.onNewFormState.bind(this, index))
				})}
				{this.props.renderAfter && this.props.renderAfter()}
			</React.Fragment>
		)
	}
}
