import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ApplicantService } from 'src/app/services/applicant.service';
import { LocationService } from 'src/app/services/location.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TosterService } from 'src/app/services/toster.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-applicant-edit',
  templateUrl: './applicant-edit.component.html',
  styleUrls: ['./applicant-edit.component.css'],
})
export class ApplicantEditComponent implements OnInit {
  addMoresection: any = [{}];
  applicant: any = [{}];
  appForm!: FormGroup;
  appForms: any;
  isValidFormSubmitted: any;
  id: any;
  _id: any;
  udata: any;
  applicantSdata: any;
  statedata: any;
  districtdata: any;
  districtdataApplicant: any;
  districtdataContact: any;
  email: any;
  organizationNameVal: any;
  foodVal: any;
  AddressContact: any = { address: '', state: '', city: '', pincode: '' };
  /*****************************/
  Applicant_city: any = '';
  Applicant_state: any = '';
  pinError: any = '';
  pinStatus: any = true;
  /*****************************/
  con1_city: any = '';
  con1_state: any = '';
  con1Error: any = '';
  con1Status: any = true;
  /*****************************/
  con2_city: any = '';
  con2_state: any = '';
  con2Error: any = '';
  con2Status: any = true;
  sector: any;
  products: any;
  imageUrl: any;
  uploadedimage: any;
  hightestRankingVal: any;
  designationVal: any;
  /*****************************/
  applicantid: any;
  constructor(
    private fb: FormBuilder,
    private applicantS: ApplicantService,
    private router: Router,
    private _Activatedroute: ActivatedRoute,
    private toast: TosterService,
    private locationS: LocationService,
    private spinner: NgxSpinnerService,
    private locat: LocationService
  ) {}

  public get f() {
    return this.appForm.controls;
  }

  ngOnInit(): void {
    // this.onforminit()
    this.applicantid = this._Activatedroute.snapshot.paramMap.get('id');
    this.spinner.show();
    this.udata = localStorage.getItem('userdata');
    this.udata = JSON.parse(this.udata);
    // console.log(this.udata.email);

    this.email = this.udata.email;
    console.log(this.email);

    this.applicantS
      .GetAdminApplicantSingle(this.applicantid)
      .subscribe((data: any) => {
        this.spinner.hide();
        this.applicantSdata = data.applicanData[0];
        this.organizationNameVal = data.applicanData[0].organizationName;
        this.hightestRankingVal = data.applicanData[0].hightestRanking;
        this.designationVal = data.applicanData[0].designation;
        this.uploadedimage = data.applicanData[0].uploadForm;
        this.onforminit(this.applicantSdata);
        this.getProduct(this.applicantSdata.products, '');
        this.getdistrictonload(this.applicantSdata.state);
        this.getdistrictonloadApplicant(this.applicantSdata.applicantState);
        this.getdistrictonloadContact(this.applicantSdata.contactState);
        console.log(this.organizationNameVal);
      });

    this.locationS.getallstates().subscribe((data: any) => {
      // console.log(data.result);
      this.statedata = data.result;
    });

    this._id = this.udata._id;
  }

