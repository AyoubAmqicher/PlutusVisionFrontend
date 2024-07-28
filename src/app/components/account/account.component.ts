import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { UsernameValidators } from '../../validators/username.validators';
import { NameValidators } from '../../validators/name.validators';
import { PasswordValidators } from '../../validators/password.validators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from '../../modals/modal-content/modal-content.component';
import { lastValueFrom } from 'rxjs';
import { LoadingService } from '../../services/loading.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: any;
  accountForm: FormGroup;
  editForm: FormGroup;
  passwordForm: FormGroup;
  editingUsername = false;
  editingFirstName = false;
  editingLastName = false;
  editingEmail = false;
  confirmingEmailChange = false;

  confirmationCode!: string;

  currentPassword!: string;
  newPassword!: string;
  confirmPassword!: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private modalService: NgbModal,
    private loadingService : LoadingService,
    private router : Router
  ) {
    this.accountForm = this.fb.group({
      username: ['', {
        validators: [Validators.required, UsernameValidators.validUsername()],
        asyncValidators: [this.userService.checkUsernameforAuthenticated()],
        updateOn: 'blur'
      }],
      firstName: ['', [Validators.required, NameValidators.validName()]],
      lastName: ['', [Validators.required, NameValidators.validName()]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.editForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, PasswordValidators.validPassword()]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: PasswordValidators.passwordsMatch()
    });
  }

  ngOnInit(): void {
    this.fetchUserDetails();
  }

  fetchUserDetails(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.userService.getUserById(userId).subscribe((data: any) => {
        this.user = data;
        this.accountForm.patchValue({
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email
        });
      });
    }
  }

  toggleEdit(field: string): void {
    switch (field) {
      case 'username':
        this.editingUsername = !this.editingUsername;
        if (!this.editingUsername) this.saveEdit('username');
        break;
      case 'firstName':
        this.editingFirstName = !this.editingFirstName;
        if (!this.editingFirstName) this.saveEdit('firstName');
        break;
      case 'lastName':
        this.editingLastName = !this.editingLastName;
        if (!this.editingLastName) this.saveEdit('lastName');
        break;
      case 'email':
        this.editingEmail = !this.editingEmail;
        break;
    }
  }

  saveEdit(field: string): void {
    if (this.accountForm.valid) {
      const updatedUser = { ...this.user, ...this.accountForm.value };

      // Perform the update operation with updatedUser
      // Uncomment and implement the update service call below
      const userId = this.authService.getUserId();
      if(userId){
        this.userService.updateUser(updatedUser,userId).subscribe((data: any) => {
          this.user = data;
          
        });
      }
      if(field == "firstName") this.editingFirstName = false;
      if(field == "username") this.editingUsername = false;
      if(field == "lastName") this.editingLastName = false;


    } else {
      this.accountForm.markAllAsTouched();
    }
  }


  confirmEmailChange(): void {
    const {email} = this.editForm.value;
    this.userService.checkEmail(email).subscribe( respone => {
      if(respone){
        this.editingEmail = false;
        this.openModal("email Already exist","Operation Failed");
      }else{
        const userId = this.authService.getUserId();
        if(userId){
          (async () => {
            try {
              const response = await lastValueFrom(this.userService.changeEmail(userId,email));
            } catch (error) {
              console.error('Failed to generate new verification code.');
            }
          })();
          this.loadingService.hideLoadingSpinner();
        }
        this.editingEmail = false;
        localStorage.removeItem('app.token');
        window.location.href = `/verify?email=${email}`;
      }
    }
    )
  }

  changePassword(): void {
    if (this.passwordForm.valid) {
      const { currentPassword, newPassword } = this.passwordForm.value;
      const userId = this.authService.getUserId();
      if (userId) {
        // this.userService.changePassword(userId, currentPassword, newPassword).subscribe(
        //   () => alert('Password changed successfully!'),
        //   (error) => alert('Failed to change password.')
        // );
      }
    } else {
      this.passwordForm.markAllAsTouched();
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
