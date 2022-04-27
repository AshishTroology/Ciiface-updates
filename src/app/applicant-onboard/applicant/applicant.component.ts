import { Component, OnInit, ElementRef, HostListener, Directive } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ApplicantService } from 'src/app/services/applicant.service';
import { LocationService } from 'src/app/services/location.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TosterService } from 'src/app/services/toster.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { fromEvent } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';
import Swal from 'sweetalert2';

// import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.css'],
})
export class ApplicantComponent implements OnInit {
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
  imageUrlUAM: any;
  uploadedimage: any;
  uploadedimageUAM: any;
  hightestRankingVal: any;
  designationVal: any;
  /*****************************/
  imageError: any = false;
  imageErrorMsg: any = '';
  imageUError: any = false;
  imageUAMError: any = '';

  textBoxDisabled: any = true;
  amount: any;

  FinalError: any = { errMsg: '', status: false };
  bill_city: any;
  bill_state: any;
  countrydata: any;
  statedataBill: any;
  unit: any;
  munitStatus: any;
  sunitStatus: any;
  btnStatusDisabled: boolean = false;
  validity: any = false;
  constructor(
    private fb: FormBuilder,
    private applicantS: ApplicantService,
    private router: Router,
    private _Activatedroute: ActivatedRoute,
    private toast: TosterService,
    private locationS: LocationService,
    private spinner: NgxSpinnerService,
    private locat: LocationService,
    private el: ElementRef
  ) {}

  public get f() {
    return this.appForm.controls;
  }

  ngOnInit(): void {
    // this.onforminit()
    this.btnStatusDisabled = false;
    this.spinner.show();
    this.udata = localStorage.getItem('userdata');
    this.udata = JSON.parse(this.udata);
    this.applicantS.getSector().subscribe((items: any) => {
      console.log(items);
      this.sector = items.result;
    });
    if (this.udata.role == 'applicant') {
      this.email = this.udata.email;
      this.applicantS
        .GetAdminApplicantSinglebyemail(this.email)
        .subscribe((data: any) => {
          this.spinner.hide();
          this.applicantSdata = data.applicanData;
          this.organizationNameVal = data.applicanData.organizationName;
          this.hightestRankingVal = data.applicanData.hightestRanking;
          this.designationVal = data.applicanData.designation;
          this.uploadedimage = this.applicantSdata.uploadForm;
          this.uploadedimageUAM = this.applicantSdata.uploadFormUAM;
          this.textBoxDisabled = this.applicantSdata.amountStatus;
          this.onforminit(this.applicantSdata);
          this.getProduct(this.applicantSdata.sector, '');
          this.getAmount(this.applicantSdata.amount, '');
          this.getStateByCountryName(this.applicantSdata.applicantCountry, '');
          this.getStateByCountryNameBill(
            this.applicantSdata.contactCountry2,
            ''
          );
          this.onItemChange(this.applicantSdata.applicantProduct, '');
        });
      this._id = this.udata._id;
    } else {
      this.email = this._Activatedroute.snapshot.paramMap.get('id');
      this._id = this._Activatedroute.snapshot.paramMap.get('id');
      console.log('admin', this.email);
      this.applicantS
        .GetAdminApplicantSingle(this.email)
        .subscribe((data: any) => {
          this.spinner.hide();
          this.applicantSdata = data.applicanData[0];
          this.organizationNameVal = data.applicanData[0].organizationName;
          this.hightestRankingVal = data.applicanData[0].hightestRanking;
          this.designationVal = data.applicanData[0].designation;
          this.uploadedimage = this.applicantSdata.uploadForm;
          this.uploadedimageUAM = this.applicantSdata.uploadFormUAM;
          this.textBoxDisabled = this.applicantSdata.amountStatus;
          this.onforminit(this.applicantSdata);
          this.getProduct(this.applicantSdata.sector, '');
          this.getAmount(this.applicantSdata.amount, '');
          this.onItemChange(this.applicantSdata.applicantProduct, '');
          this.getStateByCountryName(this.applicantSdata.applicantCountry, '');
          this.getStateByCountryNameBill(
            this.applicantSdata.contactCountry2,
            ''
          );
        });
    }
    this.locationS.getAllCountries().subscribe((data: any) => {
      console.log(data);
      this.countrydata = data;
    });
    this.locationS.getallstates().subscribe((data: any) => {
      // console.log(data.result);
      this.statedata = data.result;
    });
  }

