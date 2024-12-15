// import { Component, OnInit } from '@angular/core';
// import { NavbarComponent } from "../navbar/navbar.component";
// import { SidebarComponent } from "../sidebar/sidebar.component";
// import { CommonModule, NgFor } from '@angular/common';
// import { AuthService } from '../../Services/auth.service';
// import { HttpClientModule } from '@angular/common/http';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { UsersService } from '../../Services/users.service';

// @Component({
//   selector: 'app-users',
//   standalone: true,
//   imports: [NavbarComponent, SidebarComponent,CommonModule,HttpClientModule,FormsModule,ReactiveFormsModule,],
//   providers: [AuthService,UsersService],  
//   templateUrl: './users.component.html',
//   styleUrl: './users.component.scss'
// })
// export class UsersComponent  implements OnInit {
//    userForm!: FormGroup;
//     userInfo: { code: string, username: string } | null = null;
// constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private usersService: UsersService,
//     private router: Router
//   ) {}

//  initForm() {
//       this.userForm = this.fb.group({
//         name: ['', Validators.required]
//          });
//       }
    
//       ngOnInit() {
//         this.initForm();
//         this.authService.userInfo$.subscribe(userInfo => {
//           this.userInfo = userInfo;
//           if (!userInfo) {
//             this.router.navigate(['/login']);
//           }
//         });
//       }


//       saveUser(){
//         if (this.userForm.valid && this.userInfo) {
//           const formValue = this.userForm.value;
//           const userData={
//             name:formValue.name
//           };
//           this.usersService.addUser(this.userInfo.code, this.userInfo.username, userData).subscribe({
//             next: (response) => {
//               console.log('User added successfully', response);
//               document.getElementById('addUserModal')?.classList.remove('show');
//               document.body.classList.remove('modal-open');
//               document.querySelector('.modal-backdrop')?.remove();
//             },
//             error: (error) => {
//               console.error('Error adding user', error);
//             }
//           });        }

//       }








// }


import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../Services/users.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [AuthService, UsersService],  
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userForm!: FormGroup;
  editForm!: FormGroup;
  userInfo: { code: string, username: string } | null = null;
  users: any[] = [];
  currentEditingUser: any = null;

  @ViewChild('addUserModal') addUserModal!: ElementRef;
  @ViewChild('editUserModal') editUserModal!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private usersService: UsersService,
    private router: Router
  ) {}

  initForm() {
    this.userForm = this.fb.group({
      name: ['', Validators.required]
    });
    this.editForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.initForm();
    this.authService.userInfo$.subscribe(userInfo => {
      this.userInfo = userInfo;
      if (!userInfo) {
        this.router.navigate(['/login']);
      } else {
        this.loadUsers();
      }
    });
  }

  loadUsers() {
    if (this.userInfo) {
      this.usersService.getUsers(this.userInfo.code, this.userInfo.username).subscribe({
        next: (users) => {
          this.users = users;
        },
        error: (error) => {
          console.error('Error loading users', error);
        }
      });
    }
  }

  saveUser() {
    if (this.userForm.valid && this.userInfo) {
      const formValue = this.userForm.value;
      const userData = {
        name: formValue.name
      };
      this.usersService.addUser(this.userInfo.code, this.userInfo.username, userData).subscribe({
        next: (response) => {
          console.log('User added successfully', response);
          document.getElementById('addUserModal')?.classList.remove('show');
          document.body.classList.remove('modal-open');
          document.querySelector('.modal-backdrop')?.remove(); 
          this.loadUsers();
        },
        error: (error) => {
          console.error('Error adding user', error);
        }
      });
    }
  }

  editUser(user: any) {
    this.editForm.patchValue({ name: user.username });
    // Open edit modal
  }

 
  
  saveEditedUser() {
    if (this.editForm.valid && this.userInfo && this.currentEditingUser) {
      const formValue = this.editForm.value;
      const userData = {
        name: formValue.name
      };
      console.log("current id"+this.currentEditingUser._id);
      this.usersService.editUser(this.userInfo.code, this.userInfo.username, this.currentEditingUser._id, userData).subscribe({
        next: (response) => {
          console.log('User edited successfully', response);
          document.getElementById('editUserModal')?.classList.remove('show');
          document.body.classList.remove('modal-open');
          document.querySelector('.modal-backdrop')?.remove();
          this.loadUsers();
          this.currentEditingUser = null;
        },
        error: (error) => {
          console.error('Error editing user', error);
        }
      });
    }
  }

  deleteUser(userId: string) {
    if (this.userInfo) {
      this.usersService.deleteUser(this.userInfo.code, this.userInfo.username, userId).subscribe({
        next: (response) => {
          console.log('User deleted successfully', response);
          this.loadUsers();
        },
        error: (error) => {
          console.error('Error deleting user', error);
        }
      });
    }
  }
}

