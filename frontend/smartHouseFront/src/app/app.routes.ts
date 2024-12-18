import { Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { SignupComponent } from '../components/signup/signup.component';
import { WelcomePageComponent } from '../components/welcome-page/welcome-page.component';
import { TestComponent } from '../components/test/test.component';
import { SigninComponent } from '../components/signin/signin.component';
import { UsersComponent } from '../components/users/users.component';
import { ReportComponent } from '../components/report/report.component';
import { JoinhouseComponent } from '../components/joinhouse/joinhouse.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent},
    {path: 'home', component: DashboardComponent},
    {path: '',component: WelcomePageComponent},
    {path: 'signup',component: SignupComponent},

    {path:'devices',component:TestComponent},

    {path: 'login',component: SigninComponent},
    {path: 'users',component:UsersComponent},
    {path: 'logout',component: WelcomePageComponent},
    {path: 'reports',component: ReportComponent},
    {path: 'join', component:JoinhouseComponent}





];
