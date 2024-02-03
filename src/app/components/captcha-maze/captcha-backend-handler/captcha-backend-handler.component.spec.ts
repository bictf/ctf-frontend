import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptchaBackendHandlerComponent } from './captcha-backend-handler.component';

describe('CaptchaBackendHandlerComponent', () => {
  let component: CaptchaBackendHandlerComponent;
  let fixture: ComponentFixture<CaptchaBackendHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaptchaBackendHandlerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaptchaBackendHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
