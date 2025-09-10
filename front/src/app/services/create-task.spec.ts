import { TestBed } from '@angular/core/testing';

import { CreateTask } from './create-task';

describe('CreateTask', () => {
  let service: CreateTask;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateTask);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
