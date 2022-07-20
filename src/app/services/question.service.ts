import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { base_url } from '../global';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  bulkInsert(data: any) {
    let api_url = base_url + 'bulkInsertQues';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }
  viewQuestion() {
    let api_url = base_url + 'viewQuestion';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.get(api_url, httpOptions);
  }
  instructionInsert(data: any) {
    let api_url = base_url + 'insertInstruction';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }
  viewInstruction() {
    let api_url = base_url + 'viewInstruction';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.get(api_url, httpOptions);
  }
  viewQuestionSec(data: any) {
    let api_url = base_url + 'viewQuestionSec';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  viewInstructionByCriteria(data: any) {
    let api_url = base_url + 'viewInstructionByCriteria';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  viewQuestionByCriteria(data: any) {
    let api_url = base_url + 'viewQuestionByCriteria';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  saveAssessment(data: any) {
    let api_url = base_url + 'addAssessment';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  viewAssessment(data: any) {
    let api_url = base_url + 'ViewAssessment';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  saveUserInstruction(data: any) {
    let api_url = base_url + 'addUserInstruction';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  viewUserInstruction(data: any) {
    let api_url = base_url + 'ViewInst';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }
  saveFinally(data: any) {
    let api_url = base_url + 'saveFinalAssessment';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  viewFinally(data: any) {
    let api_url = base_url + 'viewFinalAssessment';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  getAllocated(data: any) {
    let api_url = base_url + 'getAllocated';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }
  getScore(data: any) {
    let api_url = base_url + 'getScore';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  addScore(data: any) {
    let api_url = base_url + 'addScore';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  getSubSection(data: any) {
    let api_url = base_url + 'getSubSection';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  getAllocationAssessor(data: any) {
    let api_url = base_url + 'getAllocationAssessor';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  getAssessment(data: any) {
    let api_url = base_url + 'getAssessment';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  getAssessmentScore(data: any) {
    let api_url = base_url + 'getAssessmentScore';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }
  addConsensusScore(data: any) {
    let api_url = base_url + 'addConsensusScore';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  getConsensusScore(data: any) {
    let api_url = base_url + 'getConsensusScore';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  sectionGroupbyCriteria(data: any) {
    let api_url = base_url + 'sectionGroupbyCriteria';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  questionGroupbyCriteria(data: any) {
    let api_url = base_url + 'questionGroupbyCriteria';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  saveHighScore(data: any) {
    let api_url = base_url + 'saveHighScore';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }
  getHighScore(data: any) {
    let api_url = base_url + 'getHighScore';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }
}
