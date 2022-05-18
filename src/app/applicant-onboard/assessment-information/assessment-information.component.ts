import { Component, OnInit } from '@angular/core';
import { ApplicantService } from 'src/app/services/applicant.service';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assessment-information',
  templateUrl: './assessment-information.component.html',
  styleUrls: ['./assessment-information.component.css'],
})
export class AssessmentInformationComponent implements OnInit {
  chkAss: boolean = false;
  udata: any;
  inst: any=false;
  criteriaVal: any;
  instructionError: any='';
  hidee: boolean=false;
  constructor(
    private quest: QuestionService,
    private applicat: ApplicantService
  ) {}
  instruction: any;
  ngOnInit(): void {
    this.udata = localStorage.getItem('userdata');
    this.udata = JSON.parse(this.udata);
    let email = this.udata.email;
    this.applicat
      .GetAdminApplicantSinglebyemail(email)
      .subscribe((data: any) => {
        this.criteriaVal = data.applicanData.criteria;
        if (
          data.applicanData.criteria != '' &&
          data.applicanData.userStatus === true
        ) {
          this.quest
            .viewInstructionByCriteria({ criteria: data.applicanData.criteria })
            .subscribe((item: any) => {
              if(item.Inst.length===0){
                 Swal.fire({
                   title: 'Warning',
                   text: 'Thank you for your LoI submission. The checklist questionnaire for the applied criteria is being updated at the system and we shall intimate you once it is ready for filling.',
                   icon: 'warning',
                   showCancelButton: false,
                   confirmButtonColor: '#3085d6',
                   cancelButtonColor: '#d33',
                   confirmButtonText: 'OK',
                 }).then((result) => {
                   if (result.isConfirmed) {
                     window.location.href = '/applicant';
                   }
                 });

              }
              else{
                this.instruction = item.Inst[0].description;
                console.log(this.instruction);
              }
              let dataN = {
                criteria: this.criteriaVal,
                instruction: true,
                type: this.udata.role,
                email: this.udata.email,
              };
              this.quest.viewUserInstruction(dataN).subscribe((iitem:any)=>{
                if(iitem.ass.length==0){
                  this.hidee = false;
                  console.log(this.hidee)
                }
                else{
                  this.hidee=true;
                  this.quest
                    .viewQuestionSec({ criteria: this.criteriaVal })
                    .subscribe((itemm: any) => {
                      console.log(itemm.sec[0]);
                      window.location.href = '/section/' + itemm.sec[0]+'/0';
                    });
                }
              });
            });
        } else {
          Swal.fire({
            title: 'Warning',
            text: 'You have not finally submit the LOI',
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = '/applicant';
            }
          });
        }
      });
  }

  checkAssessment() {
    console.log(this.inst)
    if(this.inst){
      this.instructionError = '';
      let data = {
        criteria: this.criteriaVal,
        instruction: this.inst,
        type: this.udata.role,
        email: this.udata.email,
      };
      this.quest.saveUserInstruction(data).subscribe((item:any)=>{
         this.quest
           .viewQuestionSec({ criteria: this.criteriaVal })
           .subscribe((itemm: any) => {
             console.log(itemm);
             window.location.href = '/section/' + itemm.sec[0];
           });
      })
    }
    else{
      this.instructionError =
        'Please read the above instructions and agree to the declaration.';
    }
  }

  checkBoxvalue(e:any){
    this.inst=e.target.checked
  }
}
