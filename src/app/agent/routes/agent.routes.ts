import { Routes } from "@angular/router";

//components - Agent
import { AgentDashboard } from "../dashboard/agent-dashboard";
import { AgentProfile } from "../pages/profile/agent-profile";
import { AgentMessage } from "../pages/message/agent-message";
import { AgentFaq } from "../pages/faq/agent-faq";
import { AgentTimeline } from "../pages/timeline/timeline";
import { AboutUs } from "../pages/about-us/about-us";
import { ChartJs } from "../reports/chart-js/chart-js";
import { AddProject } from "../pages/add-project/add-project";
import { Incoming } from "../reports/incoming/incoming";
import { AgentInbox } from "../pages/inbox/agent-inbox";
import { Settings } from "../pages/settings/settings";
import { AgentProfileEdit } from "../pages/profile-edit/agent-profile-edit";
import { MultipleForms } from "../pages/multiple-forms/multiple-forms";
import { OutgoingReports } from "../reports/outgoing/outgoing-reports";
import { BreakReports } from "../reports/break/break-reports";
import { LoginReport } from "../reports/login/login-report";
import { AbandonReports } from "../reports/abandon/abandon-reports";
import { RNARepots } from "../reports/rna-repots/rna-repots";
import { AbandonCallsLive } from "../live/abandon-calls/abandon-calls-live";
import { AgentStatusLive } from "../live/status/agent-status-live";
import { ExtensionStatusLive } from "../live/extension-status/extension-status-live";
import { TrunkStatusLive } from "../live/trunk-status-live/trunk-status-live";
import { WaitingCallsLive } from "../live/waiting-calls/waiting-calls-live";
import { AddressBook } from "../reports/address-book/address-book";
import { AgentContact } from "../pages/contact/agent-contact";
import { CampainStatus } from "../live/campain-status/campain-status";
import { AgentDetail } from "../reports/agent-detail/agent-detail";
import { TransferCall } from "../reports/transfer-call/transfer-call";
import { Deposition } from "../reports/deposition/deposition";
import { AgentSummary } from "../reports/agent-summary/agent-summary";
import { CallBack } from "../reports/call-back/call-back";
import { ActiveCalls } from "../reports/active-calls/active-calls";
//agent layout
import { AgentLayout } from "../layouts/agent-layout/agent-layout";
import { TestWebsocketAgent } from "../shared/test-websocket-agent/test-websocket-agent";



export const AGENT_ROUTES: Routes = [
    {
        path: '',
        component: AgentLayout,
        children: [
            { path: 'dashboard', component: AgentDashboard, data: { breadcrumb: 'agent/dashboard' } },
            { path: 'profile', component: AgentProfile, data: { breadcrumb: 'agent/profile/view' } },
            { path: 'edit-profile', component: AgentProfileEdit, data: { breadcrumb: 'agent/profile/edit' } },
            { path: 'message', component: AgentMessage, data: { breadcrumb: 'agent/message/sennd' } },
            { path: 'inbox', component: AgentInbox, data: { breadcrumb: 'agent/message/inbox' } },
            { path: 'faq', component: AgentFaq, data: { breadcrumb: 'agent/faq' } },
            { path: 'timeline', component: AgentTimeline, data: { breadcrumb: 'agent/about/timeline' } },
            { path: 'aboutus', component: AboutUs, data: { breadcrumb: 'agent/about/about us' } },
            { path: 'chartjs', component: ChartJs, data: { breadcrumb: 'agent/charts/chartjs' } },
            { path: 'add-project', component: AddProject, data: { breadcrumb: 'agent/project/add project' } },
            { path: 'multiple-forms', component: MultipleForms, data: { breadcrumb: 'agent/project/multiple-forms' } },
            { path: 'reports/incoming', component: Incoming, data: { breadcrumb: 'agent/reports/incoming' } },//projectlist is incomming reports
            { path: 'settings', component: Settings, data: { breadcrumb: 'agent/settings' } },
            { path: 'reports/outgoing', component: OutgoingReports, data: { breadcrumb: 'agent/reports/outgoing' } },
            { path: 'reports/agent-detail', component: AgentDetail, data: { breadcrumb: 'agent/reports/agent detail' } },
            { path: 'reports/break', component: BreakReports, data: { breadcrumb: 'agent/reports/break' } },
            { path: 'reports/login', component: LoginReport, data: { breadcrumb: 'agent/reports/login' } },
            { path: 'reports/abandon', component: AbandonReports, data: { breadcrumb: 'agent/reports/abandon' } },
            { path: 'reports/rna', component: RNARepots, data: { breadcrumb: 'agent/reports/rna' } },
            { path: 'reports/transfer-call', component: TransferCall, data: { breadcrumb: 'agent/reports/transfer call' } },
            { path: 'reports/deposition', component: Deposition, data: { breadcrumb: 'agent/reports/deposition' } },
            { path: 'reports/agent-summary', component: AgentSummary, data: { breadcrumb: 'agent/reports/agent summary' } },
            { path: 'reports/call-back', component: CallBack, data: { breadcrumb: 'agent/reports/call-back' } },
            { path: 'live/abandon-call', component: AbandonCallsLive, data: { breadcrumb: 'agent/live/abandon calls' } },
            { path: 'live/agent-status', component: AgentStatusLive, data: { breadcrumb: 'agent/live/agent status' } },
            { path: 'live/campain-status', component: CampainStatus, data: { breadcrumb: 'agent/campain status' } },
            { path: 'live/extension-status', component: ExtensionStatusLive, data: { breadcrumb: 'agent/live/extension status' } },
            { path: 'live/trunk-status', component: TrunkStatusLive, data: { breadcrumb: 'agent/live/trunk status' } },
            { path: 'live/waiting-calls', component: WaitingCallsLive, data: { breadcrumb: 'agent/live/waiting calls' } },
            { path: 'live/active-calls', component: ActiveCalls, data: { breadcrumb: 'agent/live/active-calls' } },
            { path: 'address-book', component: AddressBook, data: { breadcrumb: 'agent/address book' } },
            { path: 'contact', component: AgentContact, data: { breadcrumb: 'agent/contact' } },
            { path: 'test', component: TestWebsocketAgent },
            { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    }
];