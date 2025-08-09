import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message-details',
  imports: [],
  templateUrl: './message-details.html',
  styleUrl: './message-details.css'
})
export class MessageDetails {
  @Input() message: any;
}
