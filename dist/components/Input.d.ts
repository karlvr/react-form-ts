import * as React from 'react';
import { FormState } from '../FormState';
declare type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
declare type ElementAttributes = React.InputHTMLAttributes<HTMLInputElement>;
interface OwnProps<FORM, K extends keyof FORM> extends Omit<ElementAttributes, 'name' | 'value' | 'onChange'> {
    name: K & string;
    formState: FormState<FORM>;
    onNewFormState: (newState: FormState<FORM>, name: K) => void;
    onValue?: (name: K, value: ElementValueType) => FormState<FORM> | undefined;
}
declare type ElementValueType = ElementAttributes['value'];
export default class Input<FORM, K extends keyof FORM> extends React.Component<OwnProps<FORM, K>> {
    onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    render(): JSX.Element;
}
export {};
