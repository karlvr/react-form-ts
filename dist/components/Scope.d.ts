import * as React from 'react';
import { FormState } from '../FormState';
interface OwnProps<INFORM, OUTFORM> {
    formState: FormState<INFORM>;
    onNewFormState: (newState: FormState<INFORM>) => void;
    chooseFormState: (values: INFORM) => FormState<OUTFORM>;
    applyNewFormState: (formState: FormState<INFORM>, newFormState: FormState<OUTFORM>) => FormState<INFORM>;
    render: (formState: FormState<OUTFORM>, onNewFormState: (newState: FormState<OUTFORM>) => void) => JSX.Element;
}
export default class Scope<INFORM, OUTFORM> extends React.Component<OwnProps<INFORM, OUTFORM>> {
    onNewFormState: (newState: FormState<OUTFORM>) => void;
    render(): JSX.Element;
}
export {};
