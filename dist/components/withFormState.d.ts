import * as React from 'react';
import { FormState } from '../FormState';
interface WrappedComponentProps<FORM> {
    formState: FormState<FORM>;
    onNewFormState: (newState: FormState<FORM>, name: keyof FORM) => void;
}
export declare const withFormState: <FORM, PROPS extends WrappedComponentProps<FORM>>(WrappedComponent: React.ComponentClass<PROPS, React.ComponentState>, formState: FormState<FORM>, onNewFormState: (newState: FormState<FORM>, name: keyof FORM) => void) => {
    new (props: Readonly<PROPS>): {
        render(): JSX.Element;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<PROPS>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<PROPS>;
        state: Readonly<{}>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    new (props: PROPS, context?: any): {
        render(): JSX.Element;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<PROPS>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<PROPS>;
        state: Readonly<{}>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
};
export {};
