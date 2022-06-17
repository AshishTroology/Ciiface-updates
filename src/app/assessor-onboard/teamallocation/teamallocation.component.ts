import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { AllocationService } from 'src/app/services/allocation.service';
import { ApplicantService } from 'src/app/services/applicant.service';
import { QuestionService } from 'src/app/services/question.service';
import { TosterService } from 'src/app/services/toster.service';

@Component({
  selector: 'app-teamallocation',
  templateUrl: './teamallocation.component.html',
  styleUrls: ['./teamallocation.component.css'],
})
export class TeamallocationComponent implements OnInit {
  udata: any;
  allocationId: any;
  allocatedlist: any;
  criteria: any;
  app_email: any;
  section: any;
  selectedItems: any = [];
  dropdownSettings = {};
  min: any;
  to: any;
  sectionForm: any = [];
  max: any;
  setting: any = [];
  teamAllocation!: FormGroup;
  constructor(
    public allocation: AllocationService,
    private _Activatedroute: ActivatedRoute,
    private quest: QuestionService,
    private applicant: ApplicantService,
    private fb: FormBuilder,
    private toast: TosterService,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.udata = localStorage.getItem('userdata');
    this.udata = JSON.parse(this.udata);
    this.allocationId = this._Activatedroute.snapshot.paramMap.get('id');
    this.selectedItems = [];

    this.allocation
      .getAllAllocationByAssessorOne(this.allocationId)
      .subscribe((item: any) => {
        this.allocatedlist = item.result;
        console.log(item.result);

        item.result.map((kk: any) => {
          this.setting.push({
            singleSelection: false,
            text: 'Select Countries',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: true,
            showCheckbox: true,
          });
        });
        this.applicant
          .GetAdminApplicantSingle(item.result[0].applicantData[0]._id)
          .subscribe((data: any) => {
            if (
              data.applicanData[0].criteria != '' &&
              data.applicanData[0].userStatus === true
            ) {
              console.log(data);
              this.criteria = data.applicanData[0].criteria;
              this.app_email = data.applicanData[0].email;
              this.quest
                .viewQuestionSec({ criteria: data.applicanData[0].criteria })
                .subscribe((item: any) => {
                  console.log(item);
                  this.section = item.sec;
                  this.formInit(this.allocatedlist[0]);
                  this.min = this.allocatedlist[0].period_from;
                  this.to = this.allocatedlist[0].period_from;
                  this.getDate(this.allocatedlist[0].period_from, 'load');
                  this.getDateto(this.allocatedlist[0].period_to, 'load');
                  console.log(this.teamAllocation);
                });
            } else {
            }
          });
      });
  }

  formInit(fdata: any) {
    this.teamAllocation = this.fb.group({
      period_from: [fdata.period_from, Validators.required],
      period_to: [fdata.period_from, Validators.required],
    });
  }

  getDate(d: any, by: any) {
    if (by == 'load') {
      this.min = d;
    } else {
      this.min = d.target.value;
      this.to = '';
    }
  }
  getDateto(d: any, by: any) {
    if (by == 'load') {
      this.to = d;
    } else {
      this.to = d.target.value;
    }
  }

  updateAllocation() {
    this.teamAllocation.value.period_from = this.min;
    this.teamAllocation.value.period_to = this.to;
    console.log(this.teamAllocation.value);
    this.allocation
      .updatePeriodInAllocation(
        this.allocatedlist[0].allocation_id,
        this.teamAllocation.value
      )
      .subscribe((results: any) => {
        console.log(results);
        this.toast.showSuccessMsg('Allocation Time Period Updated');
      });
  }

  updateSection(e: any, id: any) {
    console.log(e.target.value, id, e.target.checked);
    this.allocation
      .updateSectionInAllocation(id, {
        section: e.target.value,
        status: e.target.checked,
      })
      .subscribe((result: any) => {
        console.log(result);
        this.toast.showSuccessMsg('Section Updated');
      });
  }
}
