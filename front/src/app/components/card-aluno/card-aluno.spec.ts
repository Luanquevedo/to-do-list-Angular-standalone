import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAluno } from './card-aluno';

describe('CardAluno', () => {
  let component: CardAluno;
  let fixture: ComponentFixture<CardAluno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardAluno]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardAluno);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
