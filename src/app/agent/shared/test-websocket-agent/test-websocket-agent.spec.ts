import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestWebsocketAgent } from './test-websocket-agent';

describe('TestWebsocketAgent', () => {
  let component: TestWebsocketAgent;
  let fixture: ComponentFixture<TestWebsocketAgent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestWebsocketAgent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestWebsocketAgent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
