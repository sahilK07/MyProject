import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) { }

  login(body:any){
    return this._http.post('http://localhost:3000/Auth/login', body,{
      observe:'body'
    });
  }
}
