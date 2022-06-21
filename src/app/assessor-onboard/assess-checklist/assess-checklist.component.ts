import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApplicantService } from 'src/app/services/applicant.service';
import { QuestionService } from 'src/app/services/question.service';

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
  constructor(
    private router: Router,
    private quest: QuestionService,
    private applicant: ApplicantService,
    private _Activatedroute: ActivatedRoute,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.applicant_id = this._Activatedroute.snapshot.paramMap.get('id');
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
            .viewQuestionSec({ criteria: data.applicanData[0].criteria })
            .subscribe((item: any) => {
              console.log(item);
              this.section = item.sec;
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
    console.log(this.Sectionform);
  }

  getQuestion(sec: any) {
     this.spinner.show();
    this.model.length = 0;
    this.quest
      .viewQuestionByCriteria({
        criteria: this.criteria,
        section_no: sec,
      })
      .subscribe((itemQues: any) => {
        // console.log(itemQues);
        itemQues.sec.map((element: any) => {
          this.model[element._id] = '';
        });
        console.log(this.model);
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
            } else {
              alert('No Data found');
            }
          });
      });
  }

  onChangeControl(id: any, e: any, chk: any) {
    this.Sectionform.controls[id].setValue(chk == null ? e.target.value : e);
  }

  removeDuplicateObjectFromArray(array: any, key: any) {
    return array.filter(
      (obj: any, index: any, self: any) =>
        index === self.findIndex((el: any) => el[key] === obj[key])
    );
  }
}
