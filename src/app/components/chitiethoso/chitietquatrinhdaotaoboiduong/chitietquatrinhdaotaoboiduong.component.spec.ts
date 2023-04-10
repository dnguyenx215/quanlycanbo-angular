import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietquatrinhdaotaoboiduongComponent } from './chitietquatrinhdaotaoboiduong.component';

describe('ChitietquatrinhdaotaoboiduongComponent', () => {
  let component: ChitietquatrinhdaotaoboiduongComponent;
  let fixture: ComponentFixture<ChitietquatrinhdaotaoboiduongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChitietquatrinhdaotaoboiduongComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChitietquatrinhdaotaoboiduongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
