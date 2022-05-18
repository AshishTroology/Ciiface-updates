import { Component, OnInit } from '@angular/core';
import { ApplicantService } from 'src/app/services/applicant.service';

@Component({
  selector: 'app-dashboard-applicant',
  templateUrl: './dashboard-applicant.component.html',
  styleUrls: ['./dashboard-applicant.component.css']
})
export class DashboardApplicantComponent implements OnInit {
  udata: any;
  applicantData: any;

  constructor(private applicants:ApplicantService) { }

  ngOnInit(): void {
     this.udata = localStorage.getItem('userdata');
     this.udata = JSON.parse(this.udata);
    this.applicants.getApplicantSearch({email:this.udata.email}).subscribe((iten:any)=>{
      console.log(iten)
      this.applicantData = iten.applicanData[0];
    })
  }

}
