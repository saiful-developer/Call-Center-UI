import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../../services/api.service';


@Component({
  selector: 'app-agent-deshboard-row0',
  imports: [],
  templateUrl: './agent-deshboard-row0.html',
  styleUrl: './agent-deshboard-row0.css'
})
export class AgentDeshboardRow0 implements OnInit {

  constructor(private apiService: ApiService){}

  ngOnInit(): void {

    // this.loadAgentReport()
    console.log('asdkfjl')
    
  }


  //get all angent reports
  // loadAgentReport () {
  //   this.apiService.reporstsAgent().subscribe({
  //     next: (res) => {
  //       console.log(res)
  //     },
  //     error: (error) => {
  //       console.log(error)
  //       console.log('loadAgentReportasdf')
  //     }
  //   })
  // }

}
