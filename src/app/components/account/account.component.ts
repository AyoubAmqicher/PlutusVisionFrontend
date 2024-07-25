import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: any;
  editingUsername = false;
  editingFirstName = false;
  editingLastName = false;
  editingEmail = false;
  confirmingEmailChange = false;

  editUsername!: string;
  editFirstName!: string;
  editLastName!: string;
  editEmail!: string;
  confirmationCode!: string;

  currentPassword!: string;
  newPassword!: string;
  confirmPassword!: string;

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchUserDetails();
  }

  fetchUserDetails(): void {
    const userId = this.authService.getUserId();
    if(userId){
      this.userService.getUserById(userId).subscribe((data: any) => {
        this.user = data;
        this.editUsername = data.username;
        this.editFirstName = data.firstName;
        this.editLastName = data.lastName;
        this.editEmail = data.email;
      });
    } 
  }

  toggleEdit(field: string): void {
    switch(field) {
      case 'username':
        this.editingUsername = !this.editingUsername;
        if (!this.editingUsername) this.saveChanges('username');
        break;
      case 'firstName':
        this.editingFirstName = !this.editingFirstName;
        if (!this.editingFirstName) this.saveChanges('firstName');
        break;
      case 'lastName':
        this.editingLastName = !this.editingLastName;
        if (!this.editingLastName) this.saveChanges('lastName');
        break;
      case 'email':
        this.editingEmail = !this.editingEmail;
        break;
    }
  }

  saveChanges(field: string): void {
    const updatedUser = { ...this.user };
    switch(field) {
      case 'username':
        updatedUser.username = this.editUsername;
        break;
      case 'firstName':
        updatedUser.firstName = this.editFirstName;
        break;
      case 'lastName':
        updatedUser.lastName = this.editLastName;
        break;
    }
    // this.userService.updateUser(updatedUser).subscribe((data: any) => {
    //   this.user = data;
    // });
  }

  confirmEmailChange(): void {
    this.confirmingEmailChange = true;
    this.toggleEdit('email');
  }

  finalizeEmailChange(): void {
    // this.userService.confirmEmailChange(this.user.id, this.confirmationCode).subscribe((data: any) => {
    //   this.user = data;
    //   this.confirmingEmailChange = false;
    // });
  }

  changePassword(): void {
    if (this.newPassword === this.confirmPassword) {
      // this.userService.changePassword(this.user.id, this.currentPassword, this.newPassword).subscribe(() => {
      //   alert('Password changed successfully!');
      // });
    } else {
      alert('New password and confirm password do not match.');
    }
  }
}
