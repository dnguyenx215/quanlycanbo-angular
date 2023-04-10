import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HinhthuckyluatComponent } from './hinhthuckyluat.component';

describe('HinhthuckyluatComponent', () => {
  let component: HinhthuckyluatComponent;
  let fixture: ComponentFixture<HinhthuckyluatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HinhthuckyluatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HinhthuckyluatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
