import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { PasswordresetComponent } from './pages/auth/passwordreset/passwordreset.component';
import { Problem } from './pages/dashboard/dashboard.component';
import { ProblemComponent } from './pages/problem/problem.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'analytics',
        component: AnalyticsComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'passwordreset',
        component: PasswordresetComponent
    },
    {
        path: 'problem/:id',
        component: ProblemComponent
    },
];
