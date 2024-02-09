import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenQuestionCaptchaComponent } from './open-question-captcha.component';

describe('OpenQuestionCaptchaComponent', () => {
  let component: OpenQuestionCaptchaComponent;
  let fixture: ComponentFixture<OpenQuestionCaptchaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenQuestionCaptchaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpenQuestionCaptchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