  getProduct(w: any, on: any) {
    let sector = on == 'with' ? w.target.value : w;
    this.applicantS.getproduct({ sector: sector }).subscribe((element: any) => {
      console.log(element);
      if (sector != 'other') {
         this.f['product'].setValidators([Validators.required]);
        this.f['product'].updateValueAndValidity();
        this.f['othersector'].clearValidators();
        this.f['otherproduct'].clearValidators();
        this.f['othersector'].updateValueAndValidity();
        this.f['otherproduct'].updateValueAndValidity();
      }
      if (element.result.length == 0) {
        this.products = [];
      } else {
        this.products = element.result;
      }
    });
  }

  fetchProduct(pro:any){
     if (pro.target.value != 'other') {
       this.f['othersector'].clearValidators();
       this.f['otherproduct'].clearValidators();
       this.f['othersector'].updateValueAndValidity();
       this.f['otherproduct'].updateValueAndValidity();
     }
  }

  onforminit(r: any) {
    this.appForm = this.fb.group({
      organizationName: [r.organizationName],
      hightestRanking: [r.hightestRanking],
      designation: [r.designation],
      organizationEmail: [
        r.organizationEmail,
        [Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')],
      ],
      code1: [r.code1],
      organizationMobile: [
        r.organizationMobile,
        [Validators.pattern('^[0-9][0-9]{9}$')],
      ],
      ////Applicant
      firstName: [r.firstName],
      operationForm: [r.operationForm],
      applicanthightestRanking: [r.applicanthightestRanking],
      applicantDesignation: [r.applicantDesignation],
      email: [
        r.email,
        [Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')],
      ],
      code2: [r.code2],
      mobileNo: [r.mobileNo, [Validators.pattern('^[0-9][0-9]{9}$')]],
      applicantAddress1: [r.applicantAddress1],
      applicantCountry: [r.applicantCountry],
      applicantState: [r.applicantState],
      applicantCity: [r.applicantCity],
      applicantZipCode: r.applicantZipCode,
      ////contact Person 1
      contactPerson: [r.contactPerson],
      contactDesignation: [r.contactDesignation],
      contactEmail: [
        r.contactEmail,
        [Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')],
      ],
      code3: [r.code3],
      contactMobile: [r.contactMobile, [Validators.pattern('^[0-9][0-9]{9}$')]],
      ////contact Person 2
      contactPerson2: [r.contactPerson2],
      contactDesignation2: [r.contactDesignation2],
      contactEmail2: [
        r.contactEmail2,
        [Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')],
      ],
      code4: [r.code4],
      contactMobile2: [
        r.contactMobile2,
        [Validators.pattern('^[0-9][0-9]{9}$')],
      ],
      ////last section left
      sector: [r.sector],
      FoodCategoryNameNumber: [r.FoodCategoryNameNumber],
      applicantProduct: [r.applicantProduct, [Validators.required]],
      applicantPlant: [r.applicantPlant],
      annualOrganization: [r.annualOrganization],
      annualOrganizationRupee: [r.annualOrganizationRupee],
      classification: [r.classification],
      uploadFormUAM: [r.uploadFormUAM],
      criteria: [r.criteria],

      ///last section right
      product: [r.product],
      totalEmployee: [r.totalEmployee],
      applicantEquipment: [r.applicantEquipment],
      annualApplicant: [r.annualApplicant],
      annualApplicantRupee: [r.annualApplicantRupee],
      uploadForm: [r.uploadForm],
      amount: [r.amount],
      amountStatus: [this.textBoxDisabled],

      //Billing Section
      applicantYear: [r.applicantYear], /////---  Invoice Type field--/////
      annualYear: r.annualYear, ///---------GST------///
      contactAddress2: [r.contactAddress2], ///---------Billing Address------///
      contactCountry2: [r.contactCountry2 == '' ? 'India' : r.contactCountry2], ///---------Billing Country------///
      contactState2: [r.contactState2], ///---------Billing State------///
      contactCity2: [r.contactCity2], ///---------Billing City------///
      contactZipCode2: r.contactZipCode2,
      ///---------Billing Zipcode ------///

      othersector: [r.othersector],
      otherproduct: [r.otherproduct],
    });
  }

  getOrgName(org: any, field: any) {
    switch (field) {
      case 'organizationName':
        this.organizationNameVal = org.target.value;
        break;

      case 'hightestRanking':
        this.hightestRankingVal = org.target.value;
        break;

      case 'designation':
        this.designationVal = org.target.value;
        break;
    }
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
    console.log('Validation Submit Next>>>>>>>>>>>>>>>>>>>>>>>>');
    console.log(this.appForm);
    this.isValidFormSubmitted = false;
    if (this.appForm.invalid) {
      this.spinner.hide();
      console.log(this.appForm, 'error');
      this.appForm.markAllAsTouched();
      this.scrollToFirstInvalidControl();
      this.isValidFormSubmitted = true;
      this.FinalError.errMsg = 'Please check the highlighted fields.';
      this.FinalError.status = true;
      this.btnStatusDisabled = false;
    } else {
      this.btnStatusDisabled = true;
      console.log(this.appForm.value, 'true');
      this.FinalError.errMsg = '';
      this.FinalError.status = false;
      this.appForm.value.organizationName = this.organizationNameVal;
      this.appForm.value.hightestRanking = this.hightestRankingVal;
      this.appForm.value.designation = this.designationVal;
      this.appForm.value.uploadForm = this.imageUrl;
      this.appForm.value.uploadFormUAM = this.uploadedimageUAM;
      this.appForm.value.amountStatus = this.textBoxDisabled;
      this.appForm.value.amount = this.amount;
      this.appForm.value.applicantProduct = this.unit;
       if (this.validity) {
         this.appForm.value.userStatus = false;
           console.log(this.appForm.value);
           this.applicantS
             .updateAdminApplicantSingleEmail(this.appForm.value, this._id)
             .subscribe((data: any) => {
               console.log('saved');
               this.toast.showSuccess(
                 'Congratulation!, Applicant has been updated.'
               );
               this.spinner.hide();
               setTimeout(() => {
                   window.location.reload();
               }, 1000);
             });
       } else {
         this.spinner.hide();
          Swal.fire({
            title: 'Are you sure?',
            text: 'You want to submit your application for review. Once submitted, you will not be able to make any changes.',
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, submit',
          }).then((result) => {
            if (result.isConfirmed) {
              this.spinner.show();
              console.log(this.appForm.value);
              this.appForm.value.userStatus = true;
              this.applicantS
                .updateAdminApplicantSingleEmail(this.appForm.value, this._id)
                .subscribe((data: any) => {
                  console.log('saved');
                  this.toast.showSuccess(
                    'Congratulation!, Applicant has been updated.'
                  );
                  this.spinner.hide();
                  setTimeout(() => {
                    window.location.href = '/applicant-dashboard';
                  }, 1000);
                });
            } else {
              this.btnStatusDisabled = false;
            }
          });
       }


    }
  }
  checkValid() {
    this.removeValidators();
    this.clickFunction();
  }

  onItemChange(unitVal: any, f: any) {
    this.unit = f == 'sett' ? unitVal.target.value : unitVal;
    if (this.unit == 'Manufacturing Unit') {
      this.munitStatus = false;
      this.sunitStatus = true;
    } else {
      this.munitStatus = true;
      this.sunitStatus = false;
    }
  }

  telInputObject(obj: any) {
    console.log(obj);
    obj.setCountry('in');
  }

  getStateByCountryName(country: any, f: any) {
    let countryVal = f == 'sett' ? country.target.value : country;
    this.locationS.getStateByCountry(countryVal).subscribe((items: any) => {
      console.log(items);
      this.statedata = items[0].states;
    });
  }

  getStateByCountryNameBill(country: any, f: any) {
    let countryVal = f == 'sett' ? country.target.value : country;
    this.locationS.getStateByCountry(countryVal).subscribe((items: any) => {
      console.log(items);
      this.statedataBill = items[0].states;
    });
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

  getZipcodeDataCon2(e: any, evn: any) {
    let zipcode = evn == 'with' ? e.target.value : e;
    if (zipcode.length == 6) {
      this.locat.getZipcodeDetails(zipcode).subscribe((item: any) => {
        if (item.result.length != 0) {
          this.con2_city = item.result[0].Districtname;
          this.con2_state = item.result[0].statename;
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

  handleUploadUAM(e: any) {
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
        this.imageUError = true;
        this.imageUAMError = 'File size is too large';
      } else {
        this.imageUError = false;
        this.imageUAMError = '';
        this.applicantS.upload(file[0]).subscribe((result: any) => {
          console.log(result.body);
          this.imageUrlUAM = result.body;
          this.uploadedimageUAM = this.imageUrlUAM;
        });
      }
    } else {
      this.imageUError = true;
      this.imageUAMError = 'File uploaded is invalid!';
    }
  }

  getChk(e: any) {
    if (e.target.checked) {
      this.textBoxDisabled = false;
      console.log(e.target.checked, this.textBoxDisabled);
    } else {
      this.textBoxDisabled = true;
      console.log(e.target.checked, this.textBoxDisabled);
      this.amount = '';
    }
  }

  getAmount(e: any, st: any) {
    this.amount = st == 'with' ? e.target.value : e;
    if (this.amount == undefined) {
      this.amount = '';
    } else {
      this.amount = this.amount;
    }
  }

  finalSave() {
    this.validity = false;
    this.f['organizationName'].setValidators([Validators.required]);
    this.f['hightestRanking'].setValidators([Validators.required]);
    this.f['designation'].setValidators([Validators.required]);
    this.f['organizationEmail'].setValidators([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$'),
    ]);
    this.f['code1'].setValidators([Validators.required]);
    this.f['organizationMobile'].setValidators([Validators.required]);
    ////Applicant
    this.f['firstName'].setValidators([Validators.required]);
    this.f['operationForm'].setValidators([Validators.required]);
    this.f['applicanthightestRanking'].setValidators([Validators.required]);
    this.f['applicantDesignation'].setValidators([Validators.required]);
    this.f['email'].setValidators([Validators.required]);
    this.f['code2'].setValidators([Validators.required]);
    this.f['mobileNo'].setValidators([Validators.required]);
    this.f['applicantAddress1'].setValidators([Validators.required]);
    this.f['applicantCountry'].setValidators([Validators.required]);
    this.f['applicantState'].setValidators([Validators.required]);
    this.f['applicantCity'].setValidators([Validators.required]);
    this.f['applicantZipCode'].setValidators([Validators.required]);
    ////contact Person 1
    this.f['contactPerson'].setValidators([Validators.required]);
    this.f['contactDesignation'].setValidators([Validators.required]);
    this.f['contactEmail'].setValidators([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$'),
    ]);
    this.f['code3'].setValidators([Validators.required]);
    this.f['contactMobile'].setValidators([Validators.required]);
    ////contact Person 2
    this.f['contactPerson2'].setValidators([Validators.required]);
    this.f['contactDesignation2'].setValidators([Validators.required]);
    this.f['contactEmail2'].setValidators([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$'),
    ]);
    this.f['code4'].setValidators([Validators.required]);
    this.f['contactMobile2'].setValidators([Validators.required]);
    ////last section left
    this.f['sector'].setValidators([Validators.required]);
    this.f['FoodCategoryNameNumber'].setValidators([Validators.required]);
    this.f['applicantProduct'].setValidators([Validators.required]);
    this.f['annualOrganization'].setValidators([Validators.required]);
    this.f['annualOrganizationRupee'].setValidators([Validators.required]);
    this.f['classification'].setValidators([Validators.required]);
    this.f['criteria'].setValidators([Validators.required]);

    ///last section right
    this.f['product'].setValidators([Validators.required]);
    this.f['totalEmployee'].setValidators([Validators.required]);
    this.f['annualApplicant'].setValidators([Validators.required]);
    this.f['annualApplicantRupee'].setValidators([Validators.required]);

    //Billing Section
    this.f['applicantYear'].setValidators([Validators.required]); /////---  Invoice Type field--/////
    this.f['annualYear'].setValidators([Validators.required]); ///---------GST------///
    this.f['contactAddress2'].setValidators([Validators.required]); ///---------Billing Address------///
    this.f['contactCountry2'].setValidators([Validators.required]); ///---------Billing Country------///
    this.f['contactState2'].setValidators([Validators.required]); ///---------Billing State------///
    this.f['contactCity2'].setValidators([Validators.required]); ///---------Billing City------///
    this.f['contactZipCode2'].setValidators([Validators.required]); ///---------Billing Zipcode ------///
    this.f['sector'].value === 'other'
      ? this.f['othersector'].setValidators([Validators.required])
      : '';
    this.f['product'].value === 'other'
      ? this.f['otherproduct'].setValidators([Validators.required])
      : '';

    this.f['sector'].value === 'other'
      ? this.f['othersector'].updateValueAndValidity()
      : '';
    this.f['product'].value === 'other'
      ? this.f['otherproduct'].updateValueAndValidity()
      : '';

    this.f['organizationName'].updateValueAndValidity();
    this.f['hightestRanking'].updateValueAndValidity();
    this.f['designation'].updateValueAndValidity();
    this.f['organizationEmail'].updateValueAndValidity();
    this.f['code1'].updateValueAndValidity();
    this.f['organizationMobile'].updateValueAndValidity();
    ////Applicant
    this.f['firstName'].updateValueAndValidity();
    this.f['operationForm'].updateValueAndValidity();
    this.f['applicanthightestRanking'].updateValueAndValidity();
    this.f['applicantDesignation'].updateValueAndValidity();
    this.f['email'].updateValueAndValidity();
    this.f['code2'].updateValueAndValidity();
    this.f['mobileNo'].updateValueAndValidity();
    this.f['applicantAddress1'].updateValueAndValidity();
    this.f['applicantCountry'].updateValueAndValidity();
    this.f['applicantState'].updateValueAndValidity();
    this.f['applicantCity'].updateValueAndValidity();
    this.f['applicantZipCode'].updateValueAndValidity();
    ////contact Person 1
    this.f['contactPerson'].updateValueAndValidity();
    this.f['contactDesignation'].updateValueAndValidity();
    this.f['contactEmail'].updateValueAndValidity();
    this.f['code3'].updateValueAndValidity();
    this.f['contactMobile'].updateValueAndValidity();
    ////contact Person 2
    this.f['contactPerson2'].updateValueAndValidity();
    this.f['contactDesignation2'].updateValueAndValidity();
    this.f['contactEmail2'].updateValueAndValidity();
    this.f['code4'].updateValueAndValidity();
    this.f['contactMobile2'].updateValueAndValidity();
    ////last section left
    this.f['sector'].updateValueAndValidity();
    this.f['FoodCategoryNameNumber'].updateValueAndValidity();
    this.f['applicantProduct'].updateValueAndValidity();
    this.f['annualOrganization'].updateValueAndValidity();
    this.f['annualOrganizationRupee'].updateValueAndValidity();
    this.f['classification'].updateValueAndValidity();
    this.f['criteria'].updateValueAndValidity();

    ///last section right
    this.f['product'].updateValueAndValidity();
    this.f['totalEmployee'].updateValueAndValidity();
    this.f['annualApplicant'].updateValueAndValidity();
    this.f['annualApplicantRupee'].updateValueAndValidity();

    //Billing Section
    this.f['applicantYear'].updateValueAndValidity(); /////---  Invoice Type field--/////
    this.f['annualYear'].updateValueAndValidity(); ///---------GST------///
    this.f['contactAddress2'].updateValueAndValidity(); ///---------Billing Address------///
    this.f['contactCountry2'].updateValueAndValidity(); ///---------Billing Country------///
    this.f['contactState2'].updateValueAndValidity(); ///---------Billing State------///
    this.f['contactCity2'].updateValueAndValidity(); ///---------Billing City------///
    this.f['contactZipCode2'].updateValueAndValidity(); ///---------Billing Zipcode ------///

    console.log('Validation Submit');
  }

  removeValidators() {
    this.validity = true;
    // this.appForm.get('organizationName')?.clearValidators();
    this.f['organizationName'].clearValidators();
    this.f['hightestRanking'].clearValidators();
    this.f['designation'].clearValidators();
    this.f['organizationEmail'].clearValidators();
    this.f['code1'].clearValidators();
    this.f['organizationMobile'].clearValidators();
    ////Applicant
    this.f['firstName'].clearValidators();
    this.f['operationForm'].clearValidators();
    this.f['applicanthightestRanking'].clearValidators();
    this.f['applicantDesignation'].clearValidators();
    this.f['email'].clearValidators();
    this.f['code2'].clearValidators();
    this.f['mobileNo'].clearValidators();
    this.f['applicantAddress1'].clearValidators();
    this.f['applicantCountry'].clearValidators();
    this.f['applicantState'].clearValidators();
    this.f['applicantCity'].clearValidators();
    this.f['applicantZipCode'].clearValidators();
    ////contact Person 1
    this.f['contactPerson'].clearValidators();
    this.f['contactDesignation'].clearValidators();
    this.f['contactEmail'].clearValidators();
    this.f['code3'].clearValidators();
    this.f['contactMobile'].clearValidators();
    ////contact Person 2
    this.f['contactPerson2'].clearValidators();
    this.f['contactDesignation2'].clearValidators();
    this.f['contactEmail2'].clearValidators();
    this.f['code4'].clearValidators();
    this.f['contactMobile2'].clearValidators();
    ////last section left
    this.f['sector'].clearValidators();
    this.f['FoodCategoryNameNumber'].clearValidators();
    this.f['applicantProduct'].clearValidators();
    this.f['annualOrganization'].clearValidators();
    this.f['annualOrganizationRupee'].clearValidators();
    this.f['classification'].clearValidators();
    this.f['criteria'].clearValidators();

    ///last section right
    this.f['product'].clearValidators();
    this.f['totalEmployee'].clearValidators();
    this.f['annualApplicant'].clearValidators();
    this.f['annualApplicantRupee'].clearValidators();

    //Billing Section
    this.f['applicantYear'].clearValidators(); /////---  Invoice Type field--/////
    this.f['annualYear'].clearValidators(); ///---------GST------///
    this.f['contactAddress2'].clearValidators(); ///---------Billing Address------///
    this.f['contactCountry2'].clearValidators(); ///---------Billing Country------///
    this.f['contactState2'].clearValidators(); ///---------Billing State------///
    this.f['contactCity2'].clearValidators(); ///---------Billing City------///
    this.f['contactZipCode2'].clearValidators(); ///---------Billing Zipcode ------///

    this.f['organizationName'].updateValueAndValidity();
    this.f['hightestRanking'].updateValueAndValidity();
    this.f['designation'].updateValueAndValidity();
    this.f['organizationEmail'].updateValueAndValidity();
    this.f['code1'].updateValueAndValidity();
    this.f['organizationMobile'].updateValueAndValidity();
    ////Applicant
    this.f['firstName'].updateValueAndValidity();
    this.f['operationForm'].updateValueAndValidity();
    this.f['applicanthightestRanking'].updateValueAndValidity();
    this.f['applicantDesignation'].updateValueAndValidity();
    this.f['email'].updateValueAndValidity();
    this.f['code2'].updateValueAndValidity();
    this.f['mobileNo'].updateValueAndValidity();
    this.f['applicantAddress1'].updateValueAndValidity();
    this.f['applicantCountry'].updateValueAndValidity();
    this.f['applicantState'].updateValueAndValidity();
    this.f['applicantCity'].updateValueAndValidity();
    this.f['applicantZipCode'].updateValueAndValidity();
    ////contact Person 1
    this.f['contactPerson'].updateValueAndValidity();
    this.f['contactDesignation'].updateValueAndValidity();
    this.f['contactEmail'].updateValueAndValidity();
    this.f['code3'].updateValueAndValidity();
    this.f['contactMobile'].updateValueAndValidity();
    ////contact Person 2
    this.f['contactPerson2'].updateValueAndValidity();
    this.f['contactDesignation2'].updateValueAndValidity();
    this.f['contactEmail2'].updateValueAndValidity();
    this.f['code4'].updateValueAndValidity();
    this.f['contactMobile2'].updateValueAndValidity();
    ////last section left
    this.f['sector'].updateValueAndValidity();
    this.f['FoodCategoryNameNumber'].updateValueAndValidity();
    this.f['applicantProduct'].updateValueAndValidity();
    this.f['annualOrganization'].updateValueAndValidity();
    this.f['annualOrganizationRupee'].updateValueAndValidity();
    this.f['classification'].updateValueAndValidity();
    this.f['criteria'].updateValueAndValidity();

    ///last section right
    this.f['product'].updateValueAndValidity();
    this.f['totalEmployee'].updateValueAndValidity();
    this.f['annualApplicant'].updateValueAndValidity();
    this.f['annualApplicantRupee'].updateValueAndValidity();

    //Billing Section
    this.f['applicantYear'].updateValueAndValidity(); /////---  Invoice Type field--/////
    this.f['annualYear'].updateValueAndValidity(); ///---------GST------///
    this.f['contactAddress2'].updateValueAndValidity(); ///---------Billing Address------///
    this.f['contactCountry2'].updateValueAndValidity(); ///---------Billing Country------///
    this.f['contactState2'].updateValueAndValidity(); ///---------Billing State------///
    this.f['contactCity2'].updateValueAndValidity(); ///---------Billing City------///
    this.f['contactZipCode2'].updateValueAndValidity(); ///---------Billing Zipcode ------///

    this.f['othersector'].clearValidators();
    this.f['otherproduct'].clearValidators();
    this.f['othersector'].updateValueAndValidity();
    this.f['otherproduct'].updateValueAndValidity();
    console.log('remove validator');
  }

  getZipcodeDataConBill(e: any, evn: any) {
    let zipcode = evn == 'with' ? e.target.value : e;
    if (zipcode.length == 6) {
      this.locat.getZipcodeDetails(zipcode).subscribe((item: any) => {
        if (item.result.length != 0) {
          this.bill_city = item.result[0].Districtname;
          this.bill_state = item.result[0].statename;
          this.con1Status = true;
          this.con1Error = '';
        } else {
          this.bill_city = '';
          this.bill_state = '';
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

  private scrollToFirstInvalidControl() {
    const firstInvalidControl: HTMLElement =
      this.el.nativeElement.querySelector('#applicantForm .ng-invalid');

    window.scroll({
      top: this.getTopOffset(firstInvalidControl),
      left: 0,
      behavior: 'smooth',
    });
    fromEvent(window, 'scroll')
      .pipe(debounceTime(100), take(1))
      .subscribe(() => firstInvalidControl.focus());
  }
  private getTopOffset(controlEl: HTMLElement): number {
    const labelOffset = 500;
    console.log(
      controlEl.getBoundingClientRect().top,
      window.scrollY,
      controlEl
    );
    return (
      controlEl.getBoundingClientRect().top +
      Number(window.scrollY) -
      labelOffset
    );
  }
}
