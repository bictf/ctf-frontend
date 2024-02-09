import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmericanQuestionCaptchaComponent } from './american-question-captcha.component';

describe('AmericanQuestionCaptchaComponent', () => {
  let component: AmericanQuestionCaptchaComponent;
  let fixture: ComponentFixture<AmericanQuestionCaptchaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmericanQuestionCaptchaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AmericanQuestionCaptchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
