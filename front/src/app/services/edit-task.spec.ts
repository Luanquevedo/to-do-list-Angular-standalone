import { TestBed } from '@angular/core/testing';

import { EditTask } from './edit-task';

describe('EditTask', () => {
  let service: EditTask;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditTask);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
