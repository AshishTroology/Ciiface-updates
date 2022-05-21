import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicantService } from '../services/applicant.service';

@Component({
  selector: 'app-view-applicant',
  templateUrl: './view-applicant.component.html',
  styleUrls: ['./view-applicant.component.css']
})
export class ViewApplicantComponent implements OnInit {
  id: any;
  applicantData: any;

  constructor(private Applicant: ApplicantService,private _Activatedroute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.id = this._Activatedroute.snapshot.paramMap.get('id');
    this.Applicant.GetAdminApplicantSingle(this.id).subscribe((item:any)=>{
      console.log(item.applicanData[0])
      this.applicantData=item.applicanData[0];
    })
  }

}
