import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoApplicantService } from 'src/app/services/co-applicant.service';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-list-coapplicant',
  templateUrl: './list-coapplicant.component.html',
  styleUrls: ['./list-coapplicant.component.css'],
})
export class ListCoapplicantComponent implements OnInit, OnDestroy {
  udata: any;
  _id: any;
  allcoapplicant: any = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  applicantid: any;
  constructor(
    private coapp: CoApplicantService,
    private _Activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.udata = localStorage.getItem('userdata');
    this.udata = JSON.parse(this.udata);
    this._id = this.udata._id;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      ordering: false,
      searching: true,
    };
    if (this.udata.role == 'applicant') {
      this.users(this._id);
    } else {
      this.applicantid = this._Activatedroute.snapshot.paramMap.get('id');
      this.users(this.applicantid)
    }
  }

  users(id: any): void {
    this.coapp.listCoApplicant(id).subscribe((response: any) => {
      if (response.statusCode === 200) {
        this.allcoapplicant = response.result;
        this.dtTrigger.next();
      }
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getValuemap(arr:any){
    let str;
    str=arr.map((item:any) => {
      return item.item_text;
    }).join(',');
    return str;
  }
}
