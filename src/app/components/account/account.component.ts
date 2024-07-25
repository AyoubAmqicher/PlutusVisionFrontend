import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'; // Import your user service

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: any; // Replace with your user model

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  //   this.userService.getUserDetails().subscribe(data => {
  //     this.user = data;
  //   });
  // }
  }
}
