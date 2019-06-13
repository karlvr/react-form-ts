import * as React from 'react';
import { FormState } from '../FormState';
import { ArrayKeys, ArrayProperties } from '../types';
interface OwnProps<FORM, P extends ArrayKeys<FORM>> {
    formState: FormState<FORM>;
    name: P;
    start?: number;
    howMany?: number;
    onNewFormState: (newState: FormState<FORM>) => void;
    render: (info: ListIterationInfo, formState: FormState<ArrayProperties<FORM>[P]>, onNewFormState: (newState: FormState<ArrayProperties<FORM>[P]> | undefined, name?: keyof ArrayProperties<FORM>[P]) => void) => React.ReactNode;
    renderBefore?: () => React.ReactNode;
    renderAfter?: () => React.ReactNode;
    renderEmpty?: () => React.ReactNode;
    processChange?: (index: number, newState: ArrayProperties<FORM>[P], name?: keyof ArrayProperties<FORM>[P]) => ArrayProperties<FORM>[P] | undefined;
}
export interface ListIterationInfo {
    index: number;
    count: number;
    first: boolean;
    last: boolean;
}
export default class List<FORM, P extends ArrayKeys<FORM>> extends React.Component<OwnProps<FORM, P>> {
    render(): {} | null | undefined;
    private onNewFormState;
}
export {};
