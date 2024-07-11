import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';

const routes: Routes = [
  {path : "signUp",component : RegistrationComponent},
  {path : "verify",component : EmailVerificationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
