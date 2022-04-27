import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TosterService } from 'src/app/services/toster.service';
import { FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder } from '@angular/forms';
import { ApplicantService } from 'src/app/services/applicant.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  id: any;
  constructor(
    private router: Router,
    private toast: TosterService,
    private AuthS: AuthService,
    private formB: FormBuilder,
    private applicantS: ApplicantService,
    private _Activatedroute: ActivatedRoute,
  ) {}
  username: any;
  appForm!: FormGroup;
  isPasswordSame: any;
  login_id: any;
  isValidFormSubmitted: any;
  udata: any;
  email: any;
  applicantSdata: any;
  private _id: any;
  Udata: any;
  ngOnInit(): void {
    this.id = this._Activatedroute.snapshot.paramMap.get('id');
    this.onforminit()
  }

  onforminit() {
    this.appForm = this.formB.group(
      {
        new_pass: ['', Validators.compose([Validators.required])],
        c_pass: ['', [Validators.required]],
      },
      { validators: this.checkPassword('new_pass', 'c_pass') }
    );
  }

  checkPassword(controlName: any, matchingControlName: any) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
        this.isPasswordSame = matchingControl.status == 'VALID' ? true : false;
      } else {
        matchingControl.setErrors(null);
        this.isPasswordSame = matchingControl.status == 'VALID' ? true : false;
      }
    };
  }

  clickFunction(): void {
    this.isValidFormSubmitted = false;

    if (this.appForm.invalid) {
      this.isValidFormSubmitted = true;
      console.log(this.appForm, 'error');
    } else {
      console.log(this.appForm,this.id, 'true');
      this.AuthS.resetPasswordSave(
        this.appForm.value,
        this.id
      ).subscribe((data: any) => {
        console.log('saved');
        if (data.statusCode == 200) {
          this.toast.showSuccess(data.message);
          setInterval(()=>{
            // this.router.navigate(['/login']);
            localStorage.clear();
            window.location.href = '/login';
          },5000)
        } else {
          this.toast.showError(data.message);
        }
      });
    }
  }

  public get f() {
    return this.appForm.controls;
  }
}
