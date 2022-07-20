import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllocationService } from 'src/app/services/allocation.service';
import { ApplicantService } from 'src/app/services/applicant.service';
import { QuestionService } from 'src/app/services/question.service';
import { TosterService } from 'src/app/services/toster.service';

@Component({
  selector: 'app-executive-summary',
  templateUrl: './executive-summary.component.html',
  styleUrls: ['./executive-summary.component.css'],
})
export class ExecutiveSummaryComponent implements OnInit {
  executiveForm!: FormGroup;
  allocationId: any;
  udata: any;
  record: any;
  arr: any = [];
  isValidFormSubmitted: boolean = false;
  isValidFormSubmitted1: boolean = false;
  summary: any;
  constructor(
    public allocation: AllocationService,
    private _Activatedroute: ActivatedRoute,
    private applicant: ApplicantService,
    private fb: FormBuilder,
    private toast: TosterService,
    public datepipe: DatePipe,
    private quest: QuestionService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    this.spinner.show();
    this.udata = localStorage.getItem('userdata');
    this.udata = JSON.parse(this.udata);
    this.allocationId = this._Activatedroute.snapshot.paramMap.get('id');
    this.allocation
      .getExecutiveSummary(this.allocationId)
      .subscribe((execItem: any) => {
        console.log(execItem);
        if (execItem.length != 0) {
          this.isValidFormSubmitted = false;
          this.isValidFormSubmitted1 = true;
          this.summary=execItem[0];
          this.allocation
            .getAllAllocationByAssessorOne(this.allocationId)
            .subscribe((item: any) => {
              console.log(item.result);
              this.record = item.result;
              this.record.map((om: any) => {
                if (om.allocationliststatus != 'rejected') {
                  this.arr.push(om);
                }
              });
              this.spinner.hide();
            });
        } else {
          this.isValidFormSubmitted = true;
          this.isValidFormSubmitted1 = false;
          this.allocation
            .getAllAllocationByAssessorOne(this.allocationId)
            .subscribe((item: any) => {
              console.log(item.result);
              this.record = item.result;
              this.record.map((om: any) => {
                if (om.allocationliststatus != 'rejected') {
                  this.arr.push(om);
                }
              });
              this.form_init();
              this.spinner.hide();
            });
        }
      });
  }

  form_init() {
    this.executiveForm = this.fb.group({
      scope_of_application: '',
      product: '',
      processes: '',
      unit_licensed: 'yes',
      ofis: '',
      scr1: '',
      scr2: '',
      scr3: '',
      scr4: '',
      scr5: '',
      scr6: '',
      scr7: '',
      scr8: '',
      scr9: '',
      scr10: '',
      conclusion: '',
      recommendation: '',
      allocation_id: '',
      key_strength:'',
    });
  }

  saveExecutiveForm() {
    // if (this.executiveForm.invalid) {
    //   this.isValidFormSubmitted = true;
    // } else {
    this.isValidFormSubmitted = false;
    this.executiveForm.value.allocation_id = this.allocationId;
    this.allocation
      .saveExecutiveSummary(this.executiveForm.value)
      .subscribe((item: any) => {
        this.toast.showInfo(item.message);
        window.location.href = '/assessors-assess-information';
      });
    // }
  }
}
