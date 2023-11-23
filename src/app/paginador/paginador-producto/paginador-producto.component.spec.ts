import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginadorProductoComponent } from './paginador-producto.component';

describe('PaginadorProductoComponent', () => {
  let component: PaginadorProductoComponent;
  let fixture: ComponentFixture<PaginadorProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginadorProductoComponent]
    });
    fixture = TestBed.createComponent(PaginadorProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
