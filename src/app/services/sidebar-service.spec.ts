import { TestBed } from '@angular/core/testing';

// import { Sidebar } from './sidebar-service';
import { SidebarService } from './sidebar-service';

describe('Sidebar', () => {
  let service: SidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
