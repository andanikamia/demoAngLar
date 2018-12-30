import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JarwisService {

  private baseURL = 'http://localhost:8000/api';
  constructor(private http:HttpClient) { }

  signup(data){
    return this.http.post(`${this.baseURL}/signup`,data);
  }

  login(data){
    return this.http.post(`${this.baseURL}/login`,data);
  }
}
