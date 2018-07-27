/**
 * An interface that is used by the form controls to refer to form state implementations.
 */
declare type ArrayProperties<T> = {
    [P in keyof T]: T[P] extends (infer R)[] ? R : never;
};
export interface FormState<FORM extends Object> {
    get<PROPERTY extends keyof (FORM)>(name: PROPERTY, defaultValue?: FORM[PROPERTY]): FORM[PROPERTY];
    set<PROPERTY extends keyof FORM>(name: PROPERTY, value: FORM[PROPERTY]): FormState<FORM>;
    apply(func: (form: FORM) => FORM): FormState<FORM>;
    getValues(): FORM;
    isEmpty(): boolean;
    sub<SUBFORM>(func: (form: FORM) => SUBFORM): FormState<SUBFORM>;
    subProperty<P extends keyof FORM>(name: P): FormState<FORM[P]>;
    subIndexProperty<P extends keyof ArrayProperties<FORM>>(name: P, index: number): FormState<ArrayProperties<FORM>[P]>;
    mergeProperty<P extends keyof FORM>(name: P, values: FORM[P]): FormState<FORM>;
    mergeIndexProperty<P extends keyof ArrayProperties<FORM>>(name: P, index: number, values: ArrayProperties<FORM>[P]): FormState<FORM>;
}
export {};
