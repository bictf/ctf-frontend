import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MazeLevelComponent } from './maze-level.component';

describe('MazeLevelComponent', () => {
  let component: MazeLevelComponent;
  let fixture: ComponentFixture<MazeLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MazeLevelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MazeLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
