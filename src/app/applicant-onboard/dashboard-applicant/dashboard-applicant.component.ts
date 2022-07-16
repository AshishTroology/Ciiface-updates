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
  allocationlist: any;
  scheduledata: any='pending';

  constructor(private applicants:ApplicantService) { }

  ngOnInit(): void {
     this.udata = localStorage.getItem('userdata');
     this.udata = JSON.parse(this.udata);
    this.applicants.getApplicantSearch({email:this.udata.email}).subscribe((iten:any)=>{
      console.log(iten)
      this.applicantData = iten.applicanData[0];
      this.allocationlist = iten.applicanData[0].allocationlistData;
      if(this.allocationlist.length==0){
         this.scheduledata = 'Pending'
      }
      else{
        this.allocationlist.map((item: any) => {
          if(item.teamleader)
            this.scheduledata =
              (item.period_from == null ? 'Pending' : (item.period_from+'-')) +
              (item.period_to == null ? '' : item.period_from);
            // this.teamleader=item.
        });
      }
    })
  }

}
