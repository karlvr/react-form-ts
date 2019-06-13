import * as React from 'react';
import { FormState } from '../FormState';
declare type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
declare type ElementAttributes = React.InputHTMLAttributes<HTMLInputElement>;
interface OwnProps<FORM, K extends keyof FORM> extends Omit<ElementAttributes, 'name' | 'value' | 'onChange' | 'type'> {
    name: K & string;
    formState: FormState<FORM>;
    onNewFormState: (newState: FormState<FORM>, name: K) => void;
    onValue?: (name: K, value: ElementValueType) => FormState<FORM> | undefined;
}
declare type ElementValueType = ElementAttributes['value'];
/** Equivalent to the Input component, except only for password input types and it doesn't populate
 * the value attribute so the user's password isn't exposed in the DOM while they are typing.
 */
export default class Password<FORM, K extends keyof FORM> extends React.Component<OwnProps<FORM, K>> {
    render(): JSX.Element;
    private onChange;
}
export {};
