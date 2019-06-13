import * as React from 'react';
import { FormState, OnFormStateChange, FormStateChange } from '../FormState';
declare type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
declare type ElementAttributes = React.InputHTMLAttributes<HTMLInputElement>;
interface OwnProps<FORM, K extends keyof FORM> extends Omit<ElementAttributes, 'name' | 'type' | 'onChange'> {
    name: K & string;
    formState: FormState<FORM>;
    onFormStateChange: OnFormStateChange<FORM>;
    onValue?: (name: K, value: boolean) => FormStateChange<FORM> | undefined;
}
export default class Checkbox2<FORM, K extends keyof FORM> extends React.Component<OwnProps<FORM, K>> {
    render(): JSX.Element;
    shouldComponentUpdate(nextProps: Readonly<OwnProps<FORM, K>>): boolean;
    private onChange;
}
export {};