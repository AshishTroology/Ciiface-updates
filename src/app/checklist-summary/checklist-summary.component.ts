import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApplicantService } from '../services/applicant.service';
import { QuestionService } from '../services/question.service';
import { TosterService } from '../services/toster.service';

@Component({
  selector: 'app-checklist-summary',
  templateUrl: './checklist-summary.component.html',
  styleUrls: ['./checklist-summary.component.css'],
})
export class ChecklistSummaryComponent implements OnInit {
  applicant_id: any;
  section: any;
  criteria: any;
  app_email: any;
  questions: any;
  subsection: any;
  answer: any;
  public model: any = {};
  modall: any = [];
  public modelscore: any = {};
  modallscore: any = [];
  udata: any;
  section_no: any;
  allocated_id: any;
  assessor_data: any;
  subSections: any;
  assessment_data: any;
  all_scores: any = [];
  scoreOne: any;
  SubSecmodel: any = {};
  tl: any;
  constructor(
    private router: Router,
    private quest: QuestionService,
    private applicant: ApplicantService,
    private _Activatedroute: ActivatedRoute,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toast: TosterService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.udata = localStorage.getItem('userdata');
    this.udata = JSON.parse(this.udata);
    let email = this.udata.email;
    this.applicant_id = this._Activatedroute.snapshot.paramMap.get('id');
    this.allocated_id = this._Activatedroute.snapshot.paramMap.get('_id');
    this.tl = this._Activatedroute.snapshot.paramMap.get('tl');
    console.log(this.tl);
    this.applicant
      .GetAdminApplicantSingle(this.applicant_id)
      .subscribe((data: any) => {
        if (
          data.applicanData[0].criteria != '' &&
          data.applicanData[0].userStatus === true
        ) {
          console.log(data);
          this.criteria = data.applicanData[0].criteria;
          this.app_email = data.applicanData[0].email;
          this.quest
            .sectionGroupbyCriteria({
              criteria: this.criteria,
            })
            .subscribe((elem: any) => {
              console.log(elem);
              this.section = elem;
              this.spinner.hide();
            });
        } else {
        }
      });
  }

  getQuestion(sec: any) {
    this.quest
      .questionGroupbyCriteria({ section_no: sec, criteria: this.criteria })
      .subscribe((ques_data: any) => {
        console.log(ques_data);
        this.questions = ques_data;
        this.quest
          .getAllocationAssessor({
            allocation_id: this.allocated_id,
          })
          .subscribe((itemx: any) => {
            console.log(itemx);
            this.assessor_data = itemx;
            this.quest
              .getAssessment({
                criteria: this.criteria,
                section_no: sec,
              })
              .subscribe((itemassm: any) => {
                console.log(itemassm);
                this.assessment_data = itemassm;
              });
          });
      });
  }

  getScoreBySubSection(id: any, email: any) {
    this.scoreOne = this.assessment_data.find((a: any) => a.email == email);
    if (this.scoreOne === undefined) return 'N/A';
    else return this.scoreOne.assessment[0][id];
  }
}
