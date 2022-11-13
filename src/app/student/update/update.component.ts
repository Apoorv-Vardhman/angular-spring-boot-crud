import { Component, OnInit } from '@angular/core';
import {FormGroup, NonNullableFormBuilder, FormControl, Validators} from "@angular/forms";
import {StudentService} from "../../services/student.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {Student} from "../../models/student.model";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  protected studentForm!:FormGroup;
  protected submitted = false;
  protected id!:Number;

  constructor(
    private formBuilder:NonNullableFormBuilder,
    private service:StudentService,
    private toaster:ToastrService,
    private router: Router,
    private activateRoute:ActivatedRoute,
  ) { }

  ngOnInit(): void {
    /*this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });*/
    this.id = Number(this.activateRoute.snapshot.paramMap.get("id"));
    this.fetchStudent();
    this.studentForm = this.formBuilder.group({
      firstName:new FormControl("",[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
      lastName:new FormControl("",[
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]),
      email:new FormControl("",[

      ])
    });

  }

  protected get firstName(){
    return this.studentForm.controls['firstName'];
  }

  protected get lastName(){
    return this.studentForm.controls['lastName'];
  }

  protected get email()
  {
    return this.studentForm.controls['email'];
  }

  fetchStudent()
  {
    this.service.getStudent(this.id).subscribe((data)=>{
      console.log(data);
      // @ts-ignore
      this.studentForm.controls['firstName'].setValue(data.data.firstName);
      // @ts-ignore
      this.studentForm.controls['lastName'].setValue(data.data.lastName);
      // @ts-ignore
      this.studentForm.controls['email'].setValue(data.data.emailID);
    },(error)=>{
      console.log(error)
    })

  }

  submit()
  {
    const student:Student = {
      emailID: this.email.value, firstName: this.firstName.value, lastName: this.lastName.value,id:this.id
    }
    console.log(this.studentForm.value);
    this.service.updateStudent(student).subscribe((data)=>{
      console.log(data);
      // @ts-ignore
      this.showSuccess(data.message);
      this.router.navigate(['/students']);
    },(error)=>{
      this.showError(error.error.message);
    })
  }
  showError(message:string)
  {
    this.toaster.error(message,"Error");
  }

  showSuccess(message:string) {
    this.toaster.success(message, 'Success');
  }
}
