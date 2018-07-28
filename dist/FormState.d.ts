/**
 * An interface that is used by the form controls to refer to form state implementations.
 */
export interface FormState<FORM extends Object> {
    get<PROPERTY extends keyof (FORM)>(name: PROPERTY, defaultValue?: FORM[PROPERTY]): FORM[PROPERTY];
    set<PROPERTY extends keyof FORM>(name: PROPERTY, value: FORM[PROPERTY]): FormState<FORM>;
    apply(func: (form: FORM) => FORM): FormState<FORM>;
    getValues(): FORM;
    isEmpty(): boolean;
}
