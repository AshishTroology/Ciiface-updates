import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Subject } from 'rxjs';
import { AllocationService } from 'src/app/services/allocation.service';
import { ApplicantService } from 'src/app/services/applicant.service';
import { AssessorsService } from 'src/app/services/assessors.service';
import { QuestionService } from 'src/app/services/question.service';
import { TosterService } from 'src/app/services/toster.service';
@Component({
  selector: 'app-edit-allocation',
  templateUrl: './edit-allocation.component.html',
  styleUrls: ['./edit-allocation.component.css'],
})
export class EditAllocationComponent implements OnInit {
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
  appStatus: any = false;
  allocatedid: any;
  allocatarr: any;
  constructor(
    public allocation: AllocationService,
    private applicantS: ApplicantService,
    public fb: FormBuilder,
    private quest: QuestionService,
    private assessorsS: AssessorsService,
    private toast: TosterService,
    private _Activatedroute: ActivatedRoute
  ) {
    this.minDate = new Date();
    this.maxDate = new Date();
  }

  ngOnInit(): void {
    this.allocatedid = this._Activatedroute.snapshot.paramMap.get('id');
    this.allocation
      .editAllocation(this.allocatedid)
      .subscribe((iiteem: any) => {
        console.log(iiteem);
        this.applicantdata = iiteem[0].applicantdata[0];
        this.allocated_array = iiteem[0].assessordata;
        this.allocatarr = iiteem[0].all;
        this.allocated_array.map((items: any) => {
          this.allocatarr.map((itemArr: any) => {
            if (items._id == itemArr.assessor_id) {
              items['teamleader'] = itemArr.teamleader;
              items['calibrator'] = itemArr.calibrator;
              items['allocationliststatus'] = itemArr.allocationliststatus;
              items['section'] = itemArr.section;
            }
          });
        });
        this.selectedAssessor = this.allocated_array.length;
        console.log(this.allocated_array);
      });
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
      applicant_id: [''],
      period_from: [''],
      period_to: [''],
      remark: '',
      assessment_list: [''],
    });
  }

  public get f() {
    return this.allocationForm.controls;
  }

  isChecked = false;
  checkuncheckall(e: any, it: any) {
    console.log(e.target.value, e.target.checked, it);
    if (e.target.checked) {
      it.teamleader = false;
      it.calibrator = false;
      it.allocationliststatus = 'pending';
      it.section = [];
      it.newapp = '2';
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

  checkAvailablity(id: any) {
    return this.allocated_array.find((x: any) => x._id === id);
  }
  removeItem(ass_id: any) {
    var index = this.allocated_array.findIndex(function (o: any) {
      return o._id === ass_id;
    });
    if (index !== -1) this.allocated_array.splice(index, 1);
    this.selectedAssessor = this.allocated_array.length;
  }

  getChangeSelect(e: any, it: any, field: any) {
    this.allocated_array.map((itemm: any) => {
      if (itemm._id == it) {
        itemm[field] = e.target.value;
      }
    });
  }

  submitAllocation() {
    let notl = 0;
    let noca = 0;
    let count = 0;
    this.allocated_array.map((ch: any) => {
      if (ch.allocationliststatus != 'rejected') {
        if (ch.teamleader === true) {
          notl++;
        }
        if (ch.calibrator === true) {
          noca++;
        }
        count++;
      }
    });
    console.log(this.allocated_array, notl, noca, count);
    if (notl == 1 && noca == 1 ) {
      console.log(this.allocated_array);
      this.allocationForm.value.assessment_list = this.allocated_array;
      this.allocationForm.value.allocation_id = this.allocatedid;
      this.allocation
        .updateAllocation(this.allocationForm.value)
        .subscribe((ytem: any) => {
          console.log(ytem);
          this.toast.showSuccess('Updated Allocation');
          window.location.href = '/list-allocation';
        });
    }
    else{
      this.toast.showError(
        'At least 4 Assessor (TL & Calibrator) required for allocation'
      );
    }
  }
}
