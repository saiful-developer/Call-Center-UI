import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentFaq } from './agent-faq';


describe('AgentFaq', () => {
  let component: AgentFaq;
  let fixture: ComponentFixture<AgentFaq>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentFaq]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentFaq);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
