import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { ModalContentComponent } from './modals/modal-content/modal-content.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { VerificationSuccessModalComponent } from './modals/verification-success-modal/verification-success-modal.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { LoadingService } from './services/loading.service';
import { AppHttpInterceptor } from './services/app-http.interceptor';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TransactionManagementComponent } from './components/transaction-management/transaction-management.component';
import { TwoDecimalDirective } from './directives/two-decimal.directive';
import { ModifyTransactionComponent } from './modals/modify-transaction/modify-transaction.component';
import { BalanceComponent } from './components/balance/balance.component';
import { AccountComponent } from './components/account/account.component';
import { BudgetComponent } from './components/budget/budget.component';
import { BudgetSelectionModalComponent } from './modals/budget-selection-modal/budget-selection-modal.component';
import { AddBudgetModalComponent } from './modals/add-budget-modal/add-budget-modal.component';
import { IncomeComponent } from './components/income/income.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { AdviceListComponent } from './components/advice/advice.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    ModalContentComponent,
    EmailVerificationComponent,
    VerificationSuccessModalComponent,
    LoadingSpinnerComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    NavbarComponent,
    SidebarComponent,
    TransactionManagementComponent,
    TwoDecimalDirective,
    ModifyTransactionComponent,
    BalanceComponent,
    AccountComponent,
    BudgetComponent,
    BudgetSelectionModalComponent,
    AddBudgetModalComponent,
    IncomeComponent,
    ExpenseComponent,
    AdviceListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [LoadingService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AppHttpInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
