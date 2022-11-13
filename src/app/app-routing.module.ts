import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StudentsComponent} from "./student/students/students.component";
import {CreateComponent} from "./student/create/create.component";
import {UpdateComponent} from "./student/update/update.component";

const routes: Routes = [
  {
    path:"students",
    pathMatch:"full",
    component:StudentsComponent
  },
  {
    path:"students/create",
    pathMatch:"full",
    component:CreateComponent
  },
  {
    path:"students/:id/update",
    pathMatch:"full",
    component:UpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
