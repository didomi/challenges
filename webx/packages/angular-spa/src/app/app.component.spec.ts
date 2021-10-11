import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';

const formGroup = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required]),
});

describe('AppComponent', () => {
  let fixture: MockedComponentFixture<AppComponent>;

  beforeEach(() => {
    MockBuilder(AppComponent, AppModule);
    fixture = MockRender(AppComponent);
    fixture.componentInstance.form = formGroup;
  });

  describe('Component', () => {
    it('should instantiate', () => {
      expect(fixture.point.componentInstance).toBeDefined();
    });

    it('should create DOM Component', () => {
      expect(fixture.elementRef.nativeElement).toBeTruthy();
    });
  });

  describe('Form', () => {
    it('should be invalid ', () => {
      const form = fixture.componentInstance.form;
      form.get('email')?.patchValue('test');
      expect(form.status).toBe('INVALID');
    });

    it('should be valid ', () => {
      const form = fixture.componentInstance.form;
      form.get('email')?.patchValue('test@user.io');
      form.get('password')?.patchValue('12345678');
      expect(form.status).toBe('VALID');
    });
  });
});
