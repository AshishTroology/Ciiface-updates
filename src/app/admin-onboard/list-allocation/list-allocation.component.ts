import { Component, OnInit } from '@angular/core';
import { AllocationService } from 'src/app/services/allocation.service';
import { Subject } from 'rxjs';
import { TosterService } from 'src/app/services/toster.service';
@Component({
  selector: 'app-list-allocation',
  templateUrl: './list-allocation.component.html',
  styleUrls: ['./list-allocation.component.css'],
})
export class ListAllocationComponent implements OnInit {
  assessordata: any;
  allval_allocationlistData: any;
  wholedata: any;
  constructor(
    public allocation: AllocationService,
    private toast: TosterService
  ) {}
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  AllocationList: any;
  emailList1: any = [];
  emailList2: any = [];
  emailList3: any = [];
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

  checkArray(arr: any, id: any, f: any) {
    let b = '';
    arr.find((user: any) => {
      if (user.assessor_id === id) {
        if (f == 'teamleader') {
          b = user[f] ? 'TeamLeader' : '';
        }
        if (f == 'calibrator') {
          b = user[f] ? 'Calibrator' : '';
        }
        if (f == 'allocationliststatus') {
          b = user[f];
        }
      }
    });
    return b;
  }

  sentmail(assdata: any, listData: any) {
    this.emailList1 = [];
    this.emailList2 = [];
    this.emailList3 = [];
    this.wholedata = listData;
    this.assessordata = assdata;
    this.allval_allocationlistData = listData.allocationlistData;
  }

  getEmail1(e: any) {
    if (e.target.checked) {
      this.emailList1.push(e.target.value);
    } else {
      var index = this.emailList1.findIndex(function (o: any) {
        return o === e.target.value;
      });
      if (index !== -1) this.emailList1.splice(index, 1);
    }
    console.log(this.emailList1);
  }
  getEmail2(e: any) {
    if (e.target.checked) {
      this.emailList2.push(e.target.value);
    } else {
      var index = this.emailList2.findIndex(function (o: any) {
        return o === e.target.value;
      });
      if (index !== -1) this.emailList2.splice(index, 1);
    }
    console.log(this.emailList2);
  }
  getEmail3(e: any) {
    if (e.target.checked) {
      this.emailList3.push(e.target.value);
    } else {
      var index = this.emailList3.findIndex(function (o: any) {
        return o === e.target.value;
      });
      if (index !== -1) this.emailList3.splice(index, 1);
    }
    console.log(this.emailList3);
  }

  SendMail() {
    let counnt =
      this.emailList1.length + this.emailList2.length + this.emailList3.length;
    if (counnt != 0) {
      console.log(this.wholedata);
      this.allocation
        .SendMail2ndComm({
          wholedata: this.wholedata,
          emails1: this.emailList1,
          emails2: this.emailList2,
          emails3: this.emailList3,
        })
        .subscribe((item: any) => {
          console.log(item);
          this.toast.showInfo('Mail send Successfully');
          window.location.reload();
        });
    } else {
      this.toast.showError('Please choose email');
    }
  }

  getAccepted(allocadata:any,status:any){
    let count=0;
    allocadata.map((item:any)=>{
      if(item.allocationliststatus===status){
        count++;
      }
    })
    return count;
  }
}
