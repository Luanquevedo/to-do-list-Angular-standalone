import { TestBed } from '@angular/core/testing';

import { GetAllTasks } from './get-all-tasks';

describe('GetAllTasks', () => {
  let service: GetAllTasks;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllTasks);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
