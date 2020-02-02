import { FormArray, FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { ValidateRowCondition, validateRow } from './validate-row';

describe('validate-row helper', () => {
    let formArray: FormArray;
    let row: AbstractControl[];

    beforeEach(() => {
        formArray = new FormArray([
            new FormGroup({
                foo: new FormControl(null, Validators.minLength(3)),
            }),
            new FormGroup({
                foo: new FormControl(),
            }),
            new FormGroup({
                foo: new FormControl(),
            }),
        ]);

        row = formArray.controls.map(fg => fg.get('foo'));
    });

    it('should check at setup', () => {
        expect(formArray.valid).toBe(true);

        const cdt: ValidateRowCondition = () => Validators.required;
        validateRow(row, cdt).subscribe();

        expect(formArray.invalid).toBe(true);
    });

    it('should evaluate condition when row value changes', () => {
        const cdt: ValidateRowCondition = (vS: string[]) => (vS.some(v => !!v) ? Validators.required : null);
        const spy = jasmine.createSpy('cdt', cdt).and.callThrough();

        validateRow(row, spy).subscribe();

        formArray.controls[1].get('foo').setValue('bar');

        expect(spy.calls.count()).toEqual(2);
    });

    it('should preserve validators', () => {
        const ctrl0 = formArray.controls[0].get('foo');
        const ctrl1 = formArray.controls[1].get('foo');
        ctrl0.setValue('ba');

        const cdt: ValidateRowCondition = (vS: string[]) => (vS.some(v => !!v) ? Validators.required : null);
        validateRow(row, cdt).subscribe();

        expect(ctrl0.hasError('minlength')).toBeTruthy();
        expect(ctrl1.hasError('required')).toBeTruthy();
    });
});
