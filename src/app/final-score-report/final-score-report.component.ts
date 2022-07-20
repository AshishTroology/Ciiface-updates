import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApplicantService } from '../services/applicant.service';
import { QuestionService } from '../services/question.service';
import { TosterService } from '../services/toster.service';
@Component({
  selector: 'app-final-score-report',
  templateUrl: './final-score-report.component.html',
  styleUrls: ['./final-score-report.component.css'],
})
export class FinalScoreReportComponent implements OnInit {
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
  HighScrmodel: any = {};
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
    this.spinner.show();
    this.section_no = sec;
    this.quest
      .getSubSection({
        criteria: this.criteria,
        section_no: sec,
      })
      .subscribe((itemQ: any) => {
        console.log(itemQ);
        this.subSections = itemQ;
        this.quest
          .getConsensusScore({
            allocation_id: this.allocated_id,
            criteria: this.criteria,
            section_no: this.section_no,
          })
          .subscribe((itemvalue: any) => {
            if (itemvalue.length == 0) {
              this.subSections.map((ssItem: any) => {
                this.SubSecmodel[ssItem._id.sub_section_no] = '';
              });
            } else {
              this.SubSecmodel = itemvalue[0].Conscore[0];
            }
            console.log(this.SubSecmodel);
            this.spinner.hide();
          });
      });
  }
}
