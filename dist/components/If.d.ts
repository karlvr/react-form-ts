import * as React from 'react';
import { FormState } from '../FormState';
interface OwnProps<FORM, P extends keyof FORM> {
    formState: FormState<FORM>;
    name: P;
}
export default class If<FORM, P extends keyof FORM> extends React.Component<OwnProps<FORM, P>> {
    render(): {} | null | undefined;
}
export {};
