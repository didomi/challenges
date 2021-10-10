import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputChangedEvent } from './interfaces';

export interface ErrorList {
  [k: string]: string[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  errorList: ErrorList = {};

  submit() {
    if (this.form.invalid) {
      this.errorList = getErrors(this.form);
      return;
    }

    alert(JSON.stringify(this.form.value, null, 2));
  }

  inputChanged({ target: { type, value } }: InputChangedEvent): void {
    delete this.errorList?.[type];
    this.form.get(type)?.patchValue(value);
    this.form.markAsTouched();
  }
}

const getErrors = (form: FormGroup): ErrorList => {
  return Object.keys(form.controls)
    .filter((key) => form.touched && form.get(key)?.errors)
    .map((key) => ({ [key]: Object.keys(form.get(key)?.errors as {}) }))
    .reduce((result, array) => Object.assign(result, { ...array }), {});
};
