import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerPasswordDialogComponent } from './answer-password-dialog.component';

describe('AnswerPasswordDialogComponent', () => {
  let component: AnswerPasswordDialogComponent;
  let fixture: ComponentFixture<AnswerPasswordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerPasswordDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnswerPasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
