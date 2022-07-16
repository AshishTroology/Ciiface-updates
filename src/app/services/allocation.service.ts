import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { base_url, base_url_upload } from '../global';

@Injectable({
  providedIn: 'root',
})
export class AllocationService {
  constructor(private http: HttpClient) {}

  checkallocation(id: any) {
    let api_url = base_url + 'checkAllocation/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  getviewApplicantLOISubmitted() {
    let api_url = base_url + 'viewApplicantLOISubmitted';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  viewAssessorAsPerSector(data: any) {
    let api_url = base_url + 'viewAssessorAsPerSector';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }
  saveAllocation(data: any) {
    let api_url = base_url + 'SaveAllocation';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  getAllAllocation() {
    let api_url = base_url + 'list-allocation';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  getAllAllocationByAssessor(id: any) {
    let api_url = base_url + 'allocationByAssessor/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  getAllAllocationByAssessorOne(id: any) {
    let api_url = base_url + 'allocationByAssessorOne/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  updateStatusAllocationByAssessor(id: any, data: any) {
    let api_url = base_url + 'updateStatusAllocationByAssessor/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  updateSectionInAllocation(id: any, data: any) {
    let api_url = base_url + 'updateSectionInAllocation/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  updatePeriodInAllocation(id: any, data: any) {
    let api_url = base_url + 'updatePeriodInAllocation/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }
  editAllocation(id: any) {
    let api_url = base_url + 'editAllocation/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  updateAllocation(data: any) {
    let api_url = base_url + 'updateAllocation';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  SendMail2ndComm(data: any) {
    let api_url = base_url + 'sendMail';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  updateMailStatus(data: any) {
    let api_url = base_url + 'updateMailStatus';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }
}
