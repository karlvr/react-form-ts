import * as React from 'react';
import { FormState } from '../FormState';
declare type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
declare type ElementAttributes = React.InputHTMLAttributes<HTMLInputElement>;
interface OwnProps<FORM, P extends keyof FORM> extends Omit<ElementAttributes, 'name' | 'value' | 'onChange'> {
    name: P & string;
    formState: FormState<FORM>;
    onNewFormState: (newState: FormState<FORM>, name: keyof FORM) => void;
    onValue?: (name: P, value: FORM[P]) => FormState<FORM> | undefined;
    children: (value: FORM[P], onValueChange: (newValue: FORM[P]) => void) => React.ReactNode;
}
export default class InputWrapper<FORM, P extends keyof FORM> extends React.Component<OwnProps<FORM, P>> {
    render(): React.ReactNode;
    private onValueChange;
}
export {};
