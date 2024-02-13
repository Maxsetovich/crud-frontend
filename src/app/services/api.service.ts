import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postUser(data: any) {
    return this.http.post<any>("https://localhost:7007/api/users", data)
  }

  getUser() {
    return this.http.get<any>("https://localhost:7007/api/users")
  }

  putUser(data: any, id: string) {
    return this.http.put<any>("https://localhost:7007/api/users/"+id, data)
  }

  deleteUser(id: Guid) {
    return this.http.delete<any>("https://localhost:7007/api/users/"+id)
  }
}
