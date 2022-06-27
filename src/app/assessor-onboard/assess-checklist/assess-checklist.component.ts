import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApplicantService } from 'src/app/services/applicant.service';
import { QuestionService } from 'src/app/services/question.service';
import { TosterService } from 'src/app/services/toster.service';

@Component({
  selector: 'app-assess-checklist',
  templateUrl: './assess-checklist.component.html',
  styleUrls: ['./assess-checklist.component.css'],
})
export class AssessChecklistComponent implements OnInit {
  applicant_id: any;
  section: any;
  criteria: any;
  app_email: any;
  questions: any;
  subsection: any;
  answer: any;
  Sectionform!: FormGroup;
  public model: any = {};
  modall: any = [];
  public modelscore: any = {};
  modallscore: any = [];
  udata: any;
  section_no: any;
  allocated_id: any;


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
            .getAllocated({
              allocation_id: this.allocated_id,
              assessor_id: this.udata._id,
            })
            .subscribe((elem: any) => {
              console.log(elem);
              this.section = elem[0].section;
              this.spinner.hide();
            });
        } else {
        }
      });
  }

  formInit(model: any) {
    this.Sectionform = this.fb.group(model);
  }
  public get f() {
    return this.Sectionform.controls;
  }

  onSubmit() {
    console.log(this.Sectionform.value, {
      assessment: this.Sectionform.value,
      section_no: this.section_no,
      email: this.udata.email,
      criteria: this.criteria,
      type: this.udata.role,
    });

    if (this.Sectionform.invalid) {
      console.log(this.Sectionform);
    } else {
       console.log(this.modelscore);
      this.quest
        .saveAssessment({
          assessment: this.Sectionform.value,
          section_no: this.section_no,
          email: this.udata.email,
          criteria: this.criteria,
          type: this.udata.role,
        })
        .subscribe((item: any) => {
          console.log(item, this.criteria, this.section_no);
          this.quest.addScore({
            assessment_id:item.assessment._id,
            allocation_id: this.allocated_id,
            applicant_id: this.applicant_id,
            assessor_id: this.udata._id,
            criteria: this.criteria,
            score: this.modelscore,
            scoreBy: this.udata.email,
          }).subscribe((itemRes:any)=>{
            this.toast.showInfo('Section Saved.');
          });
        });


    }
  }

  getQuestion(sec: any) {
    this.spinner.show();
    this.model = {};
    this.modelscore = {};
    this.section_no = sec;
    this.quest
      .viewQuestionByCriteria({
        criteria: this.criteria,
        section_no: sec,
      })
      .subscribe((itemQues: any) => {
        // console.log(itemQues);
        itemQues.sec.map((element: any) => {
          this.model[element._id] = '';
          this.modelscore[element.sub_section_no] = '';
        });

        console.log(this.modelscore);

        this.quest
          .viewAssessment({
            section_no: this.section_no,
            email: this.udata.email,
            criteria: this.criteria,
            type: this.udata.role,
          })
          .subscribe(async (ele: any) => {
            if (ele.ass.length == 1) {
              this.modall = await ele.ass[0].assessment[0];
              this.Sectionform = this.fb.group(this.modall);
              this.quest
                .getScore({
                  assessment_id: ele.ass[0]._id,
                })
                .subscribe((itemScore: any) => {
                  this.modelscore=itemScore[0].score[0];
                });
            } else {
              this.formInit(this.model);
            }

            //  if (this.flag != 0) {
            //    this.onSubmit();
            //  }
          });
        // this.formInit(this.model);
        // console.log(this.model);
        this.quest
          .viewAssessment({
            section_no: sec,
            email: this.app_email,
            criteria: this.criteria,
            type: 'applicant',
          })
          .subscribe(async (ele: any) => {
            if (ele.ass.length) {
              this.answer = ele.ass[0].assessment[0];
              this.questions = itemQues.sec;
              this.questions.map((items: any) => {
                if (this.answer.hasOwnProperty(items._id)) {
                  items.answer = this.answer[items._id];
                }
              });
              this.spinner.hide();
              // console.log(this.questions);
              this.subsection = this.removeDuplicateObjectFromArray(
                this.questions,
                'sub_section_no'
              );
              console.log(this.subsection);
            } else {
              alert('No Data found');
            }
          });
      });
  }

  onChangeControl(id: any, e: any, chk: any) {
    this.Sectionform.controls[id].setValue(chk == null ? e.target.value : e);
  }

  onChangeScore(id: any, e: any, chk: any) {
    this.modelscore[id]=(chk == null ? e.target.value : e);
    //  console.log(this.modelscore);
  }

  removeDuplicateObjectFromArray(array: any, key: any) {
    return array.filter(
      (obj: any, index: any, self: any) =>
        index === self.findIndex((el: any) => el[key] === obj[key])
    );
  }
}
