import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentContact } from './agent-contact';

describe('AgentContact', () => {
  let component: AgentContact;
  let fixture: ComponentFixture<AgentContact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentContact]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentContact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
