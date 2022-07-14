import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-joint-applicant',
  templateUrl: './joint-applicant.component.html',
  styleUrls: ['./joint-applicant.component.css'],
})
export class JointApplicantComponent implements OnInit {
  email: any;
  section1: Boolean = false;
  section2: Boolean = false;
  constructor(private _Activatedroute: ActivatedRoute) {}

  ngOnInit(): void {
    this.email = this._Activatedroute.snapshot.paramMap.get('email');
    if(this.email=='latikas@herbalife.com'){
      this.section1=true;
    }
    // if(this.email=='latikas@herbalife.com'){

    // }
  }
}
