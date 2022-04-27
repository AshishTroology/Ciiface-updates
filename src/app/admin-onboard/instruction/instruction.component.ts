import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TosterService } from 'src/app/services/toster.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.css'],
})
export class InstructionComponent implements OnInit {
  constructor(
    private quesServer: QuestionService,
    private toast: TosterService
  ) {}

  ngOnInit(): void {
    this.quesServer.viewInstruction().subscribe((data: any) => {
      this.gridData = data.Inst;
    });
  }
  public gridData: any[] = [];
  public model = {
    criteria: '',
    description: '',
  };
  form: NgForm | undefined;
  showdiv: boolean = false;

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.quesServer.instructionInsert(form.value).subscribe((item: any) => {
      this.toast.showInfo('Instruction Saved.');
      window.location.href = '/instruction';
    });
  }
  chkDiv() {
    this.showdiv = true;
  }
  chkDivFalse(){
    this.showdiv = false;
  }

  editForm(data: any) {
    this.showdiv = true;
    this.model.criteria = data.criteria;
    this.model.description = data.description;
  }
}
