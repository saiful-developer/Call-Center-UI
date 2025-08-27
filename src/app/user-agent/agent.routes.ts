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
import { Logout } from "./logout/logout";
import { AgentProfileEdit } from "./agent-profile-edit/agent-profile-edit";
import { MultipleForms } from "./multiple-forms/multiple-forms";

export const AGENT_ROUTES : Routes= [
    {
        path: '',
        children: [
            { path: 'dashboard', component: AgentDashboard, data: { breadcrumb: 'agent/dashboard' } },
            { path: 'profile', component: AgentProfile, data: { breadcrumb: 'agent/profile/view' } },
            { path: 'edit-profile', component: AgentProfileEdit, data: { breadcrumb: 'agent/profile/edit' } },
            { path: 'message', component: AgentMessage, data: { breadcrumb: 'agent/message/sennd' } },
            { path: 'inbox', component: AgentInbox, data: { breadcrumb: 'agent/message/inbox' } },
            { path: 'faq', component: AgentFaq, data: { breadcrumb: 'agent/faq' } },
            { path: 'timeline', component: AgentTimeline, data: { breadcrumb: 'agent/about/timeline' }},
            { path: 'aboutus', component: AboutUs, data: { breadcrumb: 'agent/about/about us' } },
            { path: 'chartjs', component: ChartJs, data: { breadcrumb: 'agent/charts/chartjs' } },
            { path: 'add-project', component: AddProject, data: { breadcrumb: 'agent/project/add project' } },
            { path: 'multiple-forms', component: MultipleForms, data: { breadcrumb: 'agent/project/multiple-forms' } },
            { path: 'project-list', component: Projectlist, data: { breadcrumb: 'agent/project/project list' } },
            { path: 'settings', component: Settings, data: { breadcrumb: 'agent/settings' } },
            { path: 'logout', component: Logout, data: { breadcrumb: 'agent/logout' } },
        ]
    }
];