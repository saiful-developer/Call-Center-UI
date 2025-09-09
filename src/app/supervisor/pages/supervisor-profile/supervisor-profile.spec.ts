import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorProfile } from './supervisor-profile';

describe('SupervisorProfile', () => {
  let component: SupervisorProfile;
  let fixture: ComponentFixture<SupervisorProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupervisorProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupervisorProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
