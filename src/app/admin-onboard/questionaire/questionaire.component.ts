import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { question } from 'src/app/question';
import { QuestionService } from 'src/app/services/question.service';
import { TosterService } from 'src/app/services/toster.service';
@Component({
  selector: 'app-questionaire',
  templateUrl: './questionaire.component.html',
  styleUrls: ['./questionaire.component.css'],
})
export class QuestionaireComponent implements OnInit {
  constructor(
    private QuesServer: QuestionService,
    private toast: TosterService
  ) {}
  importContacts: any = [];
  public gridData: any;
  ngOnInit(): void {
    this.QuesServer.viewQuestion().subscribe((item:any)=>{
      console.log(item);

      this.gridData = item.Ques;
    })
  }

  importFromFile(bstr: string): XLSX.AOA2SheetOpts {
    /* read workbook */
    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

    /* grab first sheet */
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    /* save data */
    const data = <XLSX.AOA2SheetOpts>(
      XLSX.utils.sheet_to_json(ws, { header: 1 })
    );

    return data;
  }

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const data = <any[]>this.importFromFile(bstr);

      const header: string[] = Object.getOwnPropertyNames(new question());
      const importedData = data.slice(1);

      this.importContacts = importedData.map((arr) => {
        const obj: any = {};
        for (let i = 0; i < header.length; i++) {
          const k = header[i];
          obj[k] = arr[i];
        }
        return <any>obj;
      });
      console.log(this.importContacts);
      this.QuesServer.bulkInsert(this.importContacts).subscribe(
        (item: any) => {
           this.toast.showInfo(
             'Question Saved.'
           );
           window.location.href = '/questionaire';
          //  this.gridData = this.importContacts;
        }
      );
    };
    reader.readAsBinaryString(target.files[0]);
  }
}
