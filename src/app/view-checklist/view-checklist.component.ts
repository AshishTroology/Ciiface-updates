import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(
    private router: Router,
    private quest: QuestionService,
    private applicant: ApplicantService,
    private _Activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
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
            });
        } else {
        }
      });
  }

  getQuestion(sec: any) {
    this.quest
      .viewQuestionByCriteria({
        criteria: this.criteria,
        section_no: sec,
      })
      .subscribe((itemQues: any) => {
        console.log(itemQues);
        this.questions = itemQues.sec;
        this.subsection = this.removeDuplicateObjectFromArray(
          this.questions,
          'sub_section_no'
        );

        this.quest
          .viewAssessment({
            section_no: sec,
            email: this.app_email,
            criteria: this.criteria,
            type: 'applicant',
          })
          .subscribe(async (ele: any) => {
            console.log(ele);
          });
      });
  }

  removeDuplicateObjectFromArray(array: any, key: any) {
    return array.filter(
      (obj: any, index: any, self: any) =>
        index === self.findIndex((el: any) => el[key] === obj[key])
    );
  }
}
