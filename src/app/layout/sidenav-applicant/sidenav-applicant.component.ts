import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicantService } from 'src/app/services/applicant.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-sidenav-applicant',
  templateUrl: './sidenav-applicant.component.html',
  styleUrls: ['./sidenav-applicant.component.css']
})
export class SidenavApplicantComponent implements OnInit {
  udata: any;
  userStatusLi: any;

  constructor(private router: Router,private quest:QuestionService,private applicat:ApplicantService) { }
  username:any;
  section:any;
  logout(){
    localStorage.removeItem('user')
    localStorage.removeItem('username')
  }
  ngOnInit(): void {
    this.username= localStorage.getItem('username')?localStorage.getItem('username'):this.router.navigate(['/login'])
     this.udata = localStorage.getItem('userdata');
    this.udata = JSON.parse(this.udata);
      let email = this.udata.email;
      this.applicat
        .GetAdminApplicantSinglebyemail(email)
        .subscribe((data: any) => {
          // this.userStatusLi=data.applicanData.userStatus;
          console.log(this.userStatusLi);
          if (
            data.applicanData.criteria != '' &&
            data.applicanData.userStatus===true
          ) {
            this.quest
              .viewQuestionSec({ criteria: data.applicanData.criteria })
              .subscribe((item: any) => {
                // console.log(item);
                this.section = item.sec;
              });
          } else {
          }
        })
  }

}
