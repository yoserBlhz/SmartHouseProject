import { Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { SignupComponent } from '../components/signup/signup.component';
import { WelcomePageComponent } from '../components/welcome-page/welcome-page.component';
import { TestComponent } from '../components/test/test.component';
import { DevicesNavSidComponent } from '../components/devices-nav-sid/devices-nav-sid.component';
import { GeneralDashboardComponent } from '../components/general-dashboard/general-dashboard.component';
import { SigninComponent } from '../components/signin/signin.component';
import { UsersComponent } from '../components/users/users.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent},
    {path: 'home', component: DashboardComponent},
    {path: '',component: WelcomePageComponent},
    {path: 'signup',component: SignupComponent},

    {path:'devices',component:TestComponent},
    {path:'test',component:DevicesNavSidComponent},
    {path:'gendash',component:GeneralDashboardComponent},

    {path: 'login',component: SigninComponent},
    {path: 'users',component:UsersComponent},



];
