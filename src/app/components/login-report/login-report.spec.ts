import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginReport } from './login-report';

describe('LoginReport', () => {
  let component: LoginReport;
  let fixture: ComponentFixture<LoginReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
