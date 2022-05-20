import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { AllocationService } from 'src/app/services/allocation.service';

@Component({
  selector: 'app-teamallocation',
  templateUrl: './teamallocation.component.html',
  styleUrls: ['./teamallocation.component.css'],
})
export class TeamallocationComponent implements OnInit {
  udata: any;
  allocationId: any;
  constructor(
    public allocation: AllocationService,
    private _Activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.udata = localStorage.getItem('userdata');
    this.udata = JSON.parse(this.udata);
    this.allocationId=this._Activatedroute.snapshot.paramMap.get('id');
    this.allocation
      .getAllAllocationByAssessor(this.udata._id)
      .subscribe((item: any) => {
        console.log(item);
      });
  }
}
