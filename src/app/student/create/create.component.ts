import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, NonNullableFormBuilder} from "@angular/forms";
import {StudentService} from "../../services/student.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  protected studentForm!:FormGroup;
  protected submitted = false;


  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
              private service:StudentService,
              private toastr: ToastrService,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.studentForm=this.formBuilder.group({
      firstName:new FormControl("",[Validators.required]),
      lastName:new FormControl("",[Validators.required,Validators.minLength(2)]),
      email: new FormControl("",[Validators.required,Validators.minLength(4),Validators.email])
    })
  }

  protected get firstName(){return this.studentForm.controls['firstName'];}
  protected get lastName(){return this.studentForm.controls['lastName'];}
  protected get email(){return this.studentForm.controls['email'];}

  submit()
  {
    if(this.studentForm.valid)
    {
      this.submitted = true;
      this.service.addStudent({lastName:this.lastName.value,firstName:this.firstName.value,emailID:this.email.value})
        .subscribe(response=>{
          // @ts-ignore
          this.showSuccess(response.message);
          this.router.navigate(['/students']);
        },error=>{
          console.log(error.error.message)
          this.showError(error.error.message);
          this.submitted = false;
          })
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
