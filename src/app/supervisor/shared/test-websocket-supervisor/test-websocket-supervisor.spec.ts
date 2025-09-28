import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestWebsocketSupervisor } from './test-websocket-supervisor';

describe('TestWebsocketSupervisor', () => {
  let component: TestWebsocketSupervisor;
  let fixture: ComponentFixture<TestWebsocketSupervisor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestWebsocketSupervisor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestWebsocketSupervisor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
