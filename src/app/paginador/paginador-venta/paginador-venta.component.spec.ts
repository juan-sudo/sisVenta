import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginadorVentaComponent } from './paginador-venta.component';

describe('PaginadorVentaComponent', () => {
  let component: PaginadorVentaComponent;
  let fixture: ComponentFixture<PaginadorVentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginadorVentaComponent]
    });
    fixture = TestBed.createComponent(PaginadorVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
