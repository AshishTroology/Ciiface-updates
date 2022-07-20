import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApplicantService } from '../services/applicant.service';
import { QuestionService } from '../services/question.service';
import { TosterService } from '../services/toster.service';

@Component({
  selector: 'app-score-report',
  templateUrl: './score-report.component.html',
  styleUrls: ['./score-report.component.css'],
})
export class ScoreReportComponent implements OnInit {
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
  tl:any;
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
    console.log(this.tl)
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
            console.log(itemvalue);

            if (itemvalue.length == 0) {
              this.subSections.map((ssItem: any) => {
                this.SubSecmodel[ssItem._id.sub_section_no] = '';
              });
            } else {
              this.SubSecmodel = itemvalue[0].Conscore[0];
            }
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
                    this.all_scores = [];
                    this.assessment_data.map((item_scr: any) => {
                      this.quest
                        .getAssessmentScore({
                          allocation_id: this.allocated_id,
                          applicant_id: this.applicant_id,
                          assessment_id: item_scr._id,
                        })
                        .subscribe((all_items: any) => {
                          this.all_scores.push(all_items);
                        });
                    });
                    console.log(this.all_scores);
                    this.spinner.hide();
                  });
              });
          });
      });
  }

  getScoreBySubSection(subSectionNo: any, email: any) {
    this.scoreOne = this.all_scores.find((a: any) => a[0].scoreBy == email);
    if (this.scoreOne===undefined)
      return 'N/A';
    else
      return this.scoreOne[0].score[0][subSectionNo];
  }

  getModelScore(e: any, subSectionNo: any) {
    this.SubSecmodel[subSectionNo] = e.target.value;
    console.log(this.SubSecmodel);
  }

  saveConsensusScore(){
    this.spinner.show();
    this.quest.addConsensusScore({
      allocation_id: this.allocated_id,
      criteria: this.criteria,
      section_no: this.section_no,
      Conscore: this.SubSecmodel,
      ConscoreBy: this.udata.email
    }).subscribe((resu:any)=>{
      console.log(resu);
      this.spinner.hide();
    });
  }
}