  getProduct(w: any, on: any) {
    let sector = on == 'with' ? w.target.value : w;
    this.applicantS.getproduct({ sector: sector }).subscribe((element: any) => {
      console.log(element);
      this.products = element.result;
    });
  }
  onforminit(r: any) {
    this.appForm = this.fb.group({
      unitName: [r.unitName],
      criteria: [r.criteria],
      contactPerson: [r.contactPerson],
      sector: [r.sector],
      product: [r.product],
      titleName: [r.titleName],
      lastName: [r.lastName],
      secondaryEmail: [
        r.secondaryEmail,
        [Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')],
      ],
      addressLine1: [r.addressLine1],
      addressLine2: [r.addressLine2],
      zipCode: [r.zipCode],
      country: ['India'],
      // state: [r.state],
      city: [r.city],

      annualOrganizationRupee: [r.annualOrganizationRupee],
      annualApplicantRupee: [r.annualApplicantRupee],
      contactPerson2: [r.contactPerson2],
      contactDesignation2: [r.contactDesignation2],
      contactEmail2: [
        r.contactEmail2,
        [Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')],
      ],
      contactMobile2: [
        r.contactMobile2,
        [Validators.pattern('^[0-9][0-9]{9}$')],
      ],
      contactAddress2: [r.contactAddress2],
      contactCountry2: ['India'],
      contactState2: [r.contactState2],
      contactCity2: [r.contactCity2],
      contactZipCode2: [
        r.contactZipCode2,
        [Validators.pattern('^[1-9][0-9]{5}$')],
      ],
      uploadForm: [r.uploadForm],
      classification: [r.classification],

      organizationName: [r.organizationName],
      hightestRanking: [r.hightestRanking],
      designation: [r.designation],
      organizationEmail: [
        r.organizationEmail,
        [Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')],
      ],
      organizationMobile: [
        r.organizationMobile,
        [Validators.pattern('^[0-9][0-9]{9}$')],
      ],
      firstName: [r.firstName],
      operationForm: [r.operationForm],
      totalEmployee: [r.totalEmployee],
      applicanthightestRanking: [r.applicanthightestRanking],
      applicantDesignation: [r.applicantDesignation],
      email: [
        r.email,
        [Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')],
      ],
      mobileNo: [r.mobileNo, [Validators.pattern('^[0-9][0-9]{9}$')]],
      applicantProduct: [r.applicantProduct],
      contactTitle: [r.contactTitle],
      contactFirstName: [r.contactFirstName],
      contactLastName: [r.contactLastName],
      contactDesignation: [r.contactDesignation],
      contactMobile: [r.contactMobile, [Validators.pattern('^[0-9][0-9]{9}$')]],
      contactEmail: [
        r.contactEmail,
        [Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')],
      ],
      applicantAddress1: [r.applicantAddress1],
      applicantAddress2: [r.applicantAddress2],
      applicantZipCode: [
        r.applicantZipCode,
        [Validators.pattern('^[1-9][0-9]{5}$')],
      ],
      applicantCountry: ['India'],
      applicantState: [r.applicantState],
      applicantCity: [r.applicantCity],
      contactAddress1: [r.contactAddress1],

      contactZipCode: [r.contactZipCode, Validators.pattern('^[1-9][0-9]{5}$')],
      contactCountry: ['India'],
      contactState: [r.contactState],
      contactCity: [r.contactCity],
      applicantPlant: [r.applicantPlant],
      applicantEquipment: [r.applicantEquipment],
      annualOrganization: [r.annualOrganization],
      annualApplicant: [r.annualApplicant],
      annualYear: [r.annualYear],
      applicantYear: [r.applicantYear],
      FoodCategoryNameNumber: [r.FoodCategoryNameNumber],
    });
  }

  getOrgName(org: any) {
    this.organizationNameVal = org.target.value;
  }

  onCheckBox(chk: any) {
    if (chk.target.checked) {
      this.AddressContact.address = this.appForm.value.applicantAddress1;
    } else {
    }
  }

  getAddress(e: any, field: any) {
    if (field === 'applicantAddress1') {
      this.AddressContact.address = e.target.value;
    } else if (field === 'applicantState') {
      this.AddressContact.state = e.target.value;
    } else if (field === 'applicantCity') {
      this.AddressContact.city = e.target.value;
    } else {
      this.AddressContact.pincode = e.target.value;
    }
  }

  clickFunction() {
    this.spinner.show();
    console.log(this.appForm);
    this.isValidFormSubmitted = false;

    if (this.appForm.invalid) {
      this.spinner.hide();
      console.log(this.appForm, 'error');
      this.isValidFormSubmitted = true;
    } else {
      console.log(this.appForm.value, 'true');
      this.appForm.value.organizationName = this.organizationNameVal;
      this.applicantS
        .updateAdminApplicantSingleEmail(this.appForm.value, this._id)
        .subscribe((data: any) => {
          console.log('saved');
          this.toast.showSuccess(
            'Congratulation!, Applicant has been updated.'
          );
          this.spinner.hide();
          this.router.navigate(['/applicant']);
          // this.appForm.reset()
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
        // console.log(data);
        this.districtdata = data.result;
      });
  }

  getdistrictApplicant(e: any) {
    console.log(e.target.value);
    this.locationS
      .getalldistrictwithstatewise({
        statename: e.target.value,
      })
      .subscribe((data: any) => {
        // console.log(data);
        this.districtdataApplicant = data.result;
      });
  }

  getdistrictContact(e: any) {
    console.log(e.target.value);
    this.locationS
      .getalldistrictwithstatewise({
        statename: e.target.value,
      })
      .subscribe((data: any) => {
        // console.log(data);
        this.districtdataContact = data.result;
      });
  }

  getdistrictonload(state: any) {
    console.log(state);
    this.locationS
      .getalldistrictwithstatewise({
        statename: state,
      })
      .subscribe((data: any) => {
        // console.log(data);
        this.districtdata = data.result;
      });
  }

  getdistrictonloadApplicant(applicantState: any) {
    console.log(applicantState);
    this.locationS
      .getalldistrictwithstatewise({
        statename: applicantState,
      })
      .subscribe((data: any) => {
        // console.log(data);
        this.districtdataApplicant = data.result;
      });
  }

  getdistrictonloadContact(contactState: any) {
    console.log(contactState);
    this.locationS
      .getalldistrictwithstatewise({
        statename: contactState,
      })
      .subscribe((data: any) => {
        // console.log(data);
        this.districtdataContact = data.result;
      });
  }

  getZipcodeData(e: any, evn: any) {
    let zipcode = evn == 'with' ? e.target.value : e;
    console.log(e, evn);
    if (zipcode.length == 6) {
      this.locat.getZipcodeDetails(zipcode).subscribe((item: any) => {
        if (item[0].Status == 'Success') {
          this.Applicant_city = item[0].PostOffice[0].District;
          this.Applicant_state = item[0].PostOffice[0].State;
          this.pinStatus = true;
          this.pinError = '';
        } else {
          this.Applicant_city = '';
          this.Applicant_state = '';
          this.pinError = 'Invalid Zip Code';
          this.pinStatus = false;
        }
      });
    } else {
      this.Applicant_city = '';
      this.Applicant_state = '';
      this.pinError = 'Invalid Zip Code';
      this.pinStatus = false;
    }
  }

  getZipcodeDataCon1(e: any, evn: any) {
    let zipcode = evn == 'with' ? e.target.value : e;
    if (zipcode.length == 6) {
      this.locat.getZipcodeDetails(zipcode).subscribe((item: any) => {
        if (item[0].Status == 'Success') {
          this.con1_city = item[0].PostOffice[0].District;
          this.con1_state = item[0].PostOffice[0].State;
          this.con1Status = true;
          this.con1Error = '';
        } else {
          this.con1_city = '';
          this.con1_state = '';
          this.con1Error = 'Invalid Zip Code';
          this.con1Status = false;
        }
      });
    } else {
      this.con1_city = '';
      this.con1_state = '';
      this.con1Error = 'Invalid Zip Code';
      this.con1Status = false;
    }
  }

  getZipcodeDataCon2(e: any, evn: any) {
    let zipcode = evn == 'with' ? e.target.value : e;
    if (zipcode.length == 6) {
      this.locat.getZipcodeDetails(zipcode).subscribe((item: any) => {
        if (item[0].Status == 'Success') {
          this.con2_city = item[0].PostOffice[0].District;
          this.con2_state = item[0].PostOffice[0].State;
          this.con2Status = true;
          this.con2Error = '';
        } else {
          this.con2_city = '';
          this.con2_state = '';
          this.con2Error = 'Invalid Zip Code';
          this.con2Status = false;
        }
      });
    } else {
      this.con2_city = '';
      this.con2_state = '';
      this.con2Error = 'Invalid Zip Code';
      this.con2Status = false;
    }
  }
  imageError: any = false;
  imageErrorMsg = '';
  handleUpload(e: any) {
    console.log(e.target.files);
    let file = e.target.files;
    console.log(file[0]);
    if (
      file[0].type == 'image/png' ||
      file[0].type == 'image/jpg' ||
      file[0].type == 'image/jpeg' ||
      file[0].type == 'application/pdf'
    ) {
      if (parseInt(file[0].size) > 5242880) {
        this.imageError = true;
        this.imageErrorMsg = 'File size is too large';
      } else {
        this.imageError = false;
        this.imageErrorMsg = '';
        this.applicantS.upload(file[0]).subscribe((result: any) => {
          console.log(result.body);
          this.imageUrl = result.body;
          this.uploadedimage = this.imageUrl;
        });
      }
    } else {
      this.imageError = true;
      this.imageErrorMsg = 'File uploaded is invalid!';
    }
  }
}
