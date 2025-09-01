import { Routes } from "@angular/router";

//components - Agent
import { AgentDashboard } from "./agent-dashboard/agent-dashboard";
import { AgentProfile } from "./agent-profile/agent-profile";
import { AgentMessage } from "./agent-message/agent-message";
import { AgentFaq } from "./agent-faq/agent-faq";
import { AgentTimeline } from "./timeline/timeline";
import { AboutUs } from "./about-us/about-us";
import { ChartJs } from "../components/chart-js/chart-js";
import { AddProject } from "./add-project/add-project";
import { Projectlist } from "../components/projectlist/projectlist";
import { AgentInbox } from "./agent-inbox/agent-inbox";
import { Settings } from "./settings/settings";
import { AgentProfileEdit } from "./agent-profile-edit/agent-profile-edit";
import { MultipleForms } from "./multiple-forms/multiple-forms";
import { OutgoingReports } from "../components/outgoing-reports/outgoing-reports";
import { BreakReports } from "../components/break-reports/break-reports";
import { LoginReport } from "../components/login-report/login-report";
import { AbandonReports } from "../components/abandon-reports/abandon-reports";
import { RNARepots } from "../components/rna-repots/rna-repots";
import { AbandonCallsLive } from "../components/abandon-calls-live/abandon-calls-live";
import { AgentStatusLive } from "../components/agent-status-live/agent-status-live";
import { ExtensionStatusLive } from "../components/extension-status-live/extension-status-live";
import { TrunkStatusLive } from "../components/trunk-status-live/trunk-status-live";
import { WaitingCallsLive } from "../components/waiting-calls-live/waiting-calls-live";

export const AGENT_ROUTES: Routes = [
    {
        path: '',
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
            { path: 'reports/incoming', component: Projectlist, data: { breadcrumb: 'agent/reports/incoming' } },//projectlist is incomming reports
            { path: 'settings', component: Settings, data: { breadcrumb: 'agent/settings' } },
            { path: 'reports/outgoing', component: OutgoingReports, data: { breadcrumb: 'agent/reports/outgoing' } },
            { path: 'reports/break', component: BreakReports, data: { breadcrumb: 'agent/reports/break' } },
            { path: 'reports/login', component: LoginReport, data: { breadcrumb: 'agent/reports/login' } },
            { path: 'reports/abandon', component: AbandonReports, data: { breadcrumb: 'agent/reports/abandon' } },
            { path: 'reports/rna', component: RNARepots, data: { breadcrumb: 'agent/reports/rna' } },
            { path: 'live/abandon-call', component: AbandonCallsLive, data: { breadcrumb: 'agent/live/abandon calls' } },
            { path: 'live/agent-status', component: AgentStatusLive, data: { breadcrumb: 'agent/live/agent status' } },
            { path: 'live/extension-status', component: ExtensionStatusLive, data: { breadcrumb: 'agent/live/extension status' } },
            { path: 'live/trunk-status', component: TrunkStatusLive, data: { breadcrumb: 'agent/live/trunk status' } },
            { path: 'live/waiting-calls', component: WaitingCallsLive, data: { breadcrumb: 'agent/live/waiting calls' } }
        ]
    }
];