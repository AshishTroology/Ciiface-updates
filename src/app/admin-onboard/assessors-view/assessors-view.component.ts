import { Component, OnDestroy, OnInit } from '@angular/core';
import { AssessorsService } from 'src/app/services/assessors.service';
import { TosterService } from 'src/app/services/toster.service';
import { Form, FormBuilder, FormGroup, NgForm, Validators }   from '@angular/forms';
import { Subject } from 'rxjs';
// import '../rxjs/add/operator/map';


@Component({
  selector: 'app-assessors-view',
  templateUrl: './assessors-view.component.html',
  styleUrls: ['./assessors-view.component.css'],
})
export class AssessorsViewComponent implements OnDestroy, OnInit {
  assessors: any;
  assessorsForm: any;
  isValidFormSubmitted: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private fb: FormBuilder,
    private assessorsS: AssessorsService,
    private toast: TosterService
  ) {}
  term: any;

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      ordering: false,
      searching:true
    };

    this.assessorsS.getAssessors().subscribe((data: any) => {
      this.assessors = data.applicanData;
      this.dtTrigger.next();
    });
  }

  public show: boolean = false;
  public buttonName: any = true;
  toggle() {
    this.show = !this.show;
    if (this.show) this.buttonName = false;
    else this.buttonName = true;
  }

  onforminit() {
    this.assessorsForm = this.fb.group({
      zone: [''],
      batch: [''],
      designation: [''],
      presentCo: [''],
      pastCo: [''],
      fsmsCertificate: [''],
      exposure: [''],
      title: [''],
      firstName: [''],
      lastName: [''],
      phone: [''],
      email: [''],
      education: [''],
      year: [''],
      skill: [''],
      domain: [''],
      addressLine1: [''],
      addressLine2: [''],
      zipCode: [''],
      country: [''],
      state: [''],
      city: [''],
    });
  }

  reSendEoi(id: any, email: any) {
    // if (this.assessorsForm.invalid) {
    //   console.log(this.assessorsForm, 'error');
    //   this.isValidFormSubmitted = true;
    // } else {
      console.log(id);
      let url = '/assessorReSendEOI/' + email;
      console.log(email);
      this.assessorsS
        .assessorReSendEOI({ email: email }, id)
        .subscribe((data: any) => {
          console.log('saved');
          let url = '/assessorReSendEOI/' + id;
          console.log(url);
          this.toast.showSuccess('Resend EOI Successfully!.');
          window.location.reload();
        });
    // }
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
