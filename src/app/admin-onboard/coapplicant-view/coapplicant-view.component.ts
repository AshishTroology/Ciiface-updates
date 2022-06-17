import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { ApplicantService } from 'src/app/services/applicant.service';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-coapplicant-view',
  templateUrl: './coapplicant-view.component.html',
  styleUrls: ['./coapplicant-view.component.css'],
})
export class CoapplicantViewComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  assessors: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private applicantS: ApplicantService
  ) {}
  term: any;
  cc: any = '';
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      ordering: true,
      searching: true,
      processing: true,
      dom: 'lBfrtip',
    };

    this.applicantS.getCoApplicant().subscribe((data: any) => {
      console.log(data.applicanData);
      this.assessors = data.applicanData;
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
