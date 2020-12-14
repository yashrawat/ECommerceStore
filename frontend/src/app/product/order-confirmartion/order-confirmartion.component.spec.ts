import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderConfirmartionComponent } from './order-confirmartion.component';

describe('OrderConfirmartionComponent', () => {
  let component: OrderConfirmartionComponent;
  let fixture: ComponentFixture<OrderConfirmartionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderConfirmartionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderConfirmartionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
