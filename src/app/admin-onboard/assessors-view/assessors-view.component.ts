import { Component, OnDestroy, OnInit } from '@angular/core';
import { AssessorsService } from 'src/app/services/assessors.service';
import { TosterService } from 'src/app/services/toster.service';
import { Form, FormBuilder, FormGroup, NgForm, Validators }   from '@angular/forms';
import { Subject } from 'rxjs';
// import '../rxjs/add/operator/map';


@Component({
  selector: 'app-assessors-view',
  templateUrl: './assessors-view.component.html',
  styleUrls: ['./assessors-view.component.css'],
})
export class AssessorsViewComponent implements OnDestroy, OnInit {
  assessors: any;
  assessorsForm: any;
  isValidFormSubmitted: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  score: number = 0;
  rating: number = 0;
  assessors_id: any;
  updateAssessorScoreForm!: FormGroup;
  rank: number=0;
  constructor(
    private fb: FormBuilder,
    private assessorsS: AssessorsService,
    private toast: TosterService
  ) {}
  term: any;

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      ordering: false,
      searching: true,
      dom: 'lBfrtip',
    };

    this.assessorsS.getAssessors().subscribe((data: any) => {
      this.assessors = data.applicanData;
      this.dtTrigger.next();
    });
    this.onformUpdate();
  }

  public show: boolean = false;
  public buttonName: any = true;
  toggle() {
    this.show = !this.show;
    if (this.show) this.buttonName = false;
    else this.buttonName = true;
  }

  onformUpdate() {
    this.updateAssessorScoreForm = this.fb.group({
      score: this.score,
      rating: this.rating,
      rank: this.rank,
    });
  }

  updateScore() {
    this.updateAssessorScoreForm.value.score = this.score;
    this.updateAssessorScoreForm.value.rating = this.rating;
    this.updateAssessorScoreForm.value.rank = this.rank;
    console.log(this.updateAssessorScoreForm.value);
    this.assessorsS
      .updateScore(this.updateAssessorScoreForm.value, this.assessors_id)
      .subscribe((result: any) => {
        // console.log(result);
        window.location.reload();
      });
  }

  onforminit() {
    this.assessorsForm = this.fb.group({
      zone: [''],
      batch: [''],
      designation: [''],
      presentCo: [''],
      pastCo: [''],
      fsmsCertificate: [''],
      exposure: [''],
      title: [''],
      firstName: [''],
      lastName: [''],
      phone: [''],
      email: [''],
      education: [''],
      year: [''],
      skill: [''],
      domain: [''],
      addressLine1: [''],
      addressLine2: [''],
      zipCode: [''],
      country: [''],
      state: [''],
      city: [''],
    });
  }

  reSendEoi(id: any, email: any) {
    // if (this.assessorsForm.invalid) {
    //   console.log(this.assessorsForm, 'error');
    //   this.isValidFormSubmitted = true;
    // } else {
    console.log(id);
    let url = '/assessorReSendEOI/' + email;
    console.log(email);
    this.assessorsS
      .assessorReSendEOI({ email: email }, id)
      .subscribe((data: any) => {
        console.log('saved');
        let url = '/assessorReSendEOI/' + id;
        console.log(url);
        this.toast.showSuccess('Resend EOI Successfully!.');
        window.location.reload();
      });
    // }
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  decValue() {
    if (this.score <= 0) {
      this.score = 0;
    } else {
      --this.score;
    }
  }

  incValue() {
    if(this.score<10)
      ++this.score;
  }

  mainesValue() {
    if (this.rating <= 0) {
      this.rating = 0;
    } else {
      --this.rating;
    }
  }
  plussValue() {
    if(this.rating<10)
      ++this.rating;
  }

  addScore(id: any) {
    this.assessors_id = id;
  }

  decValue1() {
    if (this.rank <= 0) {
      this.rank = 0;
    } else {
      --this.rank;
    }
  }

  incValue1() {
    if(this.rank<10)
      ++this.rank;
  }
  checkNumber(t:any,f:any){
    if(t.target.value>0 && t.target.value<=10){
      if(f=='s1'){
        this.score = t.target.value;
      }
      if (f == 's2') {
        this.rating = t.target.value;
      }
      if (f == 's3') {
        this.rank = t.target.value;
      }
    }
    else{
       if (f == 's1') {
         this.score = 0;
       }
       if (f == 's2') {
         this.rating = 0;
       }
       if (f == 's3') {
         this.rank = 0;
       }
    }
  }
}
