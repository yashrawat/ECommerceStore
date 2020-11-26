import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartUIComponent } from './cart-ui.component';

describe('CartUIComponent', () => {
  let component: CartUIComponent;
  let fixture: ComponentFixture<CartUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
