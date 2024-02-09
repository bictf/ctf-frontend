import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageGridCaptchaComponent } from './image-grid-captcha.component';

describe('ImageGridCaptchaComponent', () => {
  let component: ImageGridCaptchaComponent;
  let fixture: ComponentFixture<ImageGridCaptchaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageGridCaptchaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageGridCaptchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
