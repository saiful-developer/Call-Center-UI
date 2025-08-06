import { Routes } from '@angular/router';


import { SupervisorDashbord } from './user-supervisor/supervisor-dashbord/supervisor-dashbord';
import { SupervisorProfile } from './user-supervisor/supervisor-profile/supervisor-profile';
import { SupervisorMessage } from './user-supervisor/supervisor-message/supervisor-message';


export const routes: Routes = [
    { path: '', redirectTo: 'agent/dashboard', pathMatch: 'full' },

    //Admin User
    {
        path: 'admin',
        loadChildren: () => import('./user-admin/admin.routes').then(m => m.ADMIN_ROUTES)
    },


    // Agents
    {
        path: 'agent',
        loadChildren: () => import('./user-agent/agent.routes').then(m => m.AGENT_ROUTES)
    },

    // Supervisor
    {
        path: 'supervisor', 
        loadChildren: () => import('./user-supervisor/supervisor.routes').then(m => m.Supervisor_ROUTES)
    }
];
