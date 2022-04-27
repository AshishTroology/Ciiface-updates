import { Component, OnInit,ViewChild } from '@angular/core';
import { ApplicantService } from 'src/app/services/applicant.service';
import Swal from 'sweetalert2';
import { FormBuilder, Validators }   from '@angular/forms';
import { TosterService } from 'src/app/services/toster.service';

import {
  DataBindingDirective,
  GridDataResult,
  PageChangeEvent,
} from '@progress/kendo-angular-grid';
import { GridModule } from '@progress/kendo-angular-grid/';
import { process, SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-applicant-view',
  templateUrl: './applicant-view.component.html',
  styleUrls: ['./applicant-view.component.css'],
})
export class ApplicantViewComponent implements OnInit {
  @ViewChild(DataBindingDirective) dataBindings!: DataBindingDirective;
  @ViewChild(GridModule) dataBinding!: GridModule;
  applicant: any;
  user: any;
  isValidFormSubmitted: any;
  appForm: any;
  public gridData: any;
  public gridView: any;
  public mySelection: string[] = [];
  public pageSize = 5;
  public skip = 0;


  constructor(
    private fb: FormBuilder,
    private applicantS: ApplicantService,
    private toast: TosterService
  ) {}
  term: any;
  ngOnInit(): void {
    this.applicantS.getApplicant().subscribe((data: any) => {
      console.log(data);
      this.applicant = data.applicanData;
      this.gridData = data.applicanData;
      this.gridView = data.applicanData;
    });

    // this.get()
  }
  get() {
    this.applicantS.getApplicant().subscribe((data: any) => {
      this.gridData = data.applicanData;
      this.gridView = data.applicanData;
      console.log(data);
    });
  }

  public show: boolean = false;
  public buttonName: any = true;
  toggle() {
    this.show = !this.show;
    if (this.show) this.buttonName = false;
    else this.buttonName = true;
  }

  handleWarningAlert() {
    Swal.fire({
      text: 'Are you sure you want to delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Clicked Yes, File deleted!');
        window.location.href = 'view-applicant';
      } else if (result.isDismissed) {
        console.log('Clicked No, File is safe!');
      }
    });
  }

  public onFilter(e: any): void {
    let inputValue = e.target.value;
    this.gridView = process(this.gridData, {
      filter: {
        logic: 'or',
        filters: [
          {
            field: 'applicantId',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'unitName',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'criteria',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'contactPerson',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'designation',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'mobileNo',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'email',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'state',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'city',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'addressLine1',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'addressLine2',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'sector',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'product',
            operator: 'contains',
            value: inputValue,
          },
        ],
      },
    }).data;

    this.dataBindings.skip = 0;
  }

  sendActivationEmail(id: any) {
    // console.log(id)
    Swal.fire({
      text: 'Are you sure you want to Activate?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.applicantS.sendActivationEmail(id).subscribe((resultw: any) => {
          window.location.reload();
        });
      } else if (result.isDismissed) {
        console.log('Clicked No, File is safe!');
      }
    });
  }
}
