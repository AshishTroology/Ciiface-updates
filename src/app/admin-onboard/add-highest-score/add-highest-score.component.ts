import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApplicantService } from 'src/app/services/applicant.service';
import { QuestionService } from 'src/app/services/question.service';
import { TosterService } from 'src/app/services/toster.service';

@Component({
  selector: 'app-add-highest-score',
  templateUrl: './add-highest-score.component.html',
  styleUrls: ['./add-highest-score.component.css'],
})
export class AddHighestScoreComponent implements OnInit {
  section: any;
  criteria: any;
  sec: any;
  subSections: any;
  highestScrmodel: any = {};
  constructor(
    private router: Router,
    private quest: QuestionService,
    private applicant: ApplicantService,
    private _Activatedroute: ActivatedRoute,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toast: TosterService
  ) {}

  ngOnInit(): void {}

  getSections(cri: any) {
    this.criteria = cri.target.value;
    this.quest
      .sectionGroupbyCriteria({
        criteria: this.criteria,
      })
      .subscribe((elem: any) => {
        console.log(elem);
        this.section = elem;
      });
  }

  getSubSections(sec: any) {
    this.highestScrmodel={};
    this.sec = sec.target.value;
    this.quest
      .getSubSection({
        criteria: this.criteria,
        section_no: this.sec,
      })
      .subscribe((itemQ: any) => {
        console.log(itemQ);
        this.subSections = itemQ;
        this.subSections.map((ssItem: any) => {
          this.highestScrmodel[ssItem._id.sub_section_no] = '';
        });
      });
  }

  getModelScore(e: any, subSectionNo: any) {
    this.highestScrmodel[subSectionNo] = e.target.value;
    console.log(this.highestScrmodel);
  }

  saveHighestScore(){
    this.quest.saveHighScore({criteria:this.criteria,section_no:this.sec,score:this.highestScrmodel}).subscribe((resd:any)=>{
      window.location.reload()
    });
  }
}
