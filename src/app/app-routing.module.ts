import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { NoAthenticatedGuard } from './guards/noAuthenticated.guard';
import { TransactionManagementComponent } from './components/transaction-management/transaction-management.component';
import { AuthenticationGuard } from './guards/Authentication.guard';
import { DefaultRouteGuard } from './guards/default-route.guard';
import { BalanceComponent } from './components/balance/balance.component';
import { AccountComponent } from './components/account/account.component';
import { BudgetComponent } from './components/budget/budget.component';
import { IncomeComponent } from './components/income/income.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { AdviceListComponent } from './components/advice/advice.component';

const routes: Routes = [
  {path : "signUp",component : RegistrationComponent,canActivate : [NoAthenticatedGuard]},
  {path : "verify",component : EmailVerificationComponent,canActivate : [NoAthenticatedGuard]},
  {path : "signin",component : LoginComponent,canActivate : [NoAthenticatedGuard]},
  {path : "forgot-password",component : ForgotPasswordComponent,canActivate : [NoAthenticatedGuard]},
  {path : "reset-password",component : ResetPasswordComponent,canActivate : [NoAthenticatedGuard]},
  { path: 'transactions', component: TransactionManagementComponent, canActivate: [AuthenticationGuard], data: { role : 'CLIENT'} },
  { path: 'balance', component: BalanceComponent, canActivate: [AuthenticationGuard], data: { role : 'CLIENT'} },
  { path: 'account', component: AccountComponent, canActivate: [AuthenticationGuard], data: { role : 'CLIENT'} },
  { path: 'budget', component: BudgetComponent, canActivate: [AuthenticationGuard], data: { role : 'CLIENT'} },
  { path: 'income', component: IncomeComponent, canActivate: [AuthenticationGuard], data: { role : 'CLIENT'} },
  { path: 'expense', component: ExpenseComponent, canActivate: [AuthenticationGuard], data: { role : 'CLIENT'} },
  { path: 'advice', component: AdviceListComponent, canActivate: [AuthenticationGuard], data: { role : 'CLIENT'} },
  { path: '', redirectTo: '/signin', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
