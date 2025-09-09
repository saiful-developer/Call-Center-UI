import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensionStatusLive } from './extension-status-live';

describe('ExtensionStatusLive', () => {
  let component: ExtensionStatusLive;
  let fixture: ComponentFixture<ExtensionStatusLive>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtensionStatusLive]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtensionStatusLive);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
