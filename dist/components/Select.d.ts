import * as React from 'react';
import { FormState } from '../FormState';
declare type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
declare type ElementAttributes = React.InputHTMLAttributes<HTMLSelectElement>;
interface OwnProps<FORM> extends Omit<ElementAttributes, 'name' | 'value' | 'onChange'> {
    name: keyof FORM;
    formState: FormState<FORM>;
    onNewFormState: (newState: FormState<FORM>) => void;
}
export default class Select<FORM> extends React.Component<OwnProps<FORM>> {
    onChange: (evt: React.ChangeEvent<HTMLSelectElement>) => void;
    render(): JSX.Element;
}
export {};
