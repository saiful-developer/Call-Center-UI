import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentProfileEdit } from './agent-profile-edit';

describe('AgentProfileEdit', () => {
  let component: AgentProfileEdit;
  let fixture: ComponentFixture<AgentProfileEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentProfileEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentProfileEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
