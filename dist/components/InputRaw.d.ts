import * as React from 'react';
declare type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
declare type ElementAttributes = React.InputHTMLAttributes<HTMLInputElement>;
interface OwnProps extends Omit<ElementAttributes, 'value' | 'onChange'> {
    value: ElementValueType;
    onValue: (name: string, value: ElementValueType) => void;
}
declare type ElementValueType = ElementAttributes['value'];
export default class InputRaw<FORM> extends React.Component<OwnProps> {
    render(): JSX.Element;
    private onChange;
}
export {};