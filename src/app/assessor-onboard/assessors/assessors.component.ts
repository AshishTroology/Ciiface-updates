import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AssessorsService } from 'src/app/services/assessors.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TosterService } from 'src/app/services/toster.service';
import { LocationService } from 'src/app/services/location.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ApplicantService } from 'src/app/services/applicant.service';
@Component({
  selector: 'app-assessors',
  templateUrl: './assessors.component.html',
  styleUrls: ['./assessors.component.css'],
})
export class AssessorsComponent implements OnInit {
  assessorsForm!: FormGroup;
  isValidFormSubmitted: any;
  id: any;
  udata: any;
  applicantSdata: any = [];
  districtdata: any;
  statedata: any;
  getdistrictApplicant: any;
  districtdataApplicant: any;
  districtdataOffice: any;
  exp_array: any = [];

  SectorCurrdropdownList: any = [];
  SectorPrevdropdownList: any = [];
  SectordropdownList: any = [];
  ExpodropdownList: any = [];
  ExpdropdownList: any = [];
  selectedItems: any = [];
  eselectedItems: any = [];
  secselectedItems: any = [];
  secpselectedItems: any = [];
  seccselectedItems: any = [];
  dropdownSettings: IDropdownSettings = {};
  firstNameValue: any ;
  dobValue: any = '';
  FinalError: any = { errMsg: '', status: false };
  countrydata: any;
  statedata2: any;
  constructor(
    private fb: FormBuilder,
    private assessorss: AssessorsService,
    private router: Router,
    private _Activatedroute: ActivatedRoute,
    private toast: TosterService,
    private locationS: LocationService,
    private applicantS: ApplicantService
  ) {}
  getValues(e: any, field: any) {
    if (field == 'dob') {
      this.dobValue = e.target.value;
    } else {
      this.dobValue = e;
    }
  }

  getValuesName(e: any, field: any) {
    if (field == 'name') {
      this.firstNameValue = e.target.value;
    } else {
      this.firstNameValue = e;
    }
  }
  ngOnInit(): void {
    // this.onforminit()
    for (let n = 1; n < 45; ++n) {
      this.ExpdropdownList.push({ item_text: n });
    }

    this.ExpodropdownList = [
      { item_text: 'TQM' },
      { item_text: 'TPM' },
      { item_text: 'Six Sigma' },
      { item_text: 'Business Excellence' },
      { item_text: 'Improvement Initiatives' },
    ];
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_text',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
    };

    this.udata = localStorage.getItem('userdata');
    this.udata = JSON.parse(this.udata);
    this.id = this.udata._id;

