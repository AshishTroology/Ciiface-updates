import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicantService } from '../services/applicant.service';
import { AssessorsService } from '../services/assessors.service';
// import { CalibratorService } from '../services/calibrator.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TosterService } from '../services/toster.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.css'],
})
export class CreatePasswordComponent implements OnInit {
  applicantData: any;
  appForm!: FormGroup;
  isValidFormSubmitted: any;
  isPasswordSame: any;
  id: any;
  user: any;
  phone: any;
  block:any
  unblock: any;
  constructor(
    private fb: FormBuilder,
    private passwordData: ApplicantService,
    private passwordData1: AssessorsService,
    // private passwordData2: CalibratorService,
    private router: Router,
    private _Activatedroute: ActivatedRoute,
    private toast: TosterService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.id = this._Activatedroute.snapshot.paramMap.get('id');
    this.user = this._Activatedroute.snapshot.paramMap.get('type');
    if (this.user == 'applicant') {
      this.passwordData
        .adminApplicantGetPass(this.id, this.user)
        .subscribe((data: any) => {
          console.log(data);
          this.applicantData = data.applicanData[0];
          this.block = this.applicantData.UserData.length==0?false:true;
          console.log(this.block);

          this.onforminit(this.applicantData);
          this.spinner.hide();
        });
    } else if (this.user == 'calibrator') {
      // this.passwordData2
      //   .adminApplicantGetPass(this.id, this.user)
      //   .subscribe((data: any) => {
      //     console.log(data);
      //     this.applicantData = data.calibratorData[0];
      //     this.block = this.applicantData.UserData.length == 0 ? false : true;
      //     this.onforminit(this.applicantData);
      //     this.spinner.hide();
      //   });
    } else if (this.user == 'assessor') {
      this.passwordData1
        .adminApplicantGetPass(this.id, this.user)
        .subscribe((data: any) => {
          console.log(data);
          this.applicantData = data.assessorsData[0];
          this.block = this.applicantData.UserData.length == 0 ? false : true;
          this.onforminit(this.applicantData);
          this.spinner.hide();
        });
    }
    else{
      // this.router.navigate(['/login']);
      localStorage.clear();
      window.location.href = '/login';
    }
    this.unblock=this.block?false:true;
  }

  onforminit(r: any) {
    this.appForm = this.fb.group(
      {
        username: [r.firstName, Validators.required],
        id: [r._id, Validators.required],
        email: [r.assessorsEmail, Validators.required],
        password: ['', [Validators.required]],
        confirm_password: ['', [Validators.required]],
      },
      { validator: this.checkPassword('password', 'confirm_password') }
    );
  }

  checkPassword(controlName: string, matchingControlName: string) {
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
    console.log(this.appForm);
    this.isValidFormSubmitted = false;

    if (this.appForm.invalid) {
      console.log(this.appForm, 'error');
    } else {
      console.log(this.appForm, 'true');
      this.passwordData
        .createPassword(this.appForm.value, this.user)
        .subscribe((data: any) => {
          console.log('saved');
          this.toast.showSuccess('Congratulation!, Password has been created.');
          // this.router.navigate(['/login']);
          localStorage.clear();
          window.location.href = '/login';
        });
    }
  }
  public get f() {
    return this.appForm.controls;
  }
}
