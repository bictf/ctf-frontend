import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoToMazeDialogComponent } from './go-to-maze-dialog.component';

describe('GoToMazeDialogComponent', () => {
  let component: GoToMazeDialogComponent;
  let fixture: ComponentFixture<GoToMazeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoToMazeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoToMazeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
