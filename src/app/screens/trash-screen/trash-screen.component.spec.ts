import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashScreenComponent } from './trash-screen.component';

describe('TrashScreenComponent', () => {
  let component: TrashScreenComponent;
  let fixture: ComponentFixture<TrashScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrashScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrashScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
