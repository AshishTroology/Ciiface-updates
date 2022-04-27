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
import { CoApplicantService } from 'src/app/services/co-applicant.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-co-applicant',
  templateUrl: './co-applicant.component.html',
  styleUrls: ['./co-applicant.component.css'],
})
export class CoApplicantComponent implements OnInit {
  addMoresection: any = [{}];
  applicant: any = [{}];
  coApplicantForm!: FormGroup;
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
  organizationNameVal: any="";
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
  imageUrlUAM: any;
  uploadedimage: any;
  uploadedimageUAM: any;
  hightestRankingVal: any="";
  designationVal: any="";
  /*****************************/
  imageError: any = false;
  imageErrorMsg: any = '';
  imageUError: any = false;
  imageUAMError: any = '';

  coapp: any = [];
  FinalError: any = { errMsg: '', status: false };
  coapp_id: any;
  actionStatus: any;
  co_orgName: any;
  seccselectedItems: any = [];
  SectorPrevdropdownList: any = [];
  dropdownSettings: IDropdownSettings = {};
  countrydata: any;
  co_operationFormVal: any="";
  co_emailVal: any="";
  constructor(
    private fb: FormBuilder,
    private coapplicantS: CoApplicantService,
    private router: Router,
    private _Activatedroute: ActivatedRoute,
    private toast: TosterService,
    private locationS: LocationService,
    private spinner: NgxSpinnerService,
    private locat: LocationService,
    private applicantS: ApplicantService
  ) {}

