import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AbstractControl, FormBuilder, FormGroup, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { ApplicantService } from '../services/applicant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TosterService } from '../services/toster.service'
import { main_mode } from '../global';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  isPasswordSame: any;
  user: any;
  isValidFormSubmitted: any;
  appForm!: FormGroup;
  block: any;
  congPop: any = false;
  maintainance: any = main_mode;
  constructor(
    private spinner: NgxSpinnerService,
    private formB: FormBuilder,
    private passwordData: ApplicantService,
    private router: Router,
    private _Activatedroute: ActivatedRoute,
    private toast: TosterService
  ) {}

  ngOnInit(): void {
    this.onforminit();
  }

  public get f() {
    return this.appForm.controls;
  }

  onforminit() {
    this.appForm = this.formB.group(
      {
        type:['applicant'],
        username: ['', Validators.required],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$'),
          ],
        ],
        mobile: [
          '',
          [Validators.required, Validators.pattern('^[0-9][0-9]{9}$')],
        ],
        password: ['', [Validators.required]],
        confirm_password: ['', [Validators.required]],
      },
      { validators: this.checkPassword('password', 'confirm_password') }
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
    this.spinner.show();
    this.isValidFormSubmitted = false;

    if (this.appForm.invalid) {
      this.isValidFormSubmitted = true;
      this.spinner.hide();
      console.log(this.appForm, 'error');
      // this.router.navigate(['/view-applicant'])
    } else {
      console.log(this.appForm, 'true');
      this.passwordData.signUp(this.appForm.value).subscribe((data: any) => {
        console.log('saved');
        if (data.statuscode == 200) {
          this.spinner.hide();
          this.congPop = true;
          setInterval(() => {
            // this.router.navigate(['/login']);
            window.location.href="/login"
          }, 10000);
        } else {
          this.spinner.hide();
          this.toast.showError(data.message);
        }
      });
    }
  }

  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  emailFormat(email: any) {
    var str = email;
    var len = str.length;
    let str2 = str.substring(len, str.length - 6);

    let str1 = str.substring(0, str.length - (len - 2));
    return str1 + 'xxx@xxx' + str2;
  }
}
