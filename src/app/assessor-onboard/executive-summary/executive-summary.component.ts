import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TosterService } from 'src/app/services/toster.service';

@Component({
  selector: 'app-executive-summary',
  templateUrl: './executive-summary.component.html',
  styleUrls: ['./executive-summary.component.css'],
})
export class ExecutiveSummaryComponent implements OnInit {
  executiveForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private toast: TosterService,
    public datepipe: DatePipe
  ) {}
  ngOnInit(): void {}

  saveExecutiveForm() {}
}
