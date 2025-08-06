import { NgClass } from '@angular/common';
import { Component, ɵsetClassDebugInfo } from '@angular/core';

@Component({
  selector: 'app-agent-timeline',
  // imports: [NgClass],
  templateUrl: './timeline.html',
  styleUrl: './timeline.css'
})
export class AgentTimeline {

  timelineList = [
    {
      cardHead: 'Achievement Beta 2',
      cardBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra varius quam sit amet vulputate. Quisque mauris augue,',
      date: '19 Oct 2017',
      count: 19,
      className: 'timeline-wrapper-warning timeline-inverted d-flex',
    },
    {
      cardHead: 'Achievement 4 Beta 1',
      cardBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra varius quam sit amet vulputate. Quisque mauris augue,',
      date: '10th Aug 2017',
      count: 19,
      className: 'timeline-wrapper-danger d-flex'
    },
    {
      cardHead: 'Achievement 3 Beta 1',
      cardBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra varius quam sit amet vulputate. Quisque mauris augue,',
      date: '10th Aug 2017',
      count: 19,
      className: 'timeline-wrapper-success timeline-inverted d-flex'
    },
    {
      cardHead: 'Achievement 3 Beta 1',
      cardBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra varius quam sit amet vulputate. Quisque mauris augue,',
      date: '10th Aug 2017',
      count: 19,
      className: 'timeline-wrapper-info d-flex'
    },
    {
      cardHead: 'Achievement 3 Beta 1',
      cardBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra varius quam sit amet vulputate. Quisque mauris augue,',
      date: '10th Aug 2017',
      count: 19,
      className: 'timeline-wrapper-warning timeline-inverted d-flex'
    },
    {
      cardHead: 'Achievement 3 Beta 1',
      cardBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra varius quam sit amet vulputate. Quisque mauris augue,',
      date: '10th Aug 2017',
      count: 19,
      className: 'timeline-wrapper-danger d-flex'
    },
  ]

}
