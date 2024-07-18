import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { NoAthenticatedGuard } from './guards/noAuthenticatd.guard';

const routes: Routes = [
  {path : "signUp",component : RegistrationComponent,canActivate : [NoAthenticatedGuard]},
  {path : "verify",component : EmailVerificationComponent,canActivate : [NoAthenticatedGuard]},
  {path : "signin",component : LoginComponent,canActivate : [NoAthenticatedGuard]},
  {path : "forgot-password",component : ForgotPasswordComponent,canActivate : [NoAthenticatedGuard]},
  {path : "reset-password",component : ResetPasswordComponent,canActivate : [NoAthenticatedGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
