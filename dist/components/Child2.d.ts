import * as React from 'react';
import { FormState, OnFormStateChange } from '../FormState';
import { ObjectKeys } from '../types';
interface OwnProps<FORM, P extends ObjectKeys<FORM>> {
    formState: FormState<FORM>;
    name: P;
    defaultValue?: FORM[P];
    onFormStateChange: OnFormStateChange<FORM>;
    render: (formState: FormState<FORM[P]>, onChange: OnFormStateChange<FORM[P]>) => React.ReactNode;
    renderEmpty?: () => React.ReactNode;
}
export default class Child2<FORM, P extends ObjectKeys<FORM>> extends React.Component<OwnProps<FORM, P>> {
    render(): {} | null | undefined;
    shouldComponentUpdate(nextProps: Readonly<OwnProps<FORM, P>>): boolean;
    private onChange;
}
export {};
