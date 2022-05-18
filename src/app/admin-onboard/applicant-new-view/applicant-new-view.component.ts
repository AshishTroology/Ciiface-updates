import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AssessorsService } from 'src/app/services/assessors.service';
import { TosterService } from 'src/app/services/toster.service';
import {
  Form,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { ApplicantService } from 'src/app/services/applicant.service';
import { DataTableDirective } from 'angular-datatables';
import { LocationService } from 'src/app/services/location.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-applicant-new-view',
  templateUrl: './applicant-new-view.component.html',
  styleUrls: ['./applicant-new-view.component.css'],
})
export class ApplicantNewViewComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  assessors: any;
  assessorsForm: any;
  isValidFormSubmitted: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  totalApplicant: any = 0;
  totalLOI: any = 0;
  totalInstruction: any = 0;
  totalChecklist: any = 0;
  statedata: any;
  sector: any;
  query: any;
  constructor(
    private fb: FormBuilder,
    private applicantS: ApplicantService,
    private toast: TosterService,
    private locationS: LocationService,
    private _Activatedroute: ActivatedRoute
  ) {}
  term: any;
  cc: any = '';
  ngOnInit(): void {
    this.query = this._Activatedroute.snapshot.paramMap.get('id');
    console.log(this.query);

    $.fn['dataTable'].ext.search.push(
      (settings: any, data: any, dataIndex: any) => {
        const criteria = parseFloat(data[8]) || ''; // use data for the id column
        if (isNaN(this.cc) || this.cc == criteria) {
          return true;
        }
        return false;
      }
    );
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      ordering: true,
      searching: true,
      processing: true,
      dom: 'lBfrtip',
    };
    this.totalApplicant = 0;
    this.totalLOI = 0;
    this.totalInstruction = 0;
    this.totalChecklist = 0;
    this.locationS.getallstates().subscribe((data: any) => {
      console.log(data.result);
      this.statedata = data.result;
    });
    this.applicantS.getSector().subscribe((items: any) => {
      console.log(items);
      this.sector = items.result;
    });
    this.applicantS.getApplicant().subscribe((data: any) => {
      console.log(data.applicanData);
      this.assessors = data.applicanData;
      this.dtTrigger.next();
      this.totalApplicant = this.assessors.length;
      this.assessors.map((item: any) => {
        if (item.userStatus) {
          ++this.totalLOI;
        }
        if (item.InstructionData.length == 1) {
          ++this.totalInstruction;
        }
        if (item.finalassessmentsData.length == 1) {
          ++this.totalChecklist;
        }
      });
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    $.fn.dataTable.ext.search.pop();
  }
  getData(e: any, field: any) {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      if (field == 'criteria') {
        dtInstance.column(8).search(e.target.value).draw();
      } else if (field == 'state') {
        dtInstance.column(13).search(e.target.value).draw();
      } else {
        dtInstance.column(15).search(e.target.value).draw();
      }
    });
  }
}


