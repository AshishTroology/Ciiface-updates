import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApplicantService } from '../services/applicant.service';

@Component({
  selector: 'app-active-user',
  templateUrl: './active-user.component.html',
  styleUrls: ['./active-user.component.css'],
})
export class ActiveUserComponent implements OnInit {
  id: any;
  mainHeading: any;
  para: any;
  icon: any;
  divStatus: any = false;

  constructor(
    private router: Router,
    private _Activatedroute: ActivatedRoute,
    private ApplicantSer: ApplicantService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    this.id = this._Activatedroute.snapshot.paramMap.get('id');
    this.spinner.show()
    if (this.id.length != 24) {
      // this.router.navigate(['/login']);
      window.location.href = '/login';
    }
    if (this.id) {
      this.icon = '';
      this.mainHeading = '';
      this.para = '';
      this.ApplicantSer.acountDetails(this.id).subscribe((item: any) => {
        console.log(item);
        if (item.updateApplicant.length == 0) {
          this.spinner.hide();
          this.icon = 'fa-times-circle';
          this.mainHeading = 'Oops! The link seems to be wrong.';
          this.para =
            'Please re-check the activation e-mail and click the correct link to activate your account.';
          setInterval(() => {
            // this.router.navigate(['/login']);
            localStorage.clear();
            window.location.href = '/login';
          }, 10000);
        } else {
          if (item.updateApplicant[0].status) {
            this.spinner.hide();
            this.divStatus = true;
            this.icon = 'fa-check-circle';
            this.mainHeading =
              'Hey, seems you have already activated your CII FACE Account!';
          } else {
            this.ApplicantSer.accountActive(this.id).subscribe((ress: any) => {
              this.spinner.hide();
              this.icon = 'fa-check-circle';
              this.mainHeading = "You're all set!";
              this.para =
                'Thank you for verifying your CII Face Applicant Account for CII FACE Awards Assessment 2022. Please go ahead and login using your credentials to complete your Application.';
              setInterval(() => {
                // this.router.navigate(['/login']);
                localStorage.clear();
                window.location.href = '/login';
              }, 10000);
            });
          }
          setInterval(() => {
            // this.router.navigate(['/login']);
            localStorage.clear();
            window.location.href = '/login';
          }, 10000);
        }
      });
    } else {
      // this.router.navigate(['/login']);
      localStorage.clear();
      window.location.href = '/login';
    }
  }

  gologin() {
    localStorage.clear();
    window.location.href = '/login';
  }
  goforgot() {
    localStorage.clear();
    this.router.navigate(['/forgot-password']);
  }
}
