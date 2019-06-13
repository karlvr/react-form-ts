import * as React from 'react';
import { FormState, OnNewFormState } from '../FormState';
import { ObjectKeys, ObjectProps } from '../types';
interface OwnProps<FORM, P extends keyof FORM> {
    formState: FormState<FORM>;
    name: P;
    defaultValue?: FORM[P];
    onNewFormState: OnNewFormState<FORM>;
    render: (formState: FormState<ObjectProps<FORM>[P]>, onNewFormState: OnNewFormState<FORM[P]>) => React.ReactNode;
    renderEmpty?: () => React.ReactNode;
}
export default class Child<FORM extends object, P extends ObjectKeys<FORM>> extends React.Component<OwnProps<FORM, P>> {
    render(): {} | null | undefined;
    private onNewFormState;
}
export {};
