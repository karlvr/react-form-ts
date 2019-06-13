import * as React from 'react';
interface OwnProps<X> {
    okay: X;
    required: X;
    notOkay: keyof X;
}
export default class TestComponent<X> extends React.Component<OwnProps<X>> {
    render(): null;
}
interface TestWrappedComponentProps<Y> {
    required: Y;
}
export declare const withTestHOC: <Y, PROPS extends TestWrappedComponentProps<Y>>(WrappedComponent: React.ComponentClass<PROPS, React.ComponentState>) => {
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
