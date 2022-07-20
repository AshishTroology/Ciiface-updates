import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart, ChartData, ChartEvent, ChartType } from 'chart.js';
import { Subject } from 'rxjs';
import { AllocationService } from 'src/app/services/allocation.service';
import { ApplicantService } from 'src/app/services/applicant.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  chart: any;
  logindata: any;
  applicant: any;
  totalApplicant: any = 0;
  totalLOI: any = 0;
  totalInstruction: any = 0;
  totalChecklist: any = 0;
  detail: any;
  record: any = [];
  record1: any = [];
  record2: any = [];
  record_1: any = [];
  record_2: any = [];
  AllocationList: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(
    private router: Router,
    private applicantS: ApplicantService,
    public allocation: AllocationService
  ) {}

  // Doughnut
  public options: any = {
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
      tooltip: {
        enabled: true,
      },
    },
  };
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{ data: this.record }],
  };
  public doughnutChartLabels1: string[] = [];
  public doughnutChartData1: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels1,
    datasets: [{ data: this.record1 }],
  };
  public doughnutChartLabels2: string[] = [];
  public doughnutChartData2: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels2,
    datasets: [{ data: this.record2 }],
  };

  public doughnutChartLabels_1: string[] = [];
  public doughnutChartData_1: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels_1,
    datasets: [{ data: this.record_1 }],
  };
  public doughnutChartLabels_2: string[] = [];
  public doughnutChartData_2: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels_2,
    datasets: [{ data: this.record_2 }],
  };
  public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  ngOnInit(): void {
    this.logindata = localStorage.getItem('userdata');
    let uddd = JSON.parse(this.logindata);
    if (uddd.role == 'applicant') {
      this.router.navigate(['/applicant']);
    } else if (uddd.role == 'assessor') {
      this.router.navigate(['/assessors-dashboard']);
    } else if (uddd.role == 'calibrator') {
      this.router.navigate(['/calibrator-dashboard']);
    } else {
      this.router.navigate(['/dashboard']);
    }
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      ordering: true,
      searching: true,
      processing: true,
    };
    this.allocation.getAllAllocation().subscribe((item: any) => {
      console.log(item);
      this.AllocationList = item.result;
      this.dtTrigger.next();
    });
    this.applicantS.getApplicant().subscribe((data: any) => {
      // console.log(data.applicanData.classificationData);
      this.applicant = data.applicanData;
      this.totalApplicant = this.applicant.length;
      this.applicant.map((item: any) => {
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
    this.applicantS.AdminDashboard().subscribe((item: any) => {
      console.log(item);
      this.detail = item;
      this.detail.app_sector.map((ytem: any) => {
        if (ytem._id.sector != null) {
          this.doughnutChartLabels.push(ytem._id.sector);
          this.record.push(ytem.scount);
        }
      });
      this.detail.app_criteria.map((ytem: any) => {
        if (ytem._id.criteria != null) {
          this.doughnutChartLabels1.push(ytem._id.criteria);
          this.record1.push(ytem.count);
        }
      });
      this.detail.app_state.map((ytem: any) => {
        if (ytem._id.applicantState != null) {
          this.doughnutChartLabels2.push(ytem._id.applicantState);
          this.record2.push(ytem.count);
        }
      });
    });

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
