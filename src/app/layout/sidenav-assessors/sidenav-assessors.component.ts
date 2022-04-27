import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav-assessors',
  templateUrl: './sidenav-assessors.component.html',
  styleUrls: ['./sidenav-assessors.component.css']
})
export class SidenavAssessorsComponent implements OnInit {

  constructor(private router: Router) { }

  username:any
  logout(){
    localStorage.removeItem('user')
    localStorage.removeItem('username') 
  }
  ngOnInit(): void {
    this.username= localStorage.getItem('username')?localStorage.getItem('username'):this.router.navigate(['/login'])
  }
}
