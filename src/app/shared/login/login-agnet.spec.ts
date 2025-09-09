import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAgnet } from './login-agnet';

describe('LoginAgnet', () => {
  let component: LoginAgnet;
  let fixture: ComponentFixture<LoginAgnet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginAgnet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginAgnet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
