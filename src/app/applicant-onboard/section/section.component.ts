import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApplicantService } from 'src/app/services/applicant.service';
import { QuestionService } from 'src/app/services/question.service';
import { TosterService } from 'src/app/services/toster.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css'],
})
export class SectionComponent implements OnInit {
  section_no: any = '';
  udata: any;
  questions: any;
  subsection: any;
  criteria: any;
  public model: any = {};
  modall: any = [];
  Sectionform!: FormGroup;
  flag: any;
  finalStatus:boolean=true;
  constructor(
    private toast: TosterService,
    private _Activatedroute: ActivatedRoute,
    private quest: QuestionService,
    private applicat: ApplicantService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.section_no = this._Activatedroute.snapshot.paramMap.get('section_no');
    this.flag = this._Activatedroute.snapshot.paramMap.get('flag');
    console.log(this.flag);
    if (this.section_no == '' || this.section_no == null) {
      window.location.href = '/dashboard';
    }

    this.udata = localStorage.getItem('userdata');
    this.udata = JSON.parse(this.udata);
    let email = this.udata.email;
    this.applicat
      .GetAdminApplicantSinglebyemail(email)
      .subscribe((data: any) => {
        if (data.applicanData.criteria != '') {
          this.criteria = data.applicanData.criteria;
          this.quest
            .viewQuestionByCriteria({
              criteria: data.applicanData.criteria,
              section_no: this.section_no,
            })
            .subscribe((item: any) => {
              console.log(item);
              this.questions = item.sec;
              this.subsection = this.removeDuplicateObjectFromArray(
                this.questions,
                'sub_section_no'
              );
              item.sec.map((element: any) => {
                this.model[element._id] = '';
              });
              this.quest.viewFinally({
                  email: this.udata.email,
                  criteria: this.criteria,
                  type: this.udata.role,
                })
                .subscribe(async (elem: any) => {
                  this.finalStatus=(elem.ass.length==0?true:false)
                })

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

                  } else {
                    this.formInit(this.model);
                  }
                  if (this.flag != 0) {
                    this.onSubmit();
                  }
                });
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

  removeDuplicateObjectFromArray(array: any, key: any) {
    return array.filter(
      (obj: any, index: any, self: any) =>
        index === self.findIndex((el: any) => el[key] === obj[key])
    );
  }

  onChangeControl(id: any, e: any, chk: any) {
    this.Sectionform.controls[id].setValue(chk == null ? e.target.value : e);
    // if (this.flag != 0) {
    // }
    // else{
    //   this.Sectionform.value[id] = chk == null ? e.target.value : e;
    // }
  }

  onSubmit() {
    if (this.flag == 0) {
      console.log(this.Sectionform);
      for (var key in this.modall) {
        this.Sectionform.controls[key].clearValidators();
        this.Sectionform.controls[key].updateValueAndValidity();
      }
      this.quest
        .saveAssessment({
          assessment: this.Sectionform.value,
          section_no: this.section_no,
          email: this.udata.email,
          criteria: this.criteria,
          type: this.udata.role,
        })
        .subscribe((item: any) => {
          console.log(item, this.criteria,this.section_no);
          this.toast.showInfo('Section Saved.');
          this.quest
            .viewQuestionSec({ criteria: this.criteria })
            .subscribe((item: any) => {
              let ind = item.sec.indexOf(this.section_no);
              if (item.sec.length == ind + 1) {
                window.location.href = '/preview';
              } else {
                window.location.href = '/section/' + item.sec[ind + 1] + '/0';
              }
            });
        });
    } else {
      for (var key in this.modall) {
        this.Sectionform.controls[key].setValidators([Validators.required]);
        this.Sectionform.controls[key].updateValueAndValidity();
      }
      if(this.Sectionform.invalid){
        console.log(this.Sectionform);
      }
      else{
        this.quest
          .saveAssessment({
            assessment: this.Sectionform.value,
            section_no: this.section_no,
            email: this.udata.email,
            criteria: this.criteria,
            type: this.udata.role,
          })
          .subscribe((item: any) => {
            console.log(item);
            this.toast.showInfo('Section Saved.');
            this.quest
              .viewQuestionSec({ criteria: this.criteria })
              .subscribe((item: any) => {
                let ind = item.sec.indexOf(this.section_no);
                if (item.sec.length == ind + 1) {
                  window.location.href = '/review';
                } else {
                  window.location.href = '/section/' + item.sec[ind + 1] + '/0';
                }
              });
          });
      }
    }



  }
}
