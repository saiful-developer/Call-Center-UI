import { Routes } from "@angular/router";
import { SupervisorLayout } from "../layouts/supervisor-layout/supervisor-layout";
import { SupervisorDashbord } from "../dashbord/supervisor-dashbord";
import { SupervisorProfile } from "../pages/supervisor-profile/supervisor-profile";
import { SupervisorMessage } from "../pages/supervisor-message/supervisor-message";
import { Incoming } from "../reports/incoming/incoming";
import { Outgoing } from "../reports/outgoing/outgoing";
import { Break } from "../reports/break/break";
import { Login } from "../reports/login/login";
import { Abandon } from "../reports/abandon/abandon";
import { Rna } from "../reports/rna/rna";
import { CampaignStatus } from "../live/campaign-status/campaign-status";
import { Extension } from "../live/extension/extension";
import { AgentStatus } from "../live/agent-status/agent-status";
import { TrunkStatus } from "../live/trunk-status/trunk-status";
import { CallWaiting } from "../live/call-waiting/call-waiting";
import { AddressBook } from "../reports/address-book/address-book";
import { TestWebsocketSupervisor } from "../shared/test-websocket-supervisor/test-websocket-supervisor";
import { Disposition } from "../reports/disposition/disposition";
import { MessageBroadcast } from "../pages/message-broadcast/message-broadcast";

export const Supervisor_ROUTES: Routes = [
    {
        path: '',
        component: SupervisorLayout,
        children: [
            { path: 'dashboard', component: SupervisorDashbord, data: { breadcrumb: 'supervisor/dashboard' } },
            { path: 'profile', component: SupervisorProfile, data: { breadcrumb: 'supervisor/profile' } },
            { path: 'message', component: SupervisorMessage, data: { breadcrumb: 'supervisor/message' } },
            //reports
            { path: 'reports/incoming', component: Incoming, data: { breadcrumb: 'supervisor/report/incoming' } },
            { path: 'reports/outgoing', component: Outgoing, data: { breadcrumb: 'supervisor/report/outgoing' } },
            { path: 'reports/break', component: Break, data: { breadcrumb: 'supervisor/report/break' } },
            { path: 'reports/login', component: Login, data: { breadcrumb: 'supervisor/report/login' } },
            { path: 'reports/abandon', component: Abandon, data: { breadcrumb: 'supervisor/report/abandon' } },
            { path: 'reports/rna', component: Rna, data: { breadcrumb: 'supervisor/report/rna' } },
            { path: 'reports/disposition', component: Disposition, data: { breadcrumb: 'supervisor/report/disposition' } },
            //live
            { path: 'live/agent-status', component: AgentStatus, data: { breadcrumb: 'supervisor/live/agent status' } },
            { path: 'live/campain-status', component: CampaignStatus, data: { breadcrumb: 'supervisor/live/campain status' } },
            { path: 'live/extension-status', component: Extension, data: { breadcrumb: 'supervisor/live/extension status' } },
            { path: 'live/trunk-status', component: TrunkStatus, data: { breadcrumb: 'supervisor/live/trunk status' } },
            { path: 'live/waiting-calls', component: CallWaiting, data: { breadcrumb: 'supervisor/live/waiting calls' } },

            { path: 'address-book', component: AddressBook, data: { breadcrumb: 'supervisor/address book' } },

            { path: 'test', component: TestWebsocketSupervisor },

            { path: 'broadcast', component: MessageBroadcast, data: { breadcrumb: 'supervisor/broadcast' } },

            { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    }
];

//data: { breadcrumb: 'agent/dashboard'