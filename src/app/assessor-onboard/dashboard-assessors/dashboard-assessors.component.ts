import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AllocationService } from 'src/app/services/allocation.service';

@Component({
  selector: 'app-dashboard-assessors',
  templateUrl: './dashboard-assessors.component.html',
  styleUrls: ['./dashboard-assessors.component.css'],
})
export class DashboardAssessorsComponent implements OnInit {
  udata: any;
  constructor(public allocation: AllocationService) {}
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  AllocationList: any;
  assessmentCount:any;
  ngOnInit(): void {
    this.udata = localStorage.getItem('userdata');
    this.udata = JSON.parse(this.udata);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      ordering: true,
      searching: true,
      processing: true,
      dom: 'lfrtip',
    };
    console.log(this.udata);
    this.allocation
      .getAllAllocationByAssessor(this.udata._id)
      .subscribe((item: any) => {
        console.log(item);
        this.AllocationList = item.result;
        this.assessmentCount = item.result.length;
        this.dtTrigger.next();
      });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
