import { FormState } from "./FormState";
import { ArrayProperties } from "./types";
/**
 * A class to assist with a form that creates an object.
 *
 * FORM is the type of the object to be populated.
 *
 * This object is immutable, so it is suitable to be put into a React component state.
 */
export declare class SimpleFormState<FORM extends Object> implements FormState<FORM> {
    private form;
    constructor(source: FORM);
    /**
     * Return the value of the given property.
     * @param name Property name
     */
    get<PROPERTY extends keyof FORM>(name: PROPERTY, defaultValue?: FORM[PROPERTY]): FORM[PROPERTY];
    /**
     * Return a new form state with the value of the given property set in the patch. If the patch value exactly
     * matches the source value, the value in the patch is cleared.
     * @param name Property name
     * @param value New value
     */
    set<PROPERTY extends keyof FORM>(name: PROPERTY, value: FORM[PROPERTY]): SimpleFormState<FORM>;
    apply(func: (form: FORM) => FORM): SimpleFormState<FORM>;
    /**
     * Return a new form state with the values from the given patch merged in to this state.
     * @param other A patch object
     */
    merge(other: FORM): SimpleFormState<FORM>;
    /**
     * Returns a copy of the current patch state.
     */
    getValues(): FORM;
    /**
     * Returns true if the patch is empty.
     */
    isEmpty(): boolean;
    sub<SUBFORM>(func: (form: FORM) => SUBFORM): SimpleFormState<SUBFORM>;
    subProperty<P extends keyof FORM>(name: P): SimpleFormState<FORM[P]>;
    subIndexProperty<P extends keyof ArrayProperties<FORM>>(name: P, index: number): SimpleFormState<ArrayProperties<FORM>[P]>;
    mergeProperty<P extends keyof FORM>(name: P, values: FORM[P]): SimpleFormState<FORM>;
    mergeIndexProperty<P extends keyof ArrayProperties<FORM>>(name: P, index: number, values: ArrayProperties<FORM>[P]): SimpleFormState<FORM>;
}
