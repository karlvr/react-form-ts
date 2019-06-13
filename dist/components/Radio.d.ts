import * as React from 'react';
import { FormState } from '../FormState';
declare type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
declare type ElementAttributes = React.InputHTMLAttributes<HTMLInputElement>;
interface OwnProps<FORM, K extends keyof FORM> extends Omit<ElementAttributes, 'name' | 'value' | 'type' | 'onChange'> {
    name: K & string;
    group: string;
    value: FORM[K];
    formState: FormState<FORM>;
    onNewFormState: (newState: FormState<FORM>, name: K) => void;
    onChange?: (name: K, value: FORM[K]) => FormState<FORM> | undefined;
}
export default class Radio<FORM, K extends keyof FORM> extends React.Component<OwnProps<FORM, K>> {
    render(): JSX.Element;
    private onChange;
}
export {};
