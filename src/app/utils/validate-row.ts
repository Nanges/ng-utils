import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { Observable, merge } from 'rxjs';
import { map, distinctUntilChanged, tap, startWith } from 'rxjs/operators';
import { isEqual } from 'lodash-es';

export type ValidateRowCondition = (values: any[]) => ValidatorFn | ValidatorFn[];

export function validateRow(
    controls: AbstractControl[],
    validateCondition: (values: any[]) => ValidatorFn | ValidatorFn[]
): Observable<any> {
    const validators = [];

    return merge(...controls.map(c => c.valueChanges)).pipe(
        startWith(0),
        map(() => validateCondition(controls.map(c => c.value))),
        distinctUntilChanged((oldV, newV) => isEqual(oldV, newV)),
        map(v => (!v ? [] : v instanceof Array ? v : [v])),
        tap(newValidators => {
            controls.forEach((c, i) => {
                const oldValidator = validators[i] !== undefined ? validators[i] : (validators[i] = c.validator);
                c.setValidators(Validators.compose([oldValidator, ...newValidators]));
                c.updateValueAndValidity({ emitEvent: false });
            });
        })
    );
}
