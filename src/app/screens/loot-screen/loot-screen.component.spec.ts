import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LootScreenComponent } from './loot-screen.component';

describe('LootScreenComponent', () => {
  let component: LootScreenComponent;
  let fixture: ComponentFixture<LootScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LootScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LootScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
