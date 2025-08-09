import { Routes } from "@angular/router";

//components - Agent
import { AgentDashboard } from "./agent-dashboard/agent-dashboard";
import { AgentProfile } from "./agent-profile/agent-profile";
import { AgentMessage } from "./agent-message/agent-message";
import { AgentFaq } from "./agent-faq/agent-faq";
import { AgentTimeline } from "../components/timeline/timeline";
import { AboutUs } from "../components/about-us/about-us";
import { ChartJs } from "../components/chart-js/chart-js";
import { AddProject } from "./add-project/add-project";
import { Projectlist } from "../components/projectlist/projectlist";
import { AgentInbox } from "./agent-inbox/agent-inbox";

export const AGENT_ROUTES : Routes= [
    {
        path: '',
        children: [
            { path: 'dashboard', component: AgentDashboard },
            { path: 'profile', component: AgentProfile },
            { path: 'message', component: AgentMessage },
            { path: 'faq', component: AgentFaq },
            { path: 'timeline', component: AgentTimeline},
            { path: 'aboutus', component: AboutUs },
            { path: 'chartjs', component: ChartJs },
            { path: 'add-project', component: AddProject },
            { path: 'project-list', component: Projectlist },
            { path: 'inbox', component: AgentInbox }
        ]
    }
];