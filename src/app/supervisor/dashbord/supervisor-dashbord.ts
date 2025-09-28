import { Component } from '@angular/core';
import { AgentDashboardRow2 } from '../../agent/dashboard/agent-dashboard-row2/agent-dashboard-row2';
import { ApiService } from '../services/api.service';
// components

interface CallCenterStats {
  enterqueue: number | null;
  connect: number | null;
  abandon: number | null;
  duration: number | null;
  cdr_duration: number | null;
  cdr_billsec: number | null;
  queue_duration: number | null;
  connect_ring_time: number | null;
  completecaller: number | null;
  completeagent: number | null;
  AnsQueueDuration: number | null;
  AbandonQueueDuration: number | null;
  allrna: number | null;
  rna: number | null;
  enterqueue_time: string | null;
  connect_time: string | null;
  maxTalkTime: number | null;
  maxQueueTime: number | null;
  maxRingTime: number | null;
  ServiceLevel: number | null;
}



@Component({
  selector: 'app-supervisor-dashbord',
  imports: [AgentDashboardRow2],
  templateUrl: './supervisor-dashbord.html',
  styleUrl: './supervisor-dashbord.css'
})
export class SupervisorDashbord {
  secondsPassed = 0;
  houres = 0;
  minutes = 0;
  seconds = 0;
  currentTime: string = '';
  clockInterval: any;

  agent = '';
  campaignList: string[] = [];
  currentDate: string = new Date().toISOString().split("T")[0];
  incomingSummaryList: CallCenterStats[] = [{
    enterqueue: null,
    connect: null,
    abandon: null,
    duration: null,
    cdr_duration: null,
    cdr_billsec: null,
    queue_duration: null,
    connect_ring_time: null,
    completecaller: null,
    completeagent: null,
    AnsQueueDuration: null,
    AbandonQueueDuration: null,
    allrna: null,
    rna: null,
    enterqueue_time: null,
    connect_time: null,
    maxTalkTime: null,
    maxQueueTime: null,
    maxRingTime: null,
    ServiceLevel: null
  }];


  constructor(private api: ApiService) { }

  ngOnInit() {
    this.campainListFromSesson();
    this.getIncomingSummary();


    this.updateCurrentTime();
    this.clockInterval = setInterval(() => {
      this.updateCurrentTime();
    }, 1000);




  }

  getIncomingSummary() {
    this.api.incomingSummary(this.agent, this.campaignList, this.currentDate).subscribe({
      next: (res) => {
        console.log(res);

      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  updateCurrentTime() {
    const now = new Date();
    let hrs = now.getHours();
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');

    const ampm = hrs >= 12 ? 'PM' : 'AM';
    hrs = hrs % 12;
    hrs = hrs ? hrs : 12; // 0 should be 12 in 12h format

    this.currentTime = `${hrs}h : ${mins}m : ${secs}s ${ampm}`;
  }


  ngOnDestroy() {
    clearInterval(this.clockInterval);
  }

  // get campain form sesson
  campainListFromSesson() {
    const jsonString = sessionStorage.getItem('user')

    if (jsonString) {
      const obj = JSON.parse(jsonString);
      this.campaignList = obj.campaigns;
    }
  }

  formateAgentStatusData(res: any) {

    if (res.success === "YES" && res.data) {
      const item: CallCenterStats = {
        enterqueue: res.data.enterqueue || 0,
        connect: res.data.connect || 0,
        abandon: res.data.abandon || 0,
        duration: res.data.duration || 0,
        cdr_duration: res.data.cdr_duration || 0,
        cdr_billsec: res.data.cdr_billsec || 0,
        queue_duration: res.data.queue_duration || 0,
        connect_ring_time: res.data.connect_ring_time || 0,
        completecaller: res.data.completecaller || 0,
        completeagent: res.data.completeagent || 0,
        AnsQueueDuration: res.data.AnsQueueDuration || 0,
        AbandonQueueDuration: res.data.AbandonQueueDuration || 0,
        allrna: res.data.allrna || 0,
        rna: res.data.rna || 0,
        enterqueue_time: res.data.enterqueue_time || "00:00:00",
        connect_time: res.data.connect_time || "00:00:00",
        maxTalkTime: res.data.maxTalkTime || 0,
        maxQueueTime: res.data.maxQueueTime || 0,
        maxRingTime: res.data.maxRingTime || 0,
        ServiceLevel: res.data.ServiceLevel || 0,
      };

      this.incomingSummaryList = [item]; // wrap in array if your table expects an array
    } else {
      this.incomingSummaryList = [];
    }


  }

}
