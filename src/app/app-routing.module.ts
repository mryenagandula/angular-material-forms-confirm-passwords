import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';


const routes: Routes = [
  {
    path:"",
    pathMatch:"full",
    redirectTo:"reset-password"
  },
  {
    path:"reset-password",
    component: ResetPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
