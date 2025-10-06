import { Injectable } from '@angular/core';
import { io, Socket } from "socket.io-client";


export interface IncomingMessage {
  room: string;
  message: string;
  sender: string;
  supervisorId: string,
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000'); //connect to server
  }

  joinCampaings(campaings: string[]) {
    this.socket.emit('joinCampaigns', campaings)
  }

  // broadcast message - supervisor
  sendMessage(room: string, message: string, name: string) {
    this.socket.emit('supervisorMessage', { room, message, name });
  }

  //reply to specific supervisor
  replyToSupervisor(supervisorId: string, message: string, name: string) {
    this.socket.emit('agentReply', { supervisorId, message, name });
  }



  //listen for message - agent
  onMessage(callback: (msg: IncomingMessage) => void) {
    this.socket.on("message", callback);
  }




  // which route the supervisor is on sent to the socket server
  emitSupervisorRoute(route: string) {
    this.socket.emit('supervisorRoute', route);
  }

  // listen to continuous status messages
  onContinousMessage(callback: (msg: string) => void) {
    this.socket.on('continousMessage', callback);
  }

  // stop listening to status messages
  offContinousMessage(callback: (msg: string) => void) {
    this.socket.off('continousMessage', callback);
  }

}
