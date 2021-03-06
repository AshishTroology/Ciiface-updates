import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Subject } from 'rxjs';
import { AllocationService } from 'src/app/services/allocation.service';
import { ApplicantService } from 'src/app/services/applicant.service';
import { AssessorsService } from 'src/app/services/assessors.service';
import { QuestionService } from 'src/app/services/question.service';
import { TosterService } from 'src/app/services/toster.service';
@Component({
  selector: 'app-create-allocation',
  templateUrl: './create-allocation.component.html',
  styleUrls: ['./create-allocation.component.css'],
})
export class CreateAllocationComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtOptions1: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtTrigger1: Subject<any> = new Subject<any>();
  applicantlist: any;
  allocationForm!: FormGroup;
  minDate: Date;
  fromDate: any;
  todata: any;
  maxDate: Date;
  disabled = false;
  days: any;
  arraydata: any;
  arraydatasec: any;
  allocated_array: any = [];
  dropdownSettings: IDropdownSettings = {};
  secselectedItems: Array<any> = [];
  assessorArray: any = [];
  spreaded: any;
  submitValid: Boolean = false;
  ddState: Boolean = false;
  html = '<span><i>Tooltip</i> <u>with</u> <b>HTML</b></span>';
  col: any;
  search: any;
  allAssessor: number = 0;
  selectedAssessor: number = 0;
  section: any;
  applicantdata: any;
  ddStateError: any;
  appStatus: any=false;
  constructor(
    public allocation: AllocationService,
    private applicantS: ApplicantService,
    public fb: FormBuilder,
    private quest: QuestionService,
    private assessorsS: AssessorsService,
    private toast: TosterService
  ) {
    this.minDate = new Date();
    this.maxDate = new Date();
  }
  isChecked = false;
  checkuncheckall(e: any, it: any) {
    console.log(e.target.value, e.target.checked, it);
    if (e.target.checked) {
      it.teamleader = false;
      it.calibrator = false;
      this.allocated_array.push(it);
      this.selectedAssessor = this.allocated_array.length;
    } else {
      var index = this.allocated_array.findIndex(function (o: any) {
        return o._id === e.target.value;
      });
      if (index !== -1) this.allocated_array.splice(index, 1);
      this.selectedAssessor = this.allocated_array.length;
    }
  }
  getClickRadio(e: any, it: any, field: any) {
    console.log(e.target.checked, it, field);
    this.allocated_array.map((itemm: any) => {
      if (itemm._id == it) {
        itemm[field] = true;
      } else {
        itemm[field] = false;
      }
    });
    console.log(this.allocated_array);
  }

  ngOnInit(): void {
    this.arraydata = [];
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      ordering: false,
      searching: true,
      processing: true,
    };
    this.dtOptions1 = {
      pagingType: 'full_numbers',
      pageLength: 10,
      ordering: false,
      searching: true,
      processing: true,
    };
    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'firstName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
    };
    this.assessorsS.getAssessors().subscribe((data: any) => {
      this.arraydata = data.applicanData;
      this.dtTrigger.next();
      this.dtTrigger1.next();
    });

    this.allocation.getviewApplicantLOISubmitted().subscribe((item: any) => {
      console.log(item.ass);
      this.applicantlist = item.ass;
      this.applicantlist = this.applicantlist.sort((a: any, b: any) =>
        a.organizationName > b.organizationName ? 1 : -1
      );
      this.initForm();
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    this.dtTrigger1.unsubscribe();
  }

  initForm() {
    this.allocationForm = this.fb.group({
      applicant_id: ['', [Validators.required]],
      period_from: [''],
      period_to: [''],
      remark: '',
      assessment_list: [''],
    });
  }

  public get f() {
    return this.allocationForm.controls;
  }

  getApplicantId(e: any) {
    // this.arraydata = [];
    this.allocation.checkallocation(e.target.value).subscribe((iiteem: any) => {
      console.log(iiteem.result.length);
      if (iiteem.result.length == 0) {
        this.ddState = true;
        this.ddStateError = true;
      }
      else {
        this.ddState = false;
        this.ddStateError = false;
      }
    });
    this.applicantS
      .GetAdminApplicantSingle(e.target.value)
      .subscribe((pitem: any) => {
        console.log(pitem.applicanData[0]);
        this.appStatus=true;
        this.applicantdata = pitem.applicanData[0];
        this.allocation
          .viewAssessorAsPerSector({
            sector: pitem.applicanData[0].sector,
            applicant_name: pitem.applicanData[0].firstName,
          })
          .subscribe((iittem: any) => {
            console.log(iittem);
            if (iittem.ass.length == 0) {
              alert('No Assessor found in this Sector');
            } else {
              this.quest
                .viewQuestionSec({ criteria: pitem.applicanData[0].criteria })
                .subscribe((item: any) => {
                  console.log(item);
                  this.section = item.sec;

                  //  this.arraydata = iittem.ass;
                  this.allocated_array = [];
                  // this.allAssessor = iittem.ass.length;
                });
            }
          });
      });
  }

  submitAllocation() {
    if (this.allocationForm.invalid) {
      console.log(this.allocationForm);
      this.submitValid = true;
      this.toast.showError('Sorry, Something went wrong');
    } else {
      this.submitValid = false;

      if (this.allocated_array.length == 4) {
        let notl = 0;
        let noca = 0;
        this.allocated_array.map((ch: any) => {
          if (ch.teamleader == true) {
            notl++;
          }
          if (ch.calibrator == true) {
            noca++;
          }
        });
        if (notl == 1 && noca == 1) {
          this.allocated_array.map((item: any) => {
            item.section = this.section;
          });
          this.allocationForm.value.assessment_list = this.allocated_array;
          this.allocation
            .saveAllocation(this.allocationForm.value)
            .subscribe((item: any) => {
              console.log(item);
              if (item.statusCode == 200) {
                this.toast.showSuccess(
                  'Congratulation!, Assessors has been Added.'
                );
                setTimeout(() => {
                  window.location.href = '/list-allocation';
                }, 2000);
              } else {
                this.toast.showError('Sorry, Something went wrong');
              }
            });
        } else {
          alert('Please check a Team leader & Calibrator');
        }
      } else {
        alert(
          'Oops! Assessment Team should comprise of 4 Members. Please add Assessors.'
        );
      }
    }
  }

  getChecked(ev: any, i: any) {}

  onItemSelectDropDown(item: any) {
    console.log(item);
  }

  setData(e: any, field: any) {
    this.col = field == 'select' ? e.target.value : '';
    this.search = field == 'input' ? e.target.value : '';
  }

  async getData() {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance
        .column(this.col)
        .search('^' + this.search + '$', true, false, true)
        .draw();
    });
  }
}
