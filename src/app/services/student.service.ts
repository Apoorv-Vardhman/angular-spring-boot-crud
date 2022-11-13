import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Constants} from "../config/constants";
import {Student} from "../models/student.model";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }

  getAll() {
    return this.http.get<Student[]>(`${Constants.API_ENDPOINT}/students`);
  }

  addStudent(student:Student)
  {
    return this.http.post(`${Constants.API_ENDPOINT}/students`,student);
  }

  getStudent(id:Number)
  {
    return this.http.get(`${Constants.API_ENDPOINT}/students/${id}`);
  }

  deleteStudent(id:Number)
  {
    /*const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: id
      },
    };*/
    return this.http.delete(`${Constants.API_ENDPOINT}/students/${id}`);
  }

  updateStudent(student:Student)
  {
    return this.http.patch(`${Constants.API_ENDPOINT}/students`,student);
  }
}
