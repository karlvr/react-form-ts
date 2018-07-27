import * as React from 'react';
import { FormState } from '../FormState';
declare type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
declare type ElementAttributes = React.InputHTMLAttributes<HTMLInputElement>;
interface OwnProps<FORM> extends Omit<ElementAttributes, 'name' | 'value' | 'onChange'> {
    name: keyof FORM;
    formState: FormState<FORM>;
    onNewFormState: (newState: FormState<FORM>) => void;
}
export default class Input<FORM> extends React.Component<OwnProps<FORM>> {
    onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    render(): JSX.Element;
}
export {};
