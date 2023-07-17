import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessDeniedScreenComponent } from './access-denied-screen.component';

describe('AccessDeniedScreenComponent', () => {
  let component: AccessDeniedScreenComponent;
  let fixture: ComponentFixture<AccessDeniedScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessDeniedScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessDeniedScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
