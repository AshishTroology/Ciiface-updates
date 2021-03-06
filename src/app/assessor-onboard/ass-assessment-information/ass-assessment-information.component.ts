import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AllocationService } from 'src/app/services/allocation.service';
import Swal from 'sweetalert2';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-ass-assessment-information',
  templateUrl: './ass-assessment-information.component.html',
  styleUrls: ['./ass-assessment-information.component.css'],
})
export class AssAssessmentInformationComponent implements OnInit {
  udata: any;
  constructor(public allocation: AllocationService) {}
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  AllocationList: any;
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
        this.dtTrigger.next();
      });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  updateStatus(
    e: any,
    _id: any,
    status: any,
    email: any,
    tl: any,
    applicantName: any
  ) {
    Swal.fire({
      title: 'Are you sure?',
      text:
        'You want to ' +
        status +
        ' your allocation. Once submitted, you will not be able to make any changes.',
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, submit',
    }).then((result) => {
      if (result.isConfirmed) {
        this.allocation
          .updateStatusAllocationByAssessor(_id, {
            status: status,
            email: email,
            tl: tl,
            assessor: this.udata.username,
            applicantName: applicantName,
          })
          .subscribe((item: any) => {
            console.log(item);
            window.location.reload();
          });
      }
    });
  }

  checkValidity(status: any, from: any, to: any): boolean | undefined {
    if (status != 'accepted' || from == null || to == null) {
      return false;
    } else {
      // console.log(from, to, 'dates--------------');
      // console.log(this.calculateDiff(from, to));

      return this.calculateDiff(from, to);
    }
  }

  calculateDiff(from:any,to:any) {
    const fromDate = from;
    const toDate = to;
    // const inputDate = ;

    if (
      DateTime.local() >= DateTime.fromISO(fromDate).minus({ days: 7 }) &&
      DateTime.local() <= DateTime.fromISO(toDate)
    ) {
      console.log('within range');
      return true;
    } else {
      console.log(
        'not in range',
        DateTime.fromISO(fromDate).minus({ days: 7 }),
        DateTime.fromISO(toDate)
      );
      return false;
    }
  }
}
