import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { baseUrl, endPoint } from './constant';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  //  private headers: HttpHeaders;
  constructor(private http: HttpClient, private router: Router) {

  }

  register(data: any): Observable<any> {
    const url = `${baseUrl}${endPoint.register}`;

    return this.http.post(url, data);
  }

  login(data: any): Observable<any> {
    const url = `${baseUrl}${endPoint.login}`;
    return this.http.post(url, data);
  }

  logout(): Observable<any> {
    const url = `${baseUrl}${endPoint.logout}`;
    // Add authorization header if your API requires it
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(url, {}, { headers });
  }

  getJudges(){
    const url = `${baseUrl}${endPoint.getJudges}`;
    return this.http.get(url);
  }

  getLawyer(){
    const url = `${baseUrl}${endPoint.getLawyer}`;
    return this.http.get(url);
  }

  addCase(data:any){
    const url = `${baseUrl}${endPoint.addCase}`;
    return this.http.post(url,data);
  }
}
