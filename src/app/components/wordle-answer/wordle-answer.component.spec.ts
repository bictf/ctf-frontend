import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordleAnswerComponent } from './wordle-answer.component';

describe('WordleAnswerComponent', () => {
  let component: WordleAnswerComponent;
  let fixture: ComponentFixture<WordleAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordleAnswerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordleAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