    if (this.udata.role == 'assessor') {
      this.applicantS.getSector().subscribe((items: any) => {
        items.result.map((item: any) => {
          this.SectordropdownList.push({ item_text: item });
          this.SectorPrevdropdownList.push({ item_text: item });
          this.SectorCurrdropdownList.push({ item_text: item });
        });
      });
      this.assessorss
        .GetAssessorSingle(this.udata._id)
        .subscribe((data: any) => {
          console.log(data.applicanData);
          this.applicantSdata = data.applicanData;
          this.onforminit(this.applicantSdata);
          // this.firstNameValue = this.applicantSdata.firstName;
          this.secselectedItems = this.applicantSdata.domain;
          this.selectedItems = this.applicantSdata.exposure;
          this.seccselectedItems =
            this.applicantSdata.organizationProductservice;
          this.secpselectedItems =
            this.applicantSdata.organizationProductservice2;
          this.getValuesName(this.applicantSdata.firstName, '');
          this.getValues(this.applicantSdata.assessorsDate, '');
          // this.getdistrictonloadContact(this.applicantSdata.organizationState);
          // this.getdistrictonloadResidential(
          //   this.applicantSdata.residentialState
          // );
          this.getStateByCountryName(
            this.applicantSdata.residentialCountry,
            ''
          );
          this.getStateByCountryName2(
            this.applicantSdata.organizationCountry,
            ''
          );
          console.log(this.seccselectedItems, this.secpselectedItems);
        });
    } else {
      this.applicantS.getSector().subscribe((items: any) => {
        items.result.map((item: any) => {
          this.SectordropdownList.push({ item_text: item });
          this.SectorPrevdropdownList.push({ item_text: item });
          this.SectorCurrdropdownList.push({ item_text: item });
        });
        this.onforminit(this.applicantSdata);
        this.secselectedItems = [];
        this.selectedItems = [];
        this.seccselectedItems = [];
        this.secpselectedItems = [];
      });
    }
    this.locationS.getAllCountries().subscribe((data: any) => {
      this.countrydata = data;
    });
    // this.locationS.getallstates().subscribe((data: any) => {
    //   this.statedata = data.result;
    // });
  }

  getStateByCountryName(country: any, f: any) {
    let countryVal = f == 'sett' ? country.target.value : country;
    this.locationS.getStateByCountry(countryVal).subscribe((items: any) => {
      console.log(items);
      this.statedata = items[0].states;
    });
  }

  getStateByCountryName2(country: any, f: any) {
    let countryVal = f == 'sett' ? country.target.value : country;
    this.locationS.getStateByCountry(countryVal).subscribe((items: any) => {
      console.log(items);
      this.statedata2 = items[0].states;
    });
  }

  public get f() {
    return this.assessorsForm.controls;
  }

  onItemSelectDropDown(item: any, dropdownName: any) {
    console.log(item, dropdownName);
    if (dropdownName == 'domain') {
      this.secselectedItems.push(item);
    } else if (dropdownName == 'exposure') {
      this.selectedItems.push(item);
    } else if (dropdownName == 'organizationProductservice') {
      this.seccselectedItems.push(item);
    } else {
      this.secpselectedItems.push(item);
    }
  }

  onforminit(r: any) {
    this.assessorsForm = this.fb.group({
      firstName: [r.firstName],
      assessorsDate: [r.assessorsDate],
      designation: [r.designation],
      assessorsEmail: [r.assessorsEmail],
      assessorsSecondaryemail: [r.assessorsSecondaryemail],
      assessorsPhone: [r.assessorsPhone],
      assessorsAlternateno: [r.assessorsAlternateno],
      assessorsEducation: [r.assessorsEducation],
      residentialAddressline: [r.residentialAddressline],
      residentialCountry: [r.residentialCountry],
      residentialState: [r.residentialState],
      residentialCity: [r.residentialCity],
      residentialZipcode: [r.residentialZipcode],
      organizationAddressline1: [r.organizationAddressline1],
      organizationCountry: [r.organizationCountry],
      organizationState: [r.organizationState],
      organizationCity: [r.organizationCity],
      organizationZipcode: [r.organizationZipcode],
      zone: [r.zone],
      OrganizationLocation: [r.OrganizationLocation],
      batch: [r.batch],
      Organization: [r.Organization],
      organizationDesignation: [r.organizationDesignation],
      organizationProductservice: [
        this.udata.role == 'assessor' ? this.secpselectedItems : '',
      ],
      Organization2: [r.Organization2],
      organizationDesignation2: [r.organizationDesignation2],
      organizationProductservice2: [
        this.udata.role == 'assessor' ? this.seccselectedItems : '',
      ],
      org_Fullname: [r.org_Fullname],
      report_Designation: [r.report_Designation],
      fsmsCertificate: [r.fsmsCertificate],
      exposure: [this.udata.role == 'assessor' ? this.selectedItems : ''],
      experience: [r.experience],
      skill: [r.skill],
      org_Email: [
        r.org_Email,
        [Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')],
      ],
      assessorsFsmsqualified: [r.assessorsFsmsqualified],
      domain: [this.udata.role == 'assessor' ? this.secselectedItems : ''],
      assessorsTraining: [r.assessorsTraining],
      code1: [r.code1],
      code2: [r.code2],
    });
  }

  duplicateArr(arr: any, comp: any = 'item_text') {
    const unique = arr
      .map((e: any) => e[comp])
      .map((e: any, i: any, final: any) => final.indexOf(e) === i && i)
      .filter((e: any) => arr[e])
      .map((e: any) => arr[e]);
    return unique;
  }

  clickFunction() {
    this.isValidFormSubmitted = false;
    if (this.assessorsForm.invalid) {
      console.log(this.assessorsForm, 'error');
      this.isValidFormSubmitted = true;
      this.FinalError.errMsg = 'Please check the highlighted fields.';
      this.FinalError.status = true;
    } else {
      this.FinalError.errMsg = '';
      this.FinalError.status = false;
      console.log(this.assessorsForm.value, 'true');
      this.assessorsForm.value.assessorsDate = this.dobValue;
      this.assessorsForm.value.firstName = this.firstNameValue;
      this.assessorsForm.value.domain = this.duplicateArr(
        this.secselectedItems
      );
      this.assessorsForm.value.exposure = this.duplicateArr(this.selectedItems);
      this.assessorsForm.value.organizationProductservice = this.duplicateArr(
        this.seccselectedItems
      );
      this.assessorsForm.value.organizationProductservice2 = this.duplicateArr(
        this.secpselectedItems
      );
      console.log(this.assessorsForm.value);
      if (this.udata.role == 'assessor') {
        this.assessorss
          .updateAssessors(this.assessorsForm.value, this.id)
          .subscribe((data: any) => {
            console.log('saved');
            this.toast.showSuccess(
              'Congratulation!, Assessors has been updated.'
            );
          });
      } else {
        this.assessorss
          .addAssessor(this.assessorsForm.value)
          .subscribe((data: any) => {
            console.log('saved');
            this.toast.showSuccess(
              'Congratulation!, Assessors has been Added.'
            );
          });
      }
      window.location.reload();
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

  finalsave() {
    this.f['firstName'].setValidators([Validators.required]);
    this.f['assessorsDate'].setValidators([Validators.required]);
    this.f['designation'].setValidators([Validators.required]);
    this.f['assessorsEmail'].setValidators([Validators.required]);
    this.f['assessorsSecondaryemail'].setValidators([Validators.required]);
    this.f['assessorsPhone'].setValidators([Validators.required]);
    this.f['assessorsAlternateno'].setValidators([Validators.required]);
    this.f['assessorsEducation'].setValidators([Validators.required]);
    this.f['residentialAddressline'].setValidators([Validators.required]);
    this.f['residentialCountry'].setValidators([Validators.required]);
    this.f['residentialState'].setValidators([Validators.required]);
    this.f['residentialCity'].setValidators([Validators.required]);
    this.f['residentialZipcode'].setValidators([Validators.required]);
    this.f['organizationAddressline1'].setValidators([Validators.required]);
    this.f['organizationCountry'].setValidators([Validators.required]);
    this.f['organizationState'].setValidators([Validators.required]);
    this.f['organizationCity'].setValidators([Validators.required]);
    this.f['organizationZipcode'].setValidators([Validators.required]);
    this.f['zone'].setValidators([Validators.required]);
    this.f['OrganizationLocation'].setValidators([Validators.required]);
    this.f['batch'].setValidators([Validators.required]);
    this.f['Organization'].setValidators([Validators.required]);
    this.f['organizationDesignation'].setValidators([Validators.required]);
    this.f['organizationProductservice'].setValidators([Validators.required]);
    this.f['Organization2'].setValidators([Validators.required]);
    this.f['organizationDesignation2'].setValidators([Validators.required]);
    this.f['org_Fullname'].setValidators([Validators.required]);
    this.f['report_Designation'].setValidators([Validators.required]);
    this.f['fsmsCertificate'].setValidators([Validators.required]);
    this.f['exposure'].setValidators([Validators.required]);
    this.f['experience'].setValidators([Validators.required]);
    this.f['skill'].setValidators([Validators.required]);
    this.f['org_Email'].setValidators([Validators.required]);
    this.f['assessorsFsmsqualified'].setValidators([Validators.required]);
    this.f['domain'].setValidators([Validators.required]);
    this.f['assessorsTraining'].setValidators([Validators.required]);
    this.f['firstName'].updateValueAndValidity();
    this.f['assessorsDate'].updateValueAndValidity();
    this.f['designation'].updateValueAndValidity();
    this.f['assessorsEmail'].updateValueAndValidity();
    this.f['assessorsSecondaryemail'].updateValueAndValidity();
    this.f['assessorsPhone'].updateValueAndValidity();
    this.f['assessorsAlternateno'].updateValueAndValidity();
    this.f['assessorsEducation'].updateValueAndValidity();
    this.f['residentialAddressline'].updateValueAndValidity();
    this.f['residentialCountry'].updateValueAndValidity();
    this.f['residentialState'].updateValueAndValidity();
    this.f['residentialCity'].updateValueAndValidity();
    this.f['residentialZipcode'].updateValueAndValidity();
    this.f['organizationAddressline1'].updateValueAndValidity();
    this.f['organizationCountry'].updateValueAndValidity();
    this.f['organizationState'].updateValueAndValidity();
    this.f['organizationCity'].updateValueAndValidity();
    this.f['organizationZipcode'].updateValueAndValidity();
    this.f['zone'].updateValueAndValidity();
    this.f['OrganizationLocation'].updateValueAndValidity();
    this.f['batch'].updateValueAndValidity();
    this.f['Organization'].updateValueAndValidity();
    this.f['organizationDesignation'].updateValueAndValidity();
    this.f['organizationProductservice'].updateValueAndValidity();
    this.f['Organization2'].updateValueAndValidity();
    this.f['organizationDesignation2'].updateValueAndValidity();
    this.f['org_Fullname'].updateValueAndValidity();
    this.f['report_Designation'].updateValueAndValidity();
    this.f['fsmsCertificate'].updateValueAndValidity();
    this.f['exposure'].updateValueAndValidity();
    this.f['experience'].updateValueAndValidity();
    this.f['skill'].updateValueAndValidity();
    this.f['org_Email'].updateValueAndValidity();
    this.f['assessorsFsmsqualified'].updateValueAndValidity();
    this.f['domain'].updateValueAndValidity();
    this.f['assessorsTraining'].updateValueAndValidity();
  }

  removeValidators() {
    this.f['firstName'].clearValidators();
    this.f['assessorsDate'].clearValidators();
    this.f['designation'].clearValidators();
    this.f['assessorsEmail'].clearValidators();
    this.f['assessorsSecondaryemail'].clearValidators();
    this.f['assessorsPhone'].clearValidators();
    this.f['assessorsAlternateno'].clearValidators();
    this.f['assessorsEducation'].clearValidators();
    this.f['residentialAddressline'].clearValidators();
    this.f['residentialCountry'].clearValidators();
    this.f['residentialState'].clearValidators();
    this.f['residentialCity'].clearValidators();
    this.f['residentialZipcode'].clearValidators();
    this.f['organizationAddressline1'].clearValidators();
    this.f['organizationCountry'].clearValidators();
    this.f['organizationState'].clearValidators();
    this.f['organizationCity'].clearValidators();
    this.f['organizationZipcode'].clearValidators();
    this.f['zone'].clearValidators();
    this.f['OrganizationLocation'].clearValidators();
    this.f['batch'].clearValidators();
    this.f['Organization'].clearValidators();
    this.f['organizationDesignation'].clearValidators();
    this.f['organizationProductservice'].clearValidators();
    this.f['Organization2'].clearValidators();
    this.f['organizationDesignation2'].clearValidators();
    this.f['org_Fullname'].clearValidators();
    this.f['report_Designation'].clearValidators();
    this.f['fsmsCertificate'].clearValidators();
    this.f['exposure'].clearValidators();
    this.f['experience'].clearValidators();
    this.f['skill'].clearValidators();
    this.f['org_Email'].clearValidators();
    this.f['assessorsFsmsqualified'].clearValidators();
    this.f['domain'].clearValidators();
    this.f['assessorsTraining'].clearValidators();
    this.f['firstName'].updateValueAndValidity();
    this.f['assessorsDate'].updateValueAndValidity();
    this.f['designation'].updateValueAndValidity();
    this.f['assessorsEmail'].updateValueAndValidity();
    this.f['assessorsSecondaryemail'].updateValueAndValidity();
    this.f['assessorsPhone'].updateValueAndValidity();
    this.f['assessorsAlternateno'].updateValueAndValidity();
    this.f['assessorsEducation'].updateValueAndValidity();
    this.f['residentialAddressline'].updateValueAndValidity();
    this.f['residentialCountry'].updateValueAndValidity();
    this.f['residentialState'].updateValueAndValidity();
    this.f['residentialCity'].updateValueAndValidity();
    this.f['residentialZipcode'].updateValueAndValidity();
    this.f['organizationAddressline1'].updateValueAndValidity();
    this.f['organizationCountry'].updateValueAndValidity();
    this.f['organizationState'].updateValueAndValidity();
    this.f['organizationCity'].updateValueAndValidity();
    this.f['organizationZipcode'].updateValueAndValidity();
    this.f['zone'].updateValueAndValidity();
    this.f['OrganizationLocation'].updateValueAndValidity();
    this.f['batch'].updateValueAndValidity();
    this.f['Organization'].updateValueAndValidity();
    this.f['organizationDesignation'].updateValueAndValidity();
    this.f['organizationProductservice'].updateValueAndValidity();
    this.f['Organization2'].updateValueAndValidity();
    this.f['organizationDesignation2'].updateValueAndValidity();
    this.f['org_Fullname'].updateValueAndValidity();
    this.f['report_Designation'].updateValueAndValidity();
    this.f['fsmsCertificate'].updateValueAndValidity();
    this.f['exposure'].updateValueAndValidity();
    this.f['experience'].updateValueAndValidity();
    this.f['skill'].updateValueAndValidity();
    this.f['org_Email'].updateValueAndValidity();
    this.f['assessorsFsmsqualified'].updateValueAndValidity();
    this.f['domain'].updateValueAndValidity();
    this.f['assessorsTraining'].updateValueAndValidity();
  }
}
