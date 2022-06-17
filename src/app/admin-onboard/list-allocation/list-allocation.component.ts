import { Component, OnInit } from '@angular/core';
import { AllocationService } from 'src/app/services/allocation.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-list-allocation',
  templateUrl: './list-allocation.component.html',
  styleUrls: ['./list-allocation.component.css'],
})
export class ListAllocationComponent implements OnInit {
  constructor(public allocation: AllocationService) {}
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  AllocationList: any;
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      ordering: true,
      searching: true,
      processing: true,
      dom: 'lfrtip',
    };
    this.allocation.getAllAllocation().subscribe((item: any) => {
      console.log(item);
      this.AllocationList = item.result;
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  checkArray(arr:any,id:any,f:any){
    let b="";
    arr.find((user:any) => {
      if (user.assessor_id === id) {
        if(f=='teamleader'){
          b = user[f] ? 'TeamLeader' : '';
        }
        if (f == 'calibrator') {
          b = user[f] ? 'Calibrator' : '';
        }
        if (f == 'allocationliststatus') {
          b = user[f];
        }
      };
    })
    return b;
  }
}
