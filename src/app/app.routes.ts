import { Routes } from '@angular/router';
import { Login } from './shared/login/login';
import { authGuard } from './auth/guard/auth-guard';
import { guestGuardGuard } from './auth/guard/guest-guard-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    //Admin User
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES),
        canActivate: [authGuard],
        data: {
            role: 'admin'
        }
    },


    // Agents
    {
        path: 'agent',
        loadChildren: () => import('./agent/routes/agent.routes').then(m => m.AGENT_ROUTES),
        canActivate: [authGuard],
        data: {
            role: 'agent'
        }
    },

    // Supervisor
    {
        path: 'supervisor',
        loadChildren: () => import('./supervisor/routes/supervisor.routes').then(m => m.Supervisor_ROUTES),
        canActivate: [authGuard],
        data: {
            role: 'supervisor'
        }
    },

    {
        path: 'login',
        component: Login,
        canActivate: [guestGuardGuard]
    },

    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
    