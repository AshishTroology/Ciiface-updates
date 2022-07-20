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
  highScore: any = 0;
  conScore: any = 0;
  conper: any = 0;
  value: any;
  count:any=0;
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
    this.highScore= 0;
    this.conScore= 0;
    this.conper= 0;
    this.count=0;
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
            for (var el in this.SubSecmodel) {
              if (this.SubSecmodel.hasOwnProperty(el)) {
                this.conper += parseFloat(this.SubSecmodel[el]);
              }
            }
            this.quest
              .getHighScore({
                criteria: this.criteria,
                section_no: this.section_no,
              })
              .subscribe((hitem: any) => {
                console.log(hitem);
                this.HighScrmodel = hitem[0].score[0];
                for (var el in this.HighScrmodel) {
                  if (this.HighScrmodel.hasOwnProperty(el)) {
                    this.highScore += parseFloat(this.HighScrmodel[el]);
                    this.count +=((parseFloat(this.SubSecmodel[el]=='NA'?0:(this.SubSecmodel[el]==''?0:this.SubSecmodel[el])) / 100) * parseFloat(this.HighScrmodel[el]));
                  }
                }
                console.log(this.count,"=====================")
              });
            this.spinner.hide();
          });
      });
  }

  getHighest(scr: any, hscr: any) {
    this.value = (scr / 100) * hscr;
    return this.value.toFixed(1);
  }
  setValue(r:any){
    if(r=='NA'||r==''){
      return 0
    }
    else{
      return r
    }
  }


}
