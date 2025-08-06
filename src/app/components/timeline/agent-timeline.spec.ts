import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentTimeline } from './timeline';

describe('AgentTimeline', () => {
  let component: AgentTimeline;
  let fixture: ComponentFixture<AgentTimeline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentTimeline]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentTimeline);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
