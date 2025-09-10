import { TestBed } from '@angular/core/testing';

import { DeleteTask } from './delete-task';

describe('DeleteTask', () => {
  let service: DeleteTask;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteTask);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
