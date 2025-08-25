import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentBreadcrumbs } from './agent-breadcrumbs';

describe('AgentBreadcrumbs', () => {
  let component: AgentBreadcrumbs;
  let fixture: ComponentFixture<AgentBreadcrumbs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentBreadcrumbs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentBreadcrumbs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
