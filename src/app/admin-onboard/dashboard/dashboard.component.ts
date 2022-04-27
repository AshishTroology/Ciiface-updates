import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  logindata: any;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.logindata = localStorage.getItem('userdata');
    let uddd = JSON.parse(this.logindata);
    if (uddd.role == 'applicant') {
      this.router.navigate(['/applicant']);
    } else if (uddd.role == 'assessor') {
      this.router.navigate(['/assessors-dashboard']);
    } else if (uddd.role == 'calibrator') {
      this.router.navigate(['/calibrator-dashboard']);
    }
    else{
      this.router.navigate(['/dashboard']);
    }
  }
}
