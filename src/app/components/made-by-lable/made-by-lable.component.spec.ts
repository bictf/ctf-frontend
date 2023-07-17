import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MadeByLableComponent } from './made-by-lable.component';

describe('MadeByLableComponent', () => {
  let component: MadeByLableComponent;
  let fixture: ComponentFixture<MadeByLableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MadeByLableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MadeByLableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
