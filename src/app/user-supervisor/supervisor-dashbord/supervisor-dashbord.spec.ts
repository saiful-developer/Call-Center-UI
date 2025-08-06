import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorDashbord } from './supervisor-dashbord';

describe('SupervisorDashbord', () => {
  let component: SupervisorDashbord;
  let fixture: ComponentFixture<SupervisorDashbord>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupervisorDashbord]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupervisorDashbord);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
