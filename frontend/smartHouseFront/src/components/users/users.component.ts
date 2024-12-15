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
    console.log('Editing user:', user);
    this.currentEditingUser = user;
    this.editForm.patchValue({ name: user.username });
  }

  saveEditedUser() {
    if (this.editForm.valid && this.userInfo && this.currentEditingUser) {
      console.log('Saving edited user:', this.currentEditingUser);
      const formValue = this.editForm.value;
      const userData = {
        name: formValue.name
      };
      this.usersService.editUser(this.userInfo.code, this.userInfo.username, this.currentEditingUser.username, userData).subscribe({
        next: (response) => {
          console.log('User edited successfully', response);
         document.getElementById('editUserModal')?.classList.remove('show');
         document.body.classList.remove('modal-open');
        document.querySelector('.modal-backdrop')?.remove();
          this.loadUsers();
          this.currentEditingUser = null;
          this.editForm.reset();
        },
        error: (error) => {
          console.error('Error editing user', error);
        }
      });
    } else {
      console.error('Invalid form or missing user information');
    }
  }

  deleteUser2(userNom: string) {
    if (this.userInfo && userNom) {
      if (confirm('Are you sure you want to delete this user?')) {
        this.usersService.deleteUser(this.userInfo.code, this.userInfo.username, userNom).subscribe({
          next: (response) => {
            console.log('User deleted successfully', response);
            this.loadUsers();
          },
          error: (error) => {
            console.error('Error deleting user', error);
          }
        });
      }
    } else {
      console.error('Missing user information or user Name');
    }
  }


  userToDelete: string | null = null;

  confirmDelete(userNom: string) {
    this.userToDelete = userNom;
  }

  deleteUser() {
    if (this.userInfo && this.userToDelete) {
      this.usersService.deleteUser(this.userInfo.code, this.userInfo.username, this.userToDelete).subscribe({
        next: (response) => {
          console.log('User deleted successfully', response);
          document.getElementById('deleteUserModal')?.classList.remove('show');
          document.body.classList.remove('modal-open');
         document.querySelector('.modal-backdrop')?.remove();
          this.loadUsers();
          this.userToDelete = null;
        },
        error: (error) => {
          console.error('Error deleting user', error);
        }
      });
    } else {
      console.error('Missing user information or user Name');
    }
  }










}

