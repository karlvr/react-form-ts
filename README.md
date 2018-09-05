# Formalities

TypeScript-first form state controller and React components with type safety.

## Example

```
interface MyForm {
	givenName: string
	familyName: string
	emailAddress: string
}

interface State {
	formState: SimpleFormState<MyForm>
}

const DEFAULT_FORM: MyForm = {
	givenName: '',
	familyName: '',
	emailAddress: '',
}

const INITIAL_STATE: State = {
	formState: new SimpleFormState(DEFAULT_FORM)
}


```