  public get f() {
    return this.coApplicantForm.controls;
  }

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_text',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
    };
    // this.onforminit()
    let url = this.router.url.split('/');

    this.spinner.hide();
    this.udata = localStorage.getItem('userdata');
    this.udata = JSON.parse(this.udata);
    console.log(this.udata);

    this.email = this.udata.email;
    this._id = this.udata._id;

    if (url[1] == 'co-applicant-edit') {
      this.actionStatus = 'edit';
      this.coapp_id = this._Activatedroute.snapshot.paramMap.get('id');
      this.coapplicantS
        .getByIdCoApplicant(this.coapp_id)
        .subscribe((c_item: any) => {
          console.log(c_item);
          if (c_item.statusCode == 200) {
            this.coapp = c_item.coapplicantRecord[0];
            this.applicantS.getSector().subscribe((items: any) => {
              items.result.map((item: any) => {
                this.SectorPrevdropdownList.push({ item_text: item });
              });
              this.onforminit(this.coapp);
              this.co_orgName = this.coapp.co_organizationName;
              this.seccselectedItems = this.coapp.co_product;
              this.getStateByCountryName(this.coapp.co_applicantCountry, '');
              this.Setvalue(this.coapp.co_organizationName, 'co_organizationName', null)
              this.Setvalue(
                this.coapp.co_hightestRanking,
                'co_hightestRanking',
                null
              );
              this.Setvalue(this.coapp.co_Designation, 'co_Designation', null)
              this.Setvalue(
                this.coapp.co_operationForm,
                'co_operationForm',
                null
              );
              this.Setvalue(
                this.coapp.co_email,
                'co_email',
                null
              );
              // this.organizationNameVal = this.coapp.organizationName;
            });
            console.log(this.SectorPrevdropdownList, this.seccselectedItems);
          } else {
            window.location.href = '/list-co-applicant';
          }
        });
    } else {
      this.actionStatus = 'add';
      this.applicantS.getSector().subscribe((items: any) => {
        items.result.map((item: any) => {
          this.SectorPrevdropdownList.push({ item_text: item });
        });
        console.log(this.SectorPrevdropdownList, this.seccselectedItems);
        this.onforminit(this.coapp);
      });
    }
    this.locationS.getAllCountries().subscribe((data: any) => {
      console.log(data);
      this.countrydata = data;
    });
    // this.locationS.getallstates().subscribe((data: any) => {
    //   // console.log(data.result);
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

  onItemSelectDropDown(item: any, dropdownName: any) {
    console.log(item, dropdownName);
    if (dropdownName == 'co_product') {
      this.seccselectedItems.push(item);
    }
  }

  onforminit(coapp: any) {
    this.coApplicantForm = this.fb.group({
      applicantId: this._id,
      co_organizationName: [coapp.co_organizationName],
      co_hightestRanking: [coapp.co_hightestRanking],
      co_Designation: [coapp.co_Designation],
      co_operationForm: [coapp.co_operationForm],
      co_email: [
        coapp.co_email,
        [Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')],
      ],
      co_mobileNo: coapp.co_mobileNo,
      co_applicantAddress1: [coapp.co_applicantAddress1],
      co_applicantCountry: [coapp.co_applicantCountry],
      co_applicantZipCode: [coapp.co_applicantZipCode],
      co_applicantState: [coapp.co_applicantState],
      co_applicantCity: [coapp.co_applicantCity],
      co_contactPerson: [coapp.co_contactPerson],
      co_contactDesignation: [coapp.co_contactDesignation],
      co_contactEmail: [
        coapp.co_contactEmail,
        [Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')],
      ],
      co_contactMobile: coapp.co_contactMobile,
      co_contactAddress1: [coapp.co_contactAddress1],
      co_contactCountry: [coapp.co_contactCountry],
      co_contactZipCode: [coapp.co_contactZipCode],
      co_contactState: [coapp.co_contactState],
      co_contactCity: [coapp.co_contactCity],
      co_FoodCategoryNameNumber: [coapp.co_FoodCategoryNameNumber],
      co_criteria: [coapp.co_criteria],
      co_annualApplicant: [coapp.co_annualApplicant],
      co_product: [this.seccselectedItems],
      co_totalEmployee: [coapp.co_totalEmployee],
      co_applicantEquipment: [coapp.co_applicantEquipment],
      co_gst: [
        coapp.co_gst,
        [
          Validators.pattern(
            /^([0][1-9]|[1-2][0-9]|[3][0-7])([A-Z]{5})([0-9]{4})([A-Z]{1}[1-9A-Z]{1})([Z]{1})([0-9A-Z]{1})+$/
          ),
        ],
      ],
      co_tax_invoice: [coapp.co_tax_invoice],
      co_billingAddress: [coapp.co_billingAddress],
      annualApplicantRupee: [coapp.annualApplicantRupee],
      code1: [coapp.code1],
      code2: [coapp.code2],
    });
  }

  Setvalue(org: any, field: any, cond: any) {
    switch (field) {
      case 'co_organizationName':
        this.organizationNameVal = cond == 'with' ? org.target.value : org;
        this.organizationNameVal=(this.organizationNameVal === undefined
          ? ''
          : this.organizationNameVal);
        break;

      case 'co_hightestRanking':
        this.hightestRankingVal = cond == 'with' ? org.target.value : org;
        this.hightestRankingVal =
          this.hightestRankingVal === undefined ? '' : this.hightestRankingVal;
        break;

      case 'co_Designation':
        this.designationVal = cond == 'with' ? org.target.value : org;
        this.designationVal = this.designationVal === undefined?'':this.designationVal
        break;

      case 'co_operationForm':
        this.co_operationFormVal = cond == 'with' ? org.target.value : org;
        this.co_operationFormVal =
          this.co_operationFormVal === undefined
            ? ''
            : this.co_operationFormVal;
        break;
      case 'co_email':
        this.co_emailVal = cond == 'with' ? org.target.value : org;
        this.co_emailVal =
          this.co_emailVal === undefined ? '' : this.co_emailVal;
        break;
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
    this.isValidFormSubmitted = false;
    if (this.coApplicantForm.invalid) {
      this.spinner.hide();
      this.FinalError.errMsg = 'Please check the highlighted fields.';
      this.FinalError.status = true;
      this.isValidFormSubmitted = true;
      console.log(this.coApplicantForm,false);
    } else {
      console.log(this.coApplicantForm,true);
      this.FinalError.errMsg = '';
      this.FinalError.status = false;
      this.coApplicantForm.value.co_organizationName = this.organizationNameVal;
      this.coApplicantForm.value.co_hightestRanking = this.hightestRankingVal;
      this.coApplicantForm.value.co_Designation = this.designationVal;
      this.coApplicantForm.value.co_operationForm = this.co_operationFormVal;
      this.coApplicantForm.value.co_email = this.co_emailVal;
      if (this.actionStatus == 'add') {
        this.coapplicantS
          .saveCoApplicant(this.coApplicantForm.value)
          .subscribe((result: any) => {
            console.log(result);
            if (result.statusCode == 200) {
              this.toast.showSuccess(
                'Congratulation!, Co-Applicant has been added.'
              );
              this.spinner.hide();
              this.router.navigate(['/list-co-applicant']);
            }
          });
      } else {
        this.coapplicantS
          .updateByIdCoApplicant(this.coApplicantForm.value, this.coapp_id)
          .subscribe((result: any) => {
            console.log(result);
            if (result.statusCode == 200) {
              this.toast.showSuccess(
                'Congratulation!, Co-Applicant has been updated.'
              );
              this.spinner.hide();
              this.router.navigate(['/list-co-applicant']);
            }
          });
      }
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
        if (item.result.length != 0) {
          this.Applicant_city = item.result[0].Districtname;
          this.Applicant_state = item.result[0].statename;
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
        if (item.result.length != 0) {
          this.con1_city = item.result[0].Districtname;
          this.con1_state = item.result[0].statename;
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
}
