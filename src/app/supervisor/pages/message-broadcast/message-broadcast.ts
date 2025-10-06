import { Component, OnInit } from '@angular/core';
import { PageHeader } from '../../shared/page-header/page-header';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../../../services/socket.service';


@Component({
  selector: 'app-message-broadcast',
  imports: [PageHeader, CommonModule, FormsModule],
  templateUrl: './message-broadcast.html',
  styleUrl: './message-broadcast.css'
})
export class MessageBroadcast implements OnInit {

  campaignList: string[] = [];
  supervisorName: string = '';
  selectedCampaign: string = '';
  message: string = '';

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {

    this.getCampainListAndName();

  }

  sendMessage() {

    if (this.selectedCampaign && this.message) {
      this.socketService.sendMessage(this.selectedCampaign, this.message, this.supervisorName);
      
      console.log(`Sent message to ${this.selectedCampaign}: ${this.message}`);
      this.message = ''; // clear input after sending
      this.selectedCampaign = '';
    }

  }

  getCampainListAndName(): void {
    const user = sessionStorage.getItem('user');

    if (user) {
      const parsedUser = JSON.parse(user);
      this.campaignList = parsedUser.campaigns;
      this.supervisorName = parsedUser.loginid;
    }
  }

}
