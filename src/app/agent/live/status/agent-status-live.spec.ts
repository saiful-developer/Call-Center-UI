import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentStatusLive } from './agent-status-live';

describe('AgentStatusLive', () => {
  let component: AgentStatusLive;
  let fixture: ComponentFixture<AgentStatusLive>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentStatusLive]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentStatusLive);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
