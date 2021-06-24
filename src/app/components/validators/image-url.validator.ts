import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function imageUrlValidator(imageUrlRegEx: RegExp, error: ValidationErrors): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value) {
      const imageUrl = imageUrlRegEx.test(control.value);
      return imageUrl ? null : error;
    }
    return null;
  };
}
