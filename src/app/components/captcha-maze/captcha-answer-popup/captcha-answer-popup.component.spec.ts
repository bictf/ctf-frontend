import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptchaAnswerPopupComponent } from './captcha-answer-popup.component';

describe('CaptchaAnswerPopupComponent', () => {
  let component: CaptchaAnswerPopupComponent;
  let fixture: ComponentFixture<CaptchaAnswerPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaptchaAnswerPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaptchaAnswerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
