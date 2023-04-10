import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhongbanComponent } from './phongban.component';

describe('PhongbanComponent', () => {
  let component: PhongbanComponent;
  let fixture: ComponentFixture<PhongbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhongbanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhongbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
