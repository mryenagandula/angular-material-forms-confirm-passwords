import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.valid && (control.dirty || control.touched) && !form.valid);
  }
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  //https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
  public form: FormGroup;
  public passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,16}$/
  public matcher = new MyErrorStateMatcher();

  constructor(private fb: FormBuilder) {
    this.formInit();
  }

  ngOnInit(): void {
  }

  private formInit() {
    this.form = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
      confirmNewPassword: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
    }, { validator: this.checkingPasswords });
  }

  public submitForm() {
    console.log(this.form);
    console.log(this.form.getRawValue())
  }

  public isStringContainsNumber(control) {
    return /\d/.test(control.value);
  }

  public isStringLengthEightOrNot(control) {
    return control.value.length >= 8 && control.value.length <= 16;
  }

  public isStringContainsUpperCaseLetter(control) {
    return /[A-Z]/.test(control.value);
  }

  public isStringContainsLowerCaseLetter(control) {
    return /[a-z]/.test(control.value);
  }

  public isStringContainsSpecialCharacter(control) {
    const pattern = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return pattern.test(control.value);
  }

  public checkingPasswords(formGroup: FormGroup) {
    if (
      formGroup.controls.newPassword.value &&
      formGroup.controls.confirmNewPassword.value &&
      formGroup.controls.newPassword.value &&
      formGroup.controls.newPassword.value.length >= 8 &&
      formGroup.controls.newPassword.value.length <= 16 &&
      formGroup.controls.confirmNewPassword.value.length >= 8 &&
      formGroup.controls.confirmNewPassword.value.length <= 16
    ) {
      return formGroup.controls.newPassword.value === formGroup.controls.confirmNewPassword.value ? false : { "notMatched": true }
    }
    return false;
  }

  checkValidations(control, type) {
    switch (type) {
      case 'special-charactor':
        return /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(control.value);;
      case 'number':
        return /\d/.test(control.value);
      case 'lowercase':
        return /[a-z]/.test(control.value);
      case 'uppercase':
        return /[A-Z]/.test(control.value);
      case 'length':
        return control.value.length >= 8 && control.value.length <= 16;
      default:
        return false
    }
  }

}
