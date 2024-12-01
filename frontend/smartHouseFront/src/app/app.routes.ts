import { Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { SignupComponent } from '../components/signup/signup.component';
import { WelcomePageComponent } from '../components/welcome-page/welcome-page.component';
import { SigninComponent } from '../components/signin/signin.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent},
    {path: 'home', component: DashboardComponent},
    {path: '',component: WelcomePageComponent},
    {path: 'signup',component: SignupComponent},
    {path: 'login',component: SigninComponent}


];
