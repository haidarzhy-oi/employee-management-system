import { Routes } from '@angular/router';
import { ListComponent } from "./employee-list/list.component";
import { CreateFormComponent } from "./employee-form/create-form.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: "create-employee",
    component: CreateFormComponent
  }
];
