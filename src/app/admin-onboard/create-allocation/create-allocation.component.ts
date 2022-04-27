import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllocationService } from 'src/app/services/allocation.service';
import { ApplicantService } from 'src/app/services/applicant.service';
import { QuestionService } from 'src/app/services/question.service';
@Component({
  selector: 'app-create-allocation',
  templateUrl: './create-allocation.component.html',
  styleUrls: ['./create-allocation.component.css'],
})
export class CreateAllocationComponent implements OnInit {
  applicantlist: any;
  allocationForm!: FormGroup;
  minDate: Date;
  fromDate: any;
  todata: any;
  maxDate: Date;
  fieldArray: Array<any> = [];
  newAttribute: any = {};
  i = 0;
  arraydata: Array<any> = [];
  arraydatasec: Array<any> = [];
  arrAssStatus: Array<any> = [];
  arrTeamleader: Array<any> = [];
  selectedDevice: any;
  disabled = false;
  selected: any = [];
  selectedAssessment: any = [];
  days: any;
  constructor(
    public allocation: AllocationService,
    private applicantS: ApplicantService,
    public fb: FormBuilder,
    private quest: QuestionService
  ) {
    this.minDate = new Date();
    this.maxDate = new Date();
  }

  ngOnInit(): void {
    this.arraydata = [];

    this.allocation.getviewApplicantLOISubmitted().subscribe((item: any) => {
      console.log(item.ass);
      this.applicantlist = item.ass;
      this.initForm();
    });
  }

  initForm() {
    this.allocationForm = this.fb.group({
      applicant_id: ['', [Validators.required]],
      period_from: ['', [Validators.required]],
      period_to: ['', [Validators.required]],
      remark: '',
      assessment_list: [],
    });
  }

  getToDate(e: any) {
    this.maxDate = e.target.value;
    this.fromDate = e.target.value;
    this.todata = e.target.value;
    this.dateDiff(this.todata, 'from');
  }

  dateDiff(e: any, t: any) {
    var date1 = new Date(this.fromDate);
    var date2 = new Date(t == 'from' ? e : e.target.value);

    var Time = date2.getTime() - date1.getTime();
    var Days = Time / (1000 * 3600 * 24);
    console.log(Days + 1);
    this.days = Days + 1;
    this.selectedAssessment.push({
      assessor_id: '',
      section: [],
      assessment_status: 'pending',
      assessedby: '',
      teamleader: false,
    });
  }

  getApplicantId(e: any) {
    this.arrTeamleader.push(false);
    this.arrAssStatus.push('Pending');
    this.applicantS
      .GetAdminApplicantSingle(e.target.value)
      .subscribe((pitem: any) => {
        console.log(pitem.applicanData[0].sector);
        this.allocation
          .viewAssessorAsPerSector({
            sector: pitem.applicanData[0].sector,
          })
          .subscribe((iittem: any) => {
            console.log(iittem);
            if (iittem.ass.length == 0) {
              this.arraydata = [];
              this.fieldArray = [];
              alert('No Assessor found in this Sector');
            } else {
              this.arraydata.push(iittem.ass);
            }
          });
        this.quest
          .viewQuestionSec({ criteria: pitem.applicanData[0].criteria })
          .subscribe((item: any) => {
            //  console.log(item);
            this.arraydatasec.push(item.sec);
          });
      });
  }

  onChange(deviceValue: any, i: any,field:any) {
    this.selectedDevice = deviceValue.target.value;
    let s = 'assessor' + i;
    this.selectedAssessment[i][field] = deviceValue.target.value;
  }

  getValue(e:any){
    console.log(e.target.value);

  }

  addFieldValue() {
    if (this.fieldArray.length < 3) {
      const arr = [...this.arraydata];
      const arrsec = [...this.arraydatasec];
      this.arraydata.push(arr[this.i]);
      this.arraydatasec.push(arrsec[this.i]);
      this.arrAssStatus.push('pending');
      this.arrTeamleader.push(false);
      this.fieldArray.push(this.newAttribute);
      console.log(this.newAttribute);

      this.newAttribute = {};
      this.selectedAssessment.push({
        assessor_id: '',
        section: [],
        assessment_status: 'pending',
        assessedby: '',
        teamleader: false,
      });
      this.i += 1;
    } else {
      alert('Oops! You can select only 4 Assessors for an Assessment.');
    }
  }

  deleteFieldValue(index: any) {
    this.fieldArray.splice(index, 1);
  }

  submitAllocation() {
    this.allocationForm.value.assessment_list = this.selectedAssessment;
    console.log(this.allocationForm.value);
  }
}
