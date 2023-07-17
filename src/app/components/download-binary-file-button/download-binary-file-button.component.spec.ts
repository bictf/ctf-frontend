import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadBinaryFileButtonComponent } from './download-binary-file-button.component';

describe('DownloadBinaryFileButtonComponent', () => {
  let component: DownloadBinaryFileButtonComponent;
  let fixture: ComponentFixture<DownloadBinaryFileButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DownloadBinaryFileButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DownloadBinaryFileButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
