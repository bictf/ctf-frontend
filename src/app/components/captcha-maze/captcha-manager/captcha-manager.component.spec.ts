import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptchaManagerComponent } from './captcha-manager.component';

describe('CaptchaManagerComponent', () => {
  let component: CaptchaManagerComponent;
  let fixture: ComponentFixture<CaptchaManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaptchaManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaptchaManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
