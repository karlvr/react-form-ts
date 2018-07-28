import * as React from 'react'
import { FormState } from '../FormState'

interface OwnProps<FORM, P extends keyof FORM> {
	formState: FormState<FORM>
	name: P
}

export default class If<FORM, P extends keyof FORM> extends React.Component<OwnProps<FORM, P>> {

	render() {
		const value = this.props.formState.get(this.props.name)
		if (!value) {
			return null
		} else {
			return this.props.children
		}
	}
}
