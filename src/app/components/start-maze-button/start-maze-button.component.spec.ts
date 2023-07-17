import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartMazeButtonComponent } from './start-maze-button.component';

describe('StartMazeButtonComponent', () => {
  let component: StartMazeButtonComponent;
  let fixture: ComponentFixture<StartMazeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartMazeButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartMazeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
