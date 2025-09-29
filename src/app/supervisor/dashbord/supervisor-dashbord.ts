import { Component } from '@angular/core';
import { AgentDashboardRow2 } from '../../agent/dashboard/agent-dashboard-row2/agent-dashboard-row2';
import { ApiService } from '../services/api.service';

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
  styleUrls: ['./supervisor-dashbord.css']
})
export class SupervisorDashbord {
  currentTime: string = '';
  clockInterval: any;

  agent = '';
  campaignList: string[] = [];
  currentDate: string = new Date().toISOString().split("T")[0];
  incomingSummaryList: CallCenterStats[] = [];

  // Calculated fields
  answerCallRatio: number = 0;
  abandonCallRatio: number = 0;
  serviceLevel: number = 0;
  oldestCall: string = "00:00:00";

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.campainListFromSesson();
    this.getIncomingSummary();

    this.updateCurrentTime();
    this.clockInterval = setInterval(() => {
      this.updateCurrentTime();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.clockInterval);
  }

  updateCurrentTime() {
    const now = new Date();
    let hrs = now.getHours();
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');

    const ampm = hrs >= 12 ? 'PM' : 'AM';
    hrs = hrs % 12;
    hrs = hrs ? hrs : 12;

    this.currentTime = `${hrs}h : ${mins}m : ${secs}s ${ampm}`;
  }

  campainListFromSesson() {
    const jsonString = sessionStorage.getItem('user');
    if (jsonString) {
      const obj = JSON.parse(jsonString);
      this.campaignList = obj.campaigns;
    }
  }

  getIncomingSummary() {
    this.api.incomingSummary(this.agent, this.campaignList, this.currentDate).subscribe({
      next: (res) => this.formateAgentStatusData(res),
      error: (err) => console.log(err)
    });
  }

  formateAgentStatusData(res: any) {
    if (res.success === "YES" && res.data) {
      const item: CallCenterStats = {
        enterqueue: Number(res.data.enterqueue) || 0,
        connect: Number(res.data.connect) || 0,
        abandon: Number(res.data.abandon) || 0,
        duration: Number(res.data.duration) || 0,
        cdr_duration: Number(res.data.cdr_duration) || 0,
        cdr_billsec: Number(res.data.cdr_billsec) || 0,
        queue_duration: Number(res.data.queue_duration) || 0,
        connect_ring_time: Number(res.data.connect_ring_time) || 0,
        completecaller: Number(res.data.completecaller) || 0,
        completeagent: Number(res.data.completeagent) || 0,
        AnsQueueDuration: Number(res.data.AnsQueueDuration) || 0,
        AbandonQueueDuration: Number(res.data.AbandonQueueDuration) || 0,
        allrna: Number(res.data.allrna) || 0,
        rna: Number(res.data.rna) || 0,
        enterqueue_time: res.data.enterqueue_time || "00:00:00",
        connect_time: res.data.connect_time || "00:00:00",
        maxTalkTime: Number(res.data.maxTalkTime) || 0,
        maxQueueTime: Number(res.data.maxQueueTime) || 0,
        maxRingTime: Number(res.data.maxRingTime) || 0,
        ServiceLevel: Number(res.data.ServiceLevel) || 0,
      };

      this.incomingSummaryList = [item];

      const summary = this.incomingSummaryList[0];
      const threshold = 20;

      this.answerCallRatio = summary.enterqueue
        ? +((summary.connect! / summary.enterqueue!) * 100).toFixed(2)
        : 0;

      this.abandonCallRatio = summary.enterqueue
        ? +((summary.abandon! / summary.enterqueue!) * 100).toFixed(2)
        : 0;

      this.serviceLevel = summary.connect
        ? (summary.ServiceLevel! / summary.connect!) * 100
        : 0;



      this.oldestCall = this.getOldestCall(summary.enterqueue_time!);
    } else {
      this.incomingSummaryList = [];
      this.answerCallRatio = 0;
      this.abandonCallRatio = 0;
      this.serviceLevel = 0;
      this.oldestCall = "00:00:00";
    }
  }

  convertSecondsToMMSS(input: number | string | null | undefined): string {
    if (!input) return '00:00';
    const seconds = typeof input === 'string' ? parseInt(input, 10) : input;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }



  getOldestCall(enterqueueTime: string): string {
    const entered = new Date(enterqueueTime).getTime();
    const now = new Date().getTime();

    if (isNaN(entered)) return "Invalid";

    let diff = Math.floor((now - entered) / 1000); // seconds
    const h = Math.floor(diff / 3600);
    const m = Math.floor((diff % 3600) / 60);
    const s = diff % 60;

    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  getServiceLevel(connect: number, avgQueueDuration: number, threshold = 20): string {
    if (connect === 0) return "0.00%";

    const answeredWithin = avgQueueDuration <= threshold ? connect : 0;
    const percent = (answeredWithin / connect) * 100;

    return percent.toFixed(2) + "%";
  }
}
