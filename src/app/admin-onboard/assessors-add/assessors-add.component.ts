import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, NgForm, Validators } from '@angular/forms';
import { AssessorsService } from 'src/app/services/assessors.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TosterService } from 'src/app/services/toster.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-assessors-add',
  templateUrl: './assessors-add.component.html',
  styleUrls: ['./assessors-add.component.css'],
})
export class AssessorsAddComponent implements OnInit {
  assessorsForm: any;
  isValidFormSubmitted: any;
  id: any;
  udata: any;
  applicantSdata: any;
  districtdata: any;
  statedata: any;
  getdistrictApplicant: any;
  districtdataApplicant: any;
  districtdataOffice: any;

  constructor(
    private fb: FormBuilder,
    private assessorss: AssessorsService,
    private router: Router,
    private _Activatedroute: ActivatedRoute,
    private toast: TosterService,
    private locationS: LocationService
  ) {}

  ngOnInit(): void {
    // this.onforminit()
    this.udata = localStorage.getItem('userdata');
    this.udata = JSON.parse(this.udata);
    this.id = this.udata._id;
    this.onforminit();
    this.locationS.getallstates().subscribe((data: any) => {
      console.log(data.result);
      this.statedata = data.result;
    });
  }

  get f() {
    return this.assessorsForm.controls;
  }

  onforminit() {
    this.assessorsForm = this.fb.group({
      firstName: '',
      assessorsDate: '',
      designation: '',
      assessorsEmail: [
        '',
        Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$'),
      ],
      assessorsSecondaryemail: [
        '',
        Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$'),
      ],
      assessorsPhone: ['', Validators.pattern('^[0-9][0-9]{9}$')],
      assessorsAlternateno: ['', Validators.pattern('^[0-9][0-9]{9}$')],
      assessorsEducation: '',
      residentialAddressline: '',
      residentialCountry: 'India',
      residentialState: '',
      residentialCity: '',
      residentialZipcode: '',
      organizationAddressline1: '',
      organizationCountry: 'India',
      organizationState: '',
      organizationCity: '',
      organizationZipcode: '',
      zone: '',
      OrganizationLocation: '',
      batch: '',
      Organization: '',
      organizationDesignation: '',
      organizationProductservice: '',
      Organization2: '',
      organizationDesignation2: '',
      organizationProductservice2: '',
      org_Fullname: '',
      report_Designation: '',
      fsmsCertificate: '',
      exposure: '',
      skill: '',
      org_Email: '',
      assessorsFsmsqualified: '',
      domain: '',
      assessorsTraining: '',
    });
  }

  clickFunction() {
    this.isValidFormSubmitted = false;
    if (this.assessorsForm.invalid) {
      console.log(this.assessorsForm, 'error');
      this.isValidFormSubmitted = true;
    } else {
      console.log(this.assessorsForm.value, 'true');
      this.assessorss
        .addAssessor(this.assessorsForm.value)
        .subscribe((data: any) => {
          console.log('saved');
          this.toast.showSuccess(
            'Congratulation!, Assessors has been updated.'
          );

          // this.assessorsForm.reset()
        });
    }
  }

  getdistrict(e: any) {
    console.log(e.target.value);
    this.locationS
      .getalldistrictwithstatewise({
        statename: e.target.value,
      })
      .subscribe((data: any) => {
        console.log(data);
        this.districtdata = data.result;
      });
  }

  getdistrictonload(state: any) {
    console.log(state);
    this.locationS
      .getalldistrictwithstatewise({
        statename: state,
      })
      .subscribe((data: any) => {
        console.log(data);
        this.districtdata = data.result;
      });
  }

  getdistrictResidential(e: any) {
    console.log(e.target.value);
    this.locationS
      .getalldistrictwithstatewise({
        statename: e.target.value,
      })
      .subscribe((data: any) => {
        console.log(data);
        this.getdistrictApplicant = data.result;
      });
  }

  getdistrictonloadResidential(residentialState: any) {
    console.log(residentialState);
    this.locationS
      .getalldistrictwithstatewise({
        statename: residentialState,
      })
      .subscribe((data: any) => {
        console.log(data);
        this.getdistrictApplicant = data.result;
      });
  }

  getdistrictOffice(e: any) {
    console.log(e.target.value);
    this.locationS
      .getalldistrictwithstatewise({
        statename: e.target.value,
      })
      .subscribe((data: any) => {
        console.log(data);
        this.districtdataOffice = data.result;
      });
  }

  getdistrictonloadContact(organizationState: any) {
    console.log(organizationState);
    this.locationS
      .getalldistrictwithstatewise({
        statename: organizationState,
      })
      .subscribe((data: any) => {
        console.log(data);
        this.districtdataOffice = data.result;
      });
  }
}
