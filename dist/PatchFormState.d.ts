import { FormState } from './FormState';
import { ArrayProperties, Combined } from './types';
/**
 * A class to assist with a form that creates a patch request for an object.
 *
 * SOURCE is the type of the original object. PATCH is the type of the patch request, which
 * should have every property as optional.
 *
 * This object is immutable, so it is suitable to be put into a React component state.
 */
export declare class PatchFormState<SOURCE, PATCH> implements FormState<Combined<SOURCE, PATCH>> {
    private source;
    private patch;
    constructor(source: SOURCE, patch: PATCH);
    /**
     * Return the value of the given property from the patch, or from the source.
     * @param name Property name
     */
    get<PROPERTY extends keyof Combined<SOURCE, PATCH>>(name: PROPERTY, defaultValue?: Combined<SOURCE, PATCH>[PROPERTY]): Combined<SOURCE, PATCH>[PROPERTY];
    /**
     * Return a new form state with the value of the given property set in the patch. If the patch value exactly
     * matches the source value, the value in the patch is cleared.
     * @param name Property name
     * @param value New value
     */
    set<PROPERTY extends keyof Combined<SOURCE, PATCH>>(name: PROPERTY, value: Combined<SOURCE, PATCH>[PROPERTY] | undefined): PatchFormState<SOURCE, PATCH>;
    apply(func: (form: Combined<SOURCE, PATCH>) => Combined<SOURCE, PATCH>): PatchFormState<SOURCE, PATCH>;
    /**
     * Return a new form state with the values from the given patch merged in to this state.
     * @param other A patch object
     */
    merge(other: Combined<SOURCE, PATCH>): PatchFormState<SOURCE, PATCH>;
    /**
     * Returns a copy of the current patch state.
     */
    getValues(): Combined<SOURCE, PATCH>;
    /**
     * Returns true if the patch is empty.
     */
    isEmpty(): boolean;
    sub<SUBSOURCE, SUBPATCH>(func: (form: Combined<SOURCE, PATCH>) => Combined<SUBSOURCE, SUBPATCH>): PatchFormState<SUBSOURCE, SUBPATCH>;
    subProperty<P extends keyof Combined<SOURCE, PATCH>>(name: P): PatchFormState<SOURCE[P], Required<PATCH>[P]>;
    subIndexProperty<P extends keyof ArrayProperties<Combined<SOURCE, PATCH>>>(name: P, index: number): PatchFormState<ArrayProperties<SOURCE>[P], ArrayProperties<Required<PATCH>>[P]>;
    mergeProperty<P extends keyof Combined<SOURCE, PATCH>>(name: P, values: Combined<SOURCE, PATCH>[P]): PatchFormState<SOURCE, PATCH>;
    mergeIndexProperty<P extends keyof ArrayProperties<Combined<SOURCE, PATCH>>>(name: P, index: number, values: ArrayProperties<Combined<SOURCE, PATCH>>[P]): PatchFormState<SOURCE, PATCH>;
}
