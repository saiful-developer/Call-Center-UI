import { Routes } from "@angular/router";
//components
import { AdminDashboard } from "./admin-dashboard/admin-dashboard";
import { AdminProfile } from "./admin-profile/admin-profile";
import { AdminMessage } from "./admin-message/admin-message";

import { UserList } from "./admin-dashboard/user-list/user-list";
import { AddUser } from "./admin-dashboard/add-user/add-user";
import { Message } from "./admin-dashboard/message/message";

export const   ADMIN_ROUTES: Routes = [
    {
        path: '',
        children: [
            {path: 'dashboard', component: AdminDashboard},

                {path: 'add-user', component: AddUser},
                {path: 'user-list', component: UserList},
                {path: 'all-message', component: Message},

            {path: 'profile', component: AdminProfile},
            {path: 'message', component: AdminMessage},
        ]
    }
];