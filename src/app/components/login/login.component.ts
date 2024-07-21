// login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import  { JwtPayload,jwtDecode } from 'jwt-decode';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from '../../modals/modal-content/modal-content.component';

interface CustomJwtPayload extends JwtPayload {
  firstName: string;
  lastName: string;
  scope: string;
  email: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  passwordVisible = false;
  errorMessage! : string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private modalService: NgbModal
  ) {
    this.loginForm = this.fb.group({
      usernameOrEmail: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  togglePasswordVisibility(input: HTMLInputElement): void {
    this.passwordVisible = !this.passwordVisible;
    input.type = this.passwordVisible ? 'text' : 'password';
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const {  usernameOrEmail,  password} = this.loginForm.value;
      localStorage.removeItem("app.token");
      this.authService.login(usernameOrEmail, password)
        .subscribe(response => {
          if (response.token) {
            console.log("I git called")
            localStorage.setItem("app.token", response.token);
                const decodedToken = jwtDecode<CustomJwtPayload>(response.token);
                const roles = decodedToken.scope
                const email = decodedToken.email;
                console.log(roles);
                if(this.authService.isUserInRole("ROLE_USER")) this.openModal("your account has been deactivated.","Deactivated Account");
                if(this.authService.isUserInRole("ROLE_PRE_USER")) this.openModal('Email is pending verification. Click below to verify it.',"Pending Verification",'/verify',email);
                if(this.authService.isUserInRole("CLIENT"))     window.location.href = `/transactions`;
                // if(this.authService.isUserInRole("ROLE_USER")) this.router.navigateByUrl("/change-password");
            }else {
              console.log(response.errorMessage);
              this.errorMessage="Failed to log in."
              this.openModal(this.errorMessage,"Bad Credentiels")
              console.log(response.errorMessage);
            }
          }
      );
      
    }
  }

  openModal(message: string, title : string, redirectTo: string | null = null, email: string | null = null) {
    const modalRef = this.modalService.open(ModalContentComponent);
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.redirectTo = redirectTo;
    modalRef.componentInstance.email = email;
  }
}
