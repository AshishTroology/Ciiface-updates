import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApplicantService } from 'src/app/services/applicant.service';
import { QuestionService } from 'src/app/services/question.service';
import { TosterService } from 'src/app/services/toster.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
})
export class PreviewComponent implements OnInit {
  section_no: any = '';
  udata: any;
  questions: any;
  subsection: any;
  criteria: any;
  public model: any = {};
  modall: any = [];
  Sectionform!: FormGroup;
  secArr: any = [];
  btnDisabled: any = false;
  finalStatus: any;
  constructor(
    private toast: TosterService,
    private _Activatedroute: ActivatedRoute,
    private quest: QuestionService,
    private applicat: ApplicantService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.udata = localStorage.getItem('userdata');
    this.udata = JSON.parse(this.udata);
    let email = this.udata.email;
    this.applicat
      .GetAdminApplicantSinglebyemail(email)
      .subscribe((data: any) => {
        if (data.applicanData.criteria != '') {
          this.criteria = data.applicanData.criteria;
           this.quest
             .viewFinally({
               email: this.udata.email,
               criteria: this.criteria,
               type: this.udata.role,
             })
             .subscribe(async (elem: any) => {
               this.finalStatus = elem.ass.length == 0 ? true : false;
             });
          this.quest
            .viewQuestionSec({ criteria: this.criteria })
            .subscribe(async (item: any) => {
              this.section_no = item.sec;
              console.log(this.section_no);
              this.section_no.map(async (sec: any) => {
                let no_of_field = 0;
                let no_of_field_empty = 0;
                this.quest
                  .viewAssessment({
                    section_no: sec,
                    email: this.udata.email,
                    criteria: this.criteria,
                    type: this.udata.role,
                  })
                  .subscribe((ele: any) => {
                    let arr = ele.ass[0].assessment[0];
                    for (var key in arr) {
                      if (arr[key] == '') {
                        ++no_of_field_empty;
                      }
                    }
                    ++no_of_field;
                    let val = {
                      count: no_of_field,
                      emptycount: no_of_field_empty,
                      section_no: sec,
                    };
                    this.secArr.push(val);
                  });
              });
             setTimeout(()=>{this.btncheck()},2000) ;
            });
        }
      });
  }

  onsubmit(){
    this.btncheck();
    this.quest.saveFinally({
      email: this.udata.email,
      criteria: this.criteria,
      type: this.udata.role,
    }).subscribe((ittem:any)=>{
      if(ittem.statuscode=='200'){
         this.finalStatus=false;
        this.toast.showInfo('Finally Saved.');
      }
      else{
        this.toast.showError('Already Submitted.');
      }
    });
  }

  btncheck(){
    console.log('check', this.secArr);
    let no = 0;
    this.secArr.map((item: any) => {
      no += parseInt(item.emptycount);
    });
    console.log('check', no, this.secArr);

    if (no == 0 && this.secArr.length==this.section_no.length) {
      this.btnDisabled = true;
    } else {
      this.btnDisabled = false;
    }
    console.log(this.btnDisabled);

  }
}

