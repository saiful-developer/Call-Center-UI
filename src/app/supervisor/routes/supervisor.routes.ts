import { Routes } from "@angular/router";
//components - supervisor
import { SupervisorDashbord } from "../dashbord/supervisor-dashbord";
import { SupervisorProfile } from "../pages/supervisor-profile/supervisor-profile";
import { SupervisorMessage } from "../pages/supervisor-message/supervisor-message";
 
export const Supervisor_ROUTES: Routes = [
    {
        path: '',
        children: [
            { path: 'dashboard', component: SupervisorDashbord },
            { path: 'profile', component: SupervisorProfile },
            { path: 'message', component: SupervisorMessage }
        ]
    }
];