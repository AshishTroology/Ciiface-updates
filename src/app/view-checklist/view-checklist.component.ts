import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApplicantService } from '../services/applicant.service';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-view-checklist',
  templateUrl: './view-checklist.component.html',
  styleUrls: ['./view-checklist.component.css'],
})
export class ViewChecklistComponent implements OnInit {
  applicant_id: any;
  section: any;
  criteria: any;
  app_email: any;
  questions: any;
  subsection: any;
  answer: any;
  constructor(
    private router: Router,
    private quest: QuestionService,
    private applicant: ApplicantService,
    private _Activatedroute: ActivatedRoute,
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

  getQuestion(sec: any) {
    this.spinner.show()
    this.quest
      .viewQuestionByCriteria({
        criteria: this.criteria,
        section_no: sec,
      })
      .subscribe((itemQues: any) => {
        console.log(itemQues);
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
              console.log(this.questions);
              this.subsection = this.removeDuplicateObjectFromArray(
                this.questions,
                'sub_section_no'
              );
              this.spinner.hide()
            } else {
              alert('No Data found');
            }
          });
      });
  }

  removeDuplicateObjectFromArray(array: any, key: any) {
    return array.filter(
      (obj: any, index: any, self: any) =>
        index === self.findIndex((el: any) => el[key] === obj[key])
    );
  }

  checkAndGetAnswer(id: any) {
    let milliseconds = 1000;
    console.log(`Waiting: ${milliseconds / 1000} seconds.`);
    return new Promise((resolve) => {
      setTimeout(() => {
        if (this.answer.hasOwnProperty(id)) {
          resolve(this.answer[id]);
          console.log(this.answer[id]);
        }
      }, milliseconds);
    });
  }
}
