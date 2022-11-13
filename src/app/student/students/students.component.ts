import { Component, OnInit } from '@angular/core';
import {Student} from "../../models/student.model";
import {map} from "rxjs/operators";
import {StudentService} from "../../services/student.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  studentList: Student[] =[];

  constructor(
    private studentService:StudentService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.fetchStudents();
  }

  private fetchStudents()
  {
     this.studentService.getAll().subscribe((data=>{
       this.studentList = data;
       console.log(this.studentList)
     }),(error=>{
       console.log(error)
     }));
  }

  delete(id: Number) {
    if(confirm("Are you sure to delete this student")) {
      this.studentService.deleteStudent(id).subscribe((data)=>{
        // @ts-ignore
        this.showSuccess("Student deleted");
        this.fetchStudents();
      },(error=>{
        this.showError(error.message);
      }))
    }
  }

  showError(message:string)
  {
    this.toastr.error(message,"Error");
  }

  showSuccess(message:string) {
    this.toastr.success(message, 'Success');
  }

}
