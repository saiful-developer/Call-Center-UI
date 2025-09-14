import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorLayout } from './supervisor-layout';

describe('SupervisorLayout', () => {
  let component: SupervisorLayout;
  let fixture: ComponentFixture<SupervisorLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupervisorLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupervisorLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
